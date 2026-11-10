/* ================================================================
   FIREBASE CONFIGURATION & INITIALIZATION
   ----------------------------------------------------------------
   ⚠️ IMPORTANT: Replace the placeholder values below with your own
   Firebase project credentials from:
   Firebase Console → Project Settings → General → Your apps
   ================================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyB5J9J7QqV68cZ5NNOPwmwBl_gvv5LbdR4",
  authDomain: "app-store-3e577.firebaseapp.com",
  databaseURL: "https://app-store-3e577-default-rtdb.firebaseio.com",
  projectId: "app-store-3e577",
  storageBucket: "app-store-3e577.firebasestorage.app",
  messagingSenderId: "419773838317",
  appId: "1:419773838317:web:675844f7f50e14df232de4",
  measurementId: "G-HBZTR4BSJP"
};

/* ----------------------------------------------------------------
   Initialize Firebase (compat build – used by both panels)
   ---------------------------------------------------------------- */
if (typeof firebase === "undefined") {
  console.error(
    "[AppVerse] Firebase SDK not loaded. " +
    "Make sure the Firebase <script> tags appear BEFORE firebase-config.js."
  );
} else {
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Global handles used by index.html and admin.html
  window.db   = firebase.database();
  window.auth = firebase.auth();

  // Persist auth across page reloads (default) – explicit for clarity
  try {
    window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
  } catch (e) { /* ignore */ }

  // Enable offline persistence for Realtime Database (improves UX)
  try {
    window.db.ref(".info/connected").on("value", snap => {
      window.__firebaseOnline = !!snap.val();
    });
  } catch (e) { /* ignore */ }

  console.log("[AppVerse] Firebase initialized ✔", firebaseConfig.projectId);
}

/* ----------------------------------------------------------------
   Friendly error helper (available globally)
   ---------------------------------------------------------------- */
window.fbErrorMessage = function (err) {
  if (!err) return "একটি অজানা সমস্যা হয়েছে।";
  const code = err.code || "";
  const map = {
    "auth/invalid-email":            "ইমেইল ঠিকানাটি সঠিক নয়।",
    "auth/user-disabled":            "এই অ্যাকাউন্টটি ব্লক করা হয়েছে।",
    "auth/user-not-found":           "এই ইমেইলে কোনো অ্যাকাউন্ট নেই।",
    "auth/wrong-password":           "পাসওয়ার্ড ভুল হয়েছে।",
    "auth/invalid-credential":       "ইমেইল বা পাসওয়ার্ড ভুল।",
    "auth/invalid-login-credentials":"ইমেইল বা পাসওয়ার্ড ভুল।",
    "auth/email-already-in-use":     "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে।",
    "auth/weak-password":            "পাসওয়ার্ড খুব দুর্বল (কমপক্ষে ৬ অক্ষর)।",
    "auth/too-many-requests":        "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
    "auth/network-request-failed":   "নেটওয়ার্ক সমস্যা। ইন্টারনেট চেক করুন।",
    "auth/operation-not-allowed":    "Firebase Console-এ Email/Password লগইন চালু করুন।",
    "PERMISSION_DENIED":             "অনুমতি নেই (Database Rules চেক করুন)।",
    "permission-denied":             "অনুমতি নেই (Database Rules চেক করুন)।"
  };
  return map[code] || err.message || "একটি অজানা সমস্যা হয়েছে।";
};