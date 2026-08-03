'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
  onAuthStateChanged,
  firebaseSignOut,
  type FirebaseUser,
} from '@/services/firebase';
import { apiClient, setAccessToken, setUnauthorizedHandler } from '@/services/api-client';
import type { AppUser, AuthContextValue, SessionResponse } from '@/types/user';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function syncSession(firebaseUser: FirebaseUser, isGuest = false): Promise<AppUser> {
  const idToken = await firebaseUser.getIdToken();
  const { data } = await apiClient.post<SessionResponse>('/auth/session', {
    id_token: idToken,
    is_guest: isGuest,
    preferred_language: typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en',
  });
  setAccessToken(data.accessToken);
  return data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setAccessToken(null);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const appUser = await syncSession(firebaseUser, firebaseUser.isAnonymous);
          setUser(appUser);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      } catch (err) {
        console.error('Session sync failed', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in successfully');
    } catch (err) {
      console.error(err);
      toast.error('Google sign-in failed. Please try again.');
      throw err;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (err) {
      console.error(err);
      toast.error('Invalid email or password.');
      throw err;
    }
  }, []);

  const registerWithEmail = useCallback(async (name: string, email: string, password: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await syncSession(credential.user);
      toast.success('Account created successfully');
    } catch (err) {
      console.error(err);
      toast.error('Could not create account. Please try again.');
      throw err;
    }
  }, []);

  const continueAsGuest = useCallback(async () => {
    try {
      await signInAnonymously(auth);
      toast.success('Continuing as guest');
    } catch (err) {
      console.error(err);
      toast.error('Could not start a guest session.');
      throw err;
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (err) {
      console.error(err);
      toast.error('Could not send reset email.');
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setAccessToken(null);
    toast.success('Signed out');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      continueAsGuest,
      sendPasswordReset,
      signOut,
    }),
    [user, loading, signInWithGoogle, signInWithEmail, registerWithEmail, continueAsGuest, sendPasswordReset, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}