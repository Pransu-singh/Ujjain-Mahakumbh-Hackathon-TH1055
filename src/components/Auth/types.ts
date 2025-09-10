export type UserType = 'pilgrim' | 'security' | 'admin';

export interface User {
  id: string;
  username: string;
  userType: UserType;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}