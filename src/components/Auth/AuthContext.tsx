import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, UserType } from './types';
import { supabase } from '../../lib/supabase';

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({ 
  state: initialState, 
  dispatch: () => null,
  login: async () => {},
  register: async () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              // Fetch user profile from users table
              const { data: profile, error } = await supabase
                .from('users')
                .select('username, user_type')
                .eq('id', session.user.id)
                .single();

              if (error) {
                dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
                return;
              }

              const user: User = {
                id: session.user.id,
                email: session.user.email!,
                username: profile.username,
                userType: profile.user_type,
              };

              dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            } else if (event === 'SIGNED_OUT') {
              dispatch({ type: 'LOGOUT' });
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string, userType: UserType) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        // Verify user type matches
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('username, user_type')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile.user_type !== userType) {
          throw new Error('Invalid user type for this account');
        }

        const userData: User = {
          id: user.id,
          email: user.email!,
          username: profile.username,
          userType: profile.user_type,
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        // The handle_new_user trigger will create the user profile
        // Wait for the profile to be created
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('username, user_type')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        const userData: User = {
          id: user.id,
          email: user.email!,
          username: profile.username,
          userType: profile.user_type,
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};