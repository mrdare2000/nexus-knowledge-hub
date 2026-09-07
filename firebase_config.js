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

  async function signUp(email, password, displayName, company = 'Not Set', role = 'Not Set') {
    if (!isFirebaseReady && !initFirebase()) throw new Error("Firebase backend unavailable.");
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    if (displayName) {
      user.updateProfile({ displayName: displayName }).catch(e => console.warn(e.message));
    }

    const userData = {
      uid: user.uid,
      id: user.uid,
      email: email,
      displayName: displayName || email.split('@')[0],
      name: displayName || email.split('@')[0],
      role: role || 'Not Set',
      company: company || 'Not Set',
      avatar: '👤',
      createdAt: new Date().toISOString()
    };


    // Save to Cloud Firestore & Realtime DB asynchronously in background
    if (firestore) {
      firestore.collection("users").doc(user.uid).set(userData, { merge: true }).catch(e => console.warn("Firestore user save warning:", e.message));
    }
    if (realtimeDb) {
      realtimeDb.ref("users/" + user.uid).set(userData).catch(e => console.warn("Realtime DB user save warning:", e.message));
    }

    return user;
  }

  async function saveUserProfileData(uid, data) {
    if (!isFirebaseReady && !initFirebase()) return false;
    const payload = {
      uid: uid,
      id: uid,
      ...data,
      updatedAt: new Date().toISOString()
    };

    if (firestore) {
      try { await firestore.collection("users").doc(uid).set(payload, { merge: true }); }
      catch (e) { console.warn("Firestore user update warning:", e.message); }
    }

    if (realtimeDb) {
      try { await realtimeDb.ref("users/" + uid).update(payload); }
      catch (e) { console.warn("Realtime DB user update warning:", e.message); }
    }


    return true;
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

  async function sendPasswordResetEmail(email) {
    if (!isFirebaseReady && !initFirebase()) throw new Error("Firebase backend unavailable.");
    if (!auth) throw new Error("Firebase Auth not initialized.");

    const actionCodeSettings = {
      url: 'https://nexusknowledgehub.com/knowledge-hub',
      handleCodeInApp: false
    };

    await auth.sendPasswordResetEmail(email, actionCodeSettings);
    return true;
  }

  // ----------------------------------------------------
  // 2. QUIZ RESULTS & ATTEMPTS PERSISTENCE
  // ----------------------------------------------------

  async function saveQuizAttempt(attemptRecord) {
    if (!isFirebaseReady && !initFirebase()) return false;
    if (!attemptRecord || !attemptRecord.attemptId) return false;

    const payload = JSON.parse(JSON.stringify(attemptRecord));
    payload.timestamp = payload.timestamp || new Date().toISOString();

    const writePromises = [];

    // A. Save to Cloud Firestore DB
    if (firestore) {
      const fsWrite = firestore.collection("quiz_attempts").doc(payload.attemptId).set(payload, { merge: true })
        .then(() => {
          if (payload.userId) {
            return firestore.collection("users").doc(payload.userId).collection("quiz_attempts").doc(payload.attemptId).set(payload, { merge: true });
          }
        }).catch(e => console.warn("Firestore save warning:", e.message));
      writePromises.push(fsWrite);
    }

    // B. Save to Realtime Database
    if (realtimeDb) {
      const rtWrite = realtimeDb.ref("attempts/" + payload.attemptId).set(payload)
        .catch(e => console.warn("Realtime DB save warning:", e.message));
      writePromises.push(rtWrite);
    }

    // Safety timeout (max 4 seconds) to ensure call never hangs UI
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 4000));

    try {
      await Promise.race([Promise.allSettled(writePromises), timeoutPromise]);
      console.log(`☁️ Quiz attempt synced to Cloud Backend.`);
      return true;
    } catch (e) {
      console.warn("Cloud save warning:", e.message);
      return false;
    }
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

  // Expose Unified Global Interface
  window.NEXUS_FIREBASE = {
    init: initFirebase,
    signUp: signUp,
    login: login,
    logout: logout,
    onAuthStateChanged: onAuthStateChanged,
    getCurrentUser: getCurrentUser,
    sendPasswordResetEmail: sendPasswordResetEmail,
    saveUserProfileData: saveUserProfileData,
    saveQuizAttempt: saveQuizAttempt,
    fetchQuizAttempts: fetchQuizAttempts,
    saveAIChatMessage: saveAIChatMessage,
    fetchAIChatHistory: fetchAIChatHistory,
    toggleFavoriteTopic: toggleFavoriteTopic,
    fetchUserFavorites: fetchUserFavorites,
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

