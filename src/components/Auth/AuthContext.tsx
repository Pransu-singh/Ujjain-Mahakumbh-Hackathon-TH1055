import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, UserType } from './types';
import { auth, db } from '../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

// Use localStorage for initial userType
const initialUserType = localStorage.getItem('userType') as UserType | null;
const initialState: AuthState = {
  user: initialUserType
    ? { id: '', email: '', username: '', userType: initialUserType }
    : null,
  isAuthenticated: !!initialUserType,
  loading: true,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType?: UserType) => Promise<void>;
  logout: () => Promise<void>;
  createUserAsAdmin: (email: string, password: string, userType: UserType) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  createUserAsAdmin: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, user: null, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, loading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

async function fetchUserProfile(firebaseUser: FirebaseUser): Promise<User | null> {
  const docRef = doc(db, "users", firebaseUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      username: data.username,
      userType: data.userType,
    };
  }
  return null;
}

// Check if any admin exists in Firestore
async function adminExists(): Promise<boolean> {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.some(doc => doc.data().userType === "admin");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await fetchUserProfile(firebaseUser);
        if (user) {
          localStorage.setItem('userType', user.userType);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          localStorage.removeItem('userType');
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Profile not found' });
        }
      } else {
        localStorage.removeItem('userType');
        dispatch({ type: 'LOGOUT' });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });
    return () => unsubscribe();
  }, []);

  // Only pilgrims can self-register, except for the very first admin
  const register = async (email: string, password: string, userType?: UserType) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let role: UserType = "pilgrim";
      // If no admin exists, allow first registration as admin
      if (!(await adminExists())) {
        role = "admin";
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const username = email.split('@')[0];
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        userType: role,
        email,
      });
      const user: User = {
        id: userCredential.user.uid,
        email,
        username,
        userType: role,
      };
      localStorage.setItem('userType', user.userType);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      localStorage.removeItem('userType');
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  // Admin creates security/admin users (must be called from admin panel)
  const createUserAsAdmin = async (email: string, password: string, userType: UserType) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const username = email.split('@')[0];
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        userType,
        email,
      });
      // Optionally, sign out the new user and keep admin logged in
      await signOut(auth);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = await fetchUserProfile(userCredential.user);
      if (user) {
        localStorage.setItem('userType', user.userType);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        localStorage.removeItem('userType');
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Profile not found' });
      }
    } catch (error: any) {
      localStorage.removeItem('userType');
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('userType');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout, createUserAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};