export interface AppUser {
  uid: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
  preferredLanguage: string;
  country: string | null;
  isGuest: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  user: AppUser;
}

export interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  continueAsGuest: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}