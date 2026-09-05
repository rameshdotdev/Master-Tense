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

// Resolved configuration supporting both environment variables and firebase-applet-config.json
export const resolvedFirebaseConfig = {
  ...firebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(resolvedFirebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with configured databaseId
export const db = resolvedFirebaseConfig.firestoreDatabaseId
  ? getFirestore(app, resolvedFirebaseConfig.firestoreDatabaseId)
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

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export class FirebaseAuthError extends Error {
  code: string;
  domain: string;
  projectId: string;
  consoleSettingsUrl: string;
  isUnauthorizedDomain: boolean;
  isPopupBlocked: boolean;
  isInIframe: boolean;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'FirebaseAuthError';
    this.code = code;
    this.domain = typeof window !== 'undefined' ? window.location.hostname : '';
    this.projectId = resolvedFirebaseConfig.projectId || '';
    this.consoleSettingsUrl = `https://console.firebase.google.com/project/${resolvedFirebaseConfig.projectId}/authentication/settings`;
    this.isUnauthorizedDomain = code === 'auth/unauthorized-domain';
    this.isPopupBlocked = code === 'auth/popup-blocked';
    this.isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  }
}

/**
 * Get diagnostic information for Firebase Auth environment
 */
export function getAuthDiagnostics() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  const projectId = resolvedFirebaseConfig.projectId;
  const consoleSettingsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;

  return {
    hostname,
    isIframe,
    projectId,
    authDomain: resolvedFirebaseConfig.authDomain,
    consoleSettingsUrl,
  };
}

/**
 * Sign in using Google OAuth Popup with detailed error diagnostics
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    const code = err.code || 'unknown';
    const domain = typeof window !== 'undefined' ? window.location.hostname : '';
    const inIframe = typeof window !== 'undefined' && window.self !== window.top;

    if (code === 'auth/unauthorized-domain') {
      throw new FirebaseAuthError(
        code,
        `Domain "${domain}" is not authorized in your Firebase Project "${resolvedFirebaseConfig.projectId}". Add it in Firebase Console -> Authentication -> Settings -> Authorized domains.`
      );
    } else if (code === 'auth/popup-blocked') {
      if (inIframe) {
        throw new FirebaseAuthError(
          code,
          'Popup was blocked by your browser inside the embedded preview. Please open the app in a new browser tab to sign in with Google.'
        );
      }
      throw new FirebaseAuthError(
        code,
        'Sign-in popup was blocked by your browser. Please allow popups for this site and try again.'
      );
    } else if (code === 'auth/popup-closed-by-user') {
      throw new FirebaseAuthError(
        code,
        'Sign-in cancelled: The Google authorization popup was closed before completion.'
      );
    } else if (code === 'auth/cancelled-popup-request') {
      throw new FirebaseAuthError(
        code,
        'Another sign-in attempt is already in progress. Please wait a moment.'
      );
    } else if (code === 'auth/operation-not-allowed') {
      throw new FirebaseAuthError(
        code,
        `Google sign-in provider is disabled in Firebase Project "${resolvedFirebaseConfig.projectId}". Enable Google in Firebase Console -> Authentication -> Sign-in method.`
      );
    } else {
      throw new FirebaseAuthError(
        code,
        err.message || 'Failed to sign in with Google. If running in an iframe preview, try opening the app in a new tab.'
      );
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
