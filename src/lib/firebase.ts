import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import type { UserStats } from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with configured databaseId
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export type { User };

export interface CloudUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: string;
  lastLoginAt: string;
  stats?: UserStats;
}

/**
 * Sign in using Google OAuth Popup
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please enable popups for this site and try again.');
    } else if (err.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Popup was closed before completing Google authorization.');
    } else if (err.code === 'auth/cancelled-popup-request') {
      throw new Error('Another sign-in attempt is already in progress.');
    } else {
      throw new Error(err.message || 'Failed to sign in with Google. Please try again.');
    }
  }
}

/**
 * Sign out the current user session
 */
export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Fetch or initialize the user's document in Firestore
 */
export async function fetchOrInitUserDoc(user: User, currentLocalStats: UserStats): Promise<UserStats> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  const now = new Date().toISOString();

  if (snap.exists()) {
    const data = snap.data() as CloudUserData;
    // Update last login timestamp and profile metadata
    await updateDoc(userRef, {
      lastLoginAt: now,
      displayName: user.displayName || data.displayName,
      email: user.email || data.email,
      photoURL: user.photoURL || data.photoURL
    }).catch(() => {
      // Non-fatal if update fails
    });

    if (data.stats) {
      return data.stats;
    }
  }

  // If new user on Firestore, initialize with current stats (preserving anything practiced before logging in)
  const newProfile: CloudUserData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: now,
    lastLoginAt: now,
    stats: currentLocalStats
  };

  await setDoc(userRef, newProfile, { merge: true });
  return currentLocalStats;
}

/**
 * Persist user stats to Firestore document
 */
export async function saveStatsToFirestore(userId: string, stats: UserStats): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        stats,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Error saving user stats to Firestore:', err);
  }
}
