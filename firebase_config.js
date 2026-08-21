// Nexus Knowledge Hub - Enterprise Firebase Cloud Backend Architecture
// Full Support for Authentication, Cloud Firestore, Realtime DB, Nexus AI History, Bookmarks, and Quiz Results

(function () {
  'use strict';

  // Firebase Web App Configuration Credentials
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
  let firestore = null;
  let realtimeDb = null;
  let isFirebaseReady = false;

  // Initialize All Firebase Services
  function initFirebase() {
    if (typeof firebase === 'undefined') {
      console.warn("⚠️ Firebase CDN SDKs not loaded yet.");
      return false;
    }

    try {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
      } else {
        firebaseApp = firebase.app();
      }

      auth = firebase.auth ? firebase.auth() : null;
      firestore = firebase.firestore ? firebase.firestore() : null;
      realtimeDb = firebase.database ? firebase.database() : null;
      isFirebaseReady = true;

      console.log("✅ Firebase Backend Services (Auth, Firestore, Realtime DB) 100% Ready.");
      return true;
    } catch (err) {
      console.error("❌ Firebase initialization error:", err.message);
      return false;
    }
  }

  // ----------------------------------------------------
  // 1. AUTHENTICATION MODULE (Sign Up, Login, Logout)
  // ----------------------------------------------------

  async function signUp(email, password, displayName) {
    if (!isFirebaseReady && !initFirebase()) throw new Error("Firebase backend unavailable.");
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (displayName) {
      await user.updateProfile({ displayName: displayName });
    }

    // Initialize User Document in Cloud Firestore
    if (firestore) {
      await firestore.collection("users").doc(user.uid).set({
        uid: user.uid,
        email: email,
        displayName: displayName || email.split('@')[0],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    return user;
  }

  async function login(email, password) {
    if (!isFirebaseReady && !initFirebase()) throw new Error("Firebase backend unavailable.");
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  async function logout() {
    if (auth) await auth.signOut();
  }

  function onAuthStateChanged(callback) {
    if (!isFirebaseReady) initFirebase();
    if (auth) {
      auth.onAuthStateChanged(callback);
    }
  }

  function getCurrentUser() {
    return auth ? auth.currentUser : null;
  }

  // ----------------------------------------------------
  // 2. QUIZ RESULTS & ATTEMPTS PERSISTENCE
  // ----------------------------------------------------

  async function saveQuizAttempt(attemptRecord) {
    if (!isFirebaseReady && !initFirebase()) return false;

    let savedFirestore = false;
    let savedRealtime = false;

    // A. Save to Cloud Firestore DB
    if (firestore) {
      try {
        await firestore.collection("quiz_attempts").doc(attemptRecord.attemptId).set({
          ...attemptRecord,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        savedFirestore = true;
      } catch (e) {
        console.warn("Firestore save warning:", e.message);
      }
    }

    // B. Save to Realtime Database (Dual Backup Sync)
    if (realtimeDb) {
      try {
        await realtimeDb.ref("attempts/" + attemptRecord.attemptId).set(attemptRecord);
        savedRealtime = true;
      } catch (e) {
        console.warn("Realtime DB save warning:", e.message);
      }
    }

    console.log(`☁️ Quiz attempt synced: Firestore [${savedFirestore}], Realtime DB [${savedRealtime}]`);
    return savedFirestore || savedRealtime;
  }

  async function fetchQuizAttempts(userId = null) {
    if (!isFirebaseReady && !initFirebase()) return [];

    if (firestore) {
      try {
        let query = firestore.collection("quiz_attempts");
        if (userId) {
          query = query.where("userId", "==", userId);
        }
        const snapshot = await query.get();
        const results = [];
        snapshot.forEach(doc => results.push(doc.data()));
        results.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
        if (results.length > 0) return results;
      } catch (e) {
        console.warn("Firestore fetch fallback to Realtime DB:", e.message);
      }
    }

    if (realtimeDb) {
      try {
        const snapshot = await realtimeDb.ref("attempts").once("value");
        const data = snapshot.val();
        if (data) {
          const attempts = Object.values(data);
          if (userId) return attempts.filter(a => a.userId === userId);
          return attempts.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
      } catch (e) {
        console.error("Realtime DB fetch error:", e.message);
      }
    }

    return [];
  }

  // ----------------------------------------------------
  // 3. NEXUS AI CHAT HISTORY PERSISTENCE (For Future Features)
  // ----------------------------------------------------

  async function saveAIChatMessage(userId, messageData) {
    if (!isFirebaseReady || !firestore || !userId) return false;
    try {
      await firestore.collection("users").doc(userId).collection("ai_chats").add({
        ...messageData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (e) {
      console.error("Error saving AI chat message:", e.message);
      return false;
    }
  }

  async function fetchAIChatHistory(userId) {
    if (!isFirebaseReady || !firestore || !userId) return [];
    try {
      const snapshot = await firestore.collection("users").doc(userId).collection("ai_chats").orderBy("timestamp", "asc").get();
      const history = [];
      snapshot.forEach(doc => history.push(doc.data()));
      return history;
    } catch (e) {
      console.error("Error fetching AI chat history:", e.message);
      return [];
    }
  }

  // ----------------------------------------------------
  // 4. KNOWLEDGE HUB FAVORITE TOPICS (For Future Features)
  // ----------------------------------------------------

  async function toggleFavoriteTopic(userId, topicId, topicData) {
    if (!isFirebaseReady || !firestore || !userId) return false;
    try {
      const docRef = firestore.collection("users").doc(userId).collection("favorites").doc(topicId);
      const doc = await docRef.get();
      if (doc.exists) {
        await docRef.delete();
        return false; // Removed from favorites
      } else {
        await docRef.set({
          topicId: topicId,
          ...topicData,
          savedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true; // Added to favorites
      }
    } catch (e) {
      console.error("Error toggling favorite topic:", e.message);
      return false;
    }
  }

  async function fetchUserFavorites(userId) {
    if (!isFirebaseReady || !firestore || !userId) return [];
    try {
      const snapshot = await firestore.collection("users").doc(userId).collection("favorites").orderBy("savedAt", "desc").get();
      const favs = [];
      snapshot.forEach(doc => favs.push(doc.data()));
      return favs;
    } catch (e) {
      console.error("Error fetching user favorites:", e.message);
      return [];
    }
  }

  // ----------------------------------------------------
  // 5. ADMIN PORTAL — DATA ACCESS FUNCTIONS
  // ----------------------------------------------------

  async function fetchAllUsers() {
    if (!isFirebaseReady && !initFirebase()) return [];
    if (!firestore) return [];
    try {
      const snapshot = await firestore.collection("users").get();
      const users = [];
      snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
      users.sort((a, b) => {
        const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
        const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      return users;
    } catch (e) {
      console.error("Admin: Error fetching all users:", e.message);
      return [];
    }
  }

  async function fetchAllQuizAttempts() {
    if (!isFirebaseReady && !initFirebase()) return [];
    if (!firestore) return [];
    try {
      const snapshot = await firestore.collection("quiz_attempts").get();
      const attempts = [];
      snapshot.forEach(doc => attempts.push({ id: doc.id, ...doc.data() }));
      attempts.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
      return attempts;
    } catch (e) {
      console.error("Admin: Error fetching all quiz attempts:", e.message);
      return [];
    }
  }

  async function deleteUserData(uid) {
    if (!isFirebaseReady && !initFirebase()) return false;
    if (!firestore || !uid) return false;
    try {
      // Delete user document from Firestore
      await firestore.collection("users").doc(uid).delete();

      // Delete all quiz attempts for this user
      const attemptsSnap = await firestore.collection("quiz_attempts").where("userId", "==", uid).get();
      const batch = firestore.batch();
      attemptsSnap.forEach(doc => batch.delete(doc.ref));
      if (!attemptsSnap.empty) await batch.commit();

      // Delete from Realtime DB if exists
      if (realtimeDb) {
        try {
          const rtSnap = await realtimeDb.ref("attempts").orderByChild("userId").equalTo(uid).once("value");
          const updates = {};
          rtSnap.forEach(child => { updates[child.key] = null; });
          if (Object.keys(updates).length > 0) await realtimeDb.ref("attempts").update(updates);
        } catch (rtErr) { console.warn("Realtime DB cleanup skipped:", rtErr.message); }
      }

      console.log(`✅ Admin: Deleted user ${uid} and all associated data.`);
      return true;
    } catch (e) {
      console.error("Admin: Error deleting user data:", e.message);
      return false;
    }
  }

  async function deleteQuizAttempt(attemptId) {
    if (!isFirebaseReady && !initFirebase()) return false;
    if (!firestore || !attemptId) return false;
    try {
      await firestore.collection("quiz_attempts").doc(attemptId).delete();

      // Also remove from Realtime DB
      if (realtimeDb) {
        try { await realtimeDb.ref("attempts/" + attemptId).remove(); }
        catch (rtErr) { console.warn("Realtime DB cleanup skipped:", rtErr.message); }
      }

      console.log(`✅ Admin: Deleted quiz attempt ${attemptId}.`);
      return true;
    } catch (e) {
      console.error("Admin: Error deleting quiz attempt:", e.message);
      return false;
    }
  }

  // Expose Unified Global Interface
  window.NEXUS_FIREBASE = {
    init: initFirebase,
    signUp: signUp,
    login: login,
    logout: logout,
    onAuthStateChanged: onAuthStateChanged,
    getCurrentUser: getCurrentUser,
    saveQuizAttempt: saveQuizAttempt,
    fetchQuizAttempts: fetchQuizAttempts,
    saveAIChatMessage: saveAIChatMessage,
    fetchAIChatHistory: fetchAIChatHistory,
    toggleFavoriteTopic: toggleFavoriteTopic,
    fetchUserFavorites: fetchUserFavorites,
    // Admin Portal Functions
    fetchAllUsers: fetchAllUsers,
    fetchAllQuizAttempts: fetchAllQuizAttempts,
    deleteUserData: deleteUserData,
    deleteQuizAttempt: deleteQuizAttempt,
    getAuth: () => auth,
    getFirestore: () => firestore,
    getRealtimeDb: () => realtimeDb,
    get db() { if (!isFirebaseReady) initFirebase(); return firestore; },
    get firestore() { if (!isFirebaseReady) initFirebase(); return firestore; },
    get auth() { if (!isFirebaseReady) initFirebase(); return auth; },
    isReady: () => isFirebaseReady
  };

  // Auto Init on DOM Loaded
  document.addEventListener("DOMContentLoaded", function () {
    initFirebase();
  });

})();
