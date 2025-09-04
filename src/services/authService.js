// src/services/authService.js
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { logger } from "../lib/logger";

const log = logger("authService");

/**
 * Register a user with email/password and save role in Firestore.
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.role - 'admin' | 'doctor' | 'receptionist' (or other)
 * @param {Object} params.metadata - optional extra fields to store in users doc
 * @returns {Promise<{ uid: string, meta: Object }>}
 */
export async function registerUser({
  email,
  password,
  role = "receptionist",
  metadata = {},
}) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCred.user.uid;

    // Save user profile (role + optional metadata) in Firestore
    const payload = {
      uid,
      email,
      role,
      createdAt: new Date().toISOString(),
      ...metadata,
    };
    await setDoc(doc(db, "users", uid), payload);

    log.info("registerUser: created user", { uid, role });
    return { uid, meta: payload };
  } catch (err) {
    log.error("registerUser failed", err);
    throw err;
  }
}

/**
 * Login user with email/password and return meta (including role).
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @returns {Promise<{ uid: string, meta: Object }>}
 */
export async function loginUser({ email, password }) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Read role and other metadata from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    const meta = userDoc.exists() ? userDoc.data() : null;

    log.info("loginUser: success", { uid, role: meta?.role });
    return { uid, meta };
  } catch (err) {
    log.error("loginUser failed", err);
    throw err;
  }
}

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await signOut(auth);
    log.info("logout: user signed out");
  } catch (err) {
    log.error("logout failed", err);
    throw err;
  }
}

/**
 * Get the current authenticated user's role and metadata (if logged in).
 * Returns null if not authenticated.
 * Useful for client-side checks (non-secure — also enforce in rules).
 * @returns {Promise<{ uid: string, meta: Object } | null>}
 */
export async function getCurrentUserRole() {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const meta = userDoc.exists() ? userDoc.data() : null;
    return { uid: user.uid, meta };
  } catch (err) {
    log.error("getCurrentUserRole failed", err);
    throw err;
  }
}

/**
 * Attach a listener for auth state changes.
 * Callback receives: { uid, meta } when signed in, or null when signed out.
 * Returns the unsubscribe function.
 *
 * Example:
 * const unsub = onAuthState((user)=>{ if(user) setUser(user) else setUser(null) });
 * unsub();
 */
export function onAuthState(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const meta = userDoc.exists() ? userDoc.data() : null;
      callback({ uid: user.uid, meta });
    } catch (err) {
      log.error("onAuthState: fetching user meta failed", err);
      callback({ uid: user.uid, meta: null });
    }
  });
}

/**
 * Utility to update the user's role/metadata in Firestore (admin-only action).
 * @param {string} uid
 * @param {Object} updateFields
 * @returns {Promise<void>}
 */
export async function updateUserMeta(uid, updateFields = {}) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, updateFields, { merge: true });
    log.info("updateUserMeta: updated", { uid, updateFields });
  } catch (err) {
    log.error("updateUserMeta failed", err);
    throw err;
  }
}

export default {
  registerUser,
  loginUser,
  logout,
  getCurrentUserRole,
  onAuthState,
  updateUserMeta,
};
