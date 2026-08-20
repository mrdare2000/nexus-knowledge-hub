// Firebase Initialization & Cloud Backend Integration module
// Supports Authentication (Email/Password) & Cloud Firestore Data Persistence

(function () {
  'use strict';

  // Your Firebase Web App Configuration Credentials
  // Replace placeholders below with keys from Firebase Console (Project Settings -> Web App)
  const firebaseConfig = {
    apiKey: "AIzaSyC52IVSkYYsMDi8OynLNhxCbowqYDA227A",
    authDomain: "nexus-knowledge-hub.firebaseapp.com",
    databaseURL: "https://nexus-knowledge-hub-default-rtdb.firebaseio.com",
    projectId: "nexus-knowledge-hub",
    storageBucket: "nexus-knowledge-hub.firebasestorage.app",
    messagingSenderId: "653770271063",
    appId: "1:653770271063:web:ae53a94e7b8ecbd3faf612",
    measurementId: "G-MJ47GC276V"
  };

  let firebaseApp = null;
  let auth = null;
  let db = null;
  let isFirebaseReady = false;

  // Initialize Firebase App
  function initFirebase() {
    if (typeof firebase === 'undefined') {
      console.warn("⚠️ Firebase SDK not loaded from CDN.");
      return false;
    }

    try {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
      } else {
        firebaseApp = firebase.app();
      }

      auth = firebase.auth();
      db = firebase.firestore();
      isFirebaseReady = true;

      console.log("✅ Firebase Backend Service initialized successfully.");
      return true;
    } catch (err) {
      console.error("❌ Firebase initialization failed:", err.message);
      return false;
    }
  }

  // ----------------------------------------------------
  // AUTHENTICATION FUNCTIONS
  // ----------------------------------------------------

  // Sign Up New User
  async function signUp(email, password, displayName) {
    if (!isFirebaseReady && !initFirebase()) {
      throw new Error("Firebase backend is not configured yet.");
    }
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (displayName) {
      await user.updateProfile({ displayName: displayName });
    }
    
    // Create User Document in Firestore
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: email,
      displayName: displayName || email.split('@')[0],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return user;
  }

  // Log In Existing User
  async function login(email, password) {
    if (!isFirebaseReady && !initFirebase()) {
      throw new Error("Firebase backend is not configured yet.");
    }
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  // Log Out Current User
  async function logout() {
    if (auth) {
      await auth.signOut();
    }
  }

  // Password Reset Email
  async function sendPasswordReset(email) {
    if (!isFirebaseReady && !initFirebase()) {
      throw new Error("Firebase backend is not configured yet.");
    }
    await auth.sendPasswordResetEmail(email);
  }

  // ----------------------------------------------------
  // FIRESTORE DATABASE FUNCTIONS
  // ----------------------------------------------------

  // Save Quiz Attempt Record to Firestore Database
  async function saveQuizAttempt(attemptRecord) {
    if (!isFirebaseReady && !initFirebase()) {
      console.warn("⚠️ Firebase DB not ready. Saving to Local Storage only.");
      return false;
    }

    try {
      const docRef = db.collection("quiz_attempts").doc(attemptRecord.attemptId);
      await docRef.set({
        ...attemptRecord,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("☁️ Attempt saved to Cloud Firestore DB:", attemptRecord.attemptId);
      return true;
    } catch (err) {
      console.error("❌ Failed to save attempt to Cloud DB:", err.message);
      return false;
    }
  }

  // Fetch Quiz Attempts for User or Guest
  async function fetchQuizAttempts(userId = null) {
    if (!isFirebaseReady && !initFirebase()) return [];

    try {
      let query = db.collection("quiz_attempts");
      if (userId) {
        query = query.where("userId", "==", userId);
      }
      const snapshot = await query.orderBy("createdAt", "desc").limit(50).get();
      const attempts = [];
      snapshot.forEach(doc => {
        attempts.push(doc.data());
      });
      return attempts;
    } catch (err) {
      console.error("❌ Error fetching attempts from Cloud DB:", err.message);
      return [];
    }
  }

  // Expose Global Firebase Service Object
  window.NEXUS_FIREBASE = {
    init: initFirebase,
    signUp: signUp,
    login: login,
    logout: logout,
    sendPasswordReset: sendPasswordReset,
    saveQuizAttempt: saveQuizAttempt,
    fetchQuizAttempts: fetchQuizAttempts,
    getAuth: () => auth,
    getDb: () => db,
    isReady: () => isFirebaseReady
  };

  // Auto Init on script load
  document.addEventListener("DOMContentLoaded", function () {
    initFirebase();
  });

})();
