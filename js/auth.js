/**
 * Nexus Knowledge Hub - Auth & User Profile Module (js/auth.js)
 * Manages Firebase authentication lifecycle, login, signup, avatar selection, and profile editing.
 */

let currentUser = null;
window.currentUser = null;
let selectedAvatarSymbol = '👤';
let selectedSignupAvatarSymbol = '👤';

window.getCurrentUser = function() {
  if (currentUser) return currentUser;
  if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.getCurrentUser === 'function') {
    const u = window.NEXUS_FIREBASE.getCurrentUser();
    if (u) return u;
  }
  return null;
};

function initAuth() {
  function tryAttachListener() {
    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.onAuthStateChanged === 'function') {
      window.NEXUS_FIREBASE.init();
      window.NEXUS_FIREBASE.onAuthStateChanged((user) => {
        currentUser = user;
        window.currentUser = user;
        updateAuthUI(user);

        if (user) {
          user.reload().catch((err) => {
            if (err && (err.code === "auth/user-not-found" || err.code === "auth/user-disabled")) {
              console.warn("User account deleted/disabled from Firebase Console:", err);
              if (window.NEXUS_FIREBASE.logout) window.NEXUS_FIREBASE.logout();
              currentUser = null;
              window.currentUser = null;
              updateAuthUI(null);
            } else {
              console.warn("Background user reload warning (session retained):", err.message);
            }
          });
        }
      });

      // Immediate check if initial user is already hydrated
      const initialUser = window.NEXUS_FIREBASE.getCurrentUser();
      if (initialUser) {
        currentUser = initialUser;
        window.currentUser = initialUser;
        updateAuthUI(initialUser);
      }
      return true;
    }
    return false;
  }

  if (!tryAttachListener()) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryAttachListener() || attempts > 50) {
        clearInterval(interval);
      }
    }, 100);
  }
}
window.initAuth = initAuth;

function getFirestoreDb() {
  if (window.NEXUS_FIREBASE) {
    if (window.NEXUS_FIREBASE.db) return window.NEXUS_FIREBASE.db;
    if (typeof window.NEXUS_FIREBASE.getFirestore === 'function') return window.NEXUS_FIREBASE.getFirestore();
  }
  if (typeof firebase !== 'undefined' && firebase.firestore) return firebase.firestore();
  return null;
}
window.getFirestoreDb = getFirestoreDb;

function updateAuthUI(user) {
  currentUser = user;
  window.currentUser = user;

  const loginBtn = document.getElementById("sidebar-login-btn");
  const userProfile = document.getElementById("sidebar-user-profile");
  const homeLoginBtn = document.getElementById("home-login-btn");
  const homeUserProfile = document.getElementById("home-user-profile");
  
  if (user) {
    // Automatically close auth modal window when user is logged in
    closeAuthModal();

    // Hide Logged-Out buttons cleanly
    if (loginBtn) loginBtn.style.setProperty("display", "none", "important");
    if (homeLoginBtn) homeLoginBtn.style.setProperty("display", "none", "important");

    // Show Logged-In Profile Badges
    if (userProfile) userProfile.style.setProperty("display", "flex", "important");
    if (homeUserProfile) homeUserProfile.style.setProperty("display", "flex", "important");

    // Default fallback values
    let displayName = user.displayName || user.email.split('@')[0];
    let userAvatar = '👤';
    let userRole = 'Not Set';
    let userCompany = 'Not Set';

    // Populate initial default UI state right away
    updateProfileBadgesUI(displayName, userAvatar, userRole, userCompany);

    // Fetch full live profile data from Firestore
    const db = getFirestoreDb();
    if (db) {
      db.collection("users").doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          displayName = data.name || data.displayName || displayName;
          userAvatar = data.avatar || '👤';
          userRole = data.role || 'Not Set';
          userCompany = data.company || 'Not Set';
          selectedAvatarSymbol = userAvatar;
          
          updateProfileBadgesUI(displayName, userAvatar, userRole, userCompany);
        }
      }).catch(err => console.error("Error fetching user profile:", err));
    }
    
    // Refresh Quiz Hub state if active
    if (window.NEXUS_QUIZ_ENGINE && typeof window.NEXUS_QUIZ_ENGINE.refresh === 'function') {
      window.NEXUS_QUIZ_ENGINE.refresh();
    }
  } else {
    // Logged out: Show login buttons, Hide profile badges
    if (loginBtn) loginBtn.style.setProperty("display", "flex", "important");
    if (userProfile) userProfile.style.setProperty("display", "none", "important");
    if (homeLoginBtn) homeLoginBtn.style.setProperty("display", "flex", "important");
    if (homeUserProfile) homeUserProfile.style.setProperty("display", "none", "important");

    // Refresh Quiz Hub state if active
    if (window.NEXUS_QUIZ_ENGINE && typeof window.NEXUS_QUIZ_ENGINE.refresh === 'function') {
      window.NEXUS_QUIZ_ENGINE.refresh();
    }
  }
}
window.updateAuthUI = updateAuthUI;

function updateProfileBadgesUI(name, avatar, role, company) {
  window.currentUserProfileData = { name, avatar, role, company };
  const initial = avatar !== '👤' ? avatar : (name ? name.charAt(0) : "U").toUpperCase();
  const firstName = name.split(" ")[0];

  // Top-Right Hero Badge
  const homeInitialSpan = document.getElementById("home-profile-initial");
  const homeNameSpan = document.getElementById("home-profile-name");
  if (homeInitialSpan) homeInitialSpan.textContent = initial;
  if (homeNameSpan) homeNameSpan.textContent = firstName;

  // Sidebar Compact Badge (First Name ONLY as requested to prevent truncation)
  const sidebarInitialSpan = document.getElementById("user-profile-initial");
  const sidebarNameSpan = document.getElementById("user-profile-name");
  if (sidebarInitialSpan) sidebarInitialSpan.textContent = initial;
  if (sidebarNameSpan) sidebarNameSpan.textContent = firstName;

  // Profile Modal View Mode Card
  const viewCompany = document.getElementById("view-user-company");
  const viewRole = document.getElementById("view-user-role");
  const modalName = document.getElementById("modal-user-name-display");
  const modalAvatar = document.getElementById("modal-avatar-display");

  if (viewCompany) viewCompany.textContent = company || "Not Set";
  if (viewRole) viewRole.textContent = role || "Not Set";
  if (modalName) modalName.textContent = name;
  if (modalAvatar) modalAvatar.textContent = avatar || '👤';

  // Profile Modal Edit Form Inputs
  const inputName = document.getElementById("profile-input-name");
  const inputCompany = document.getElementById("profile-input-company");
  const inputRole = document.getElementById("profile-input-role");
  if (inputName) inputName.value = name || "";
  if (inputCompany) inputCompany.value = company && company !== "Not Set" ? company : "";
  if (inputRole) inputRole.value = role && role !== "Not Set" ? role : "";
}
window.updateProfileBadgesUI = updateProfileBadgesUI;

function openAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.style.setProperty("display", "flex", "important");
    modal.classList.add("active");
    switchAuthTab('signin');
  }
}
window.openAuthModal = openAuthModal;

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.setProperty("display", "none", "important");
  }
  
  // Clear forms and errors
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  if (signinForm) signinForm.reset();
  if (signupForm) signupForm.reset();
  hideAuthError();
}
window.closeAuthModal = closeAuthModal;

function switchAuthTab(tab) {
  hideAuthError();
  const signinBtn = document.getElementById("auth-tab-signin");
  const signupBtn = document.getElementById("auth-tab-signup");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  
  if (tab === 'signin') {
    if (signinBtn) {
      signinBtn.classList.add("active");
      signinBtn.style.borderBottom = "3px solid var(--primary-navy)";
      signinBtn.style.color = "var(--primary-navy)";
    }
    if (signupBtn) {
      signupBtn.classList.remove("active");
      signupBtn.style.borderBottom = "3px solid transparent";
      signupBtn.style.color = "var(--text-muted)";
    }
    if (signinForm) signinForm.style.display = "block";
    if (signupForm) signupForm.style.display = "none";
  } else {
    if (signupBtn) {
      signupBtn.classList.add("active");
      signupBtn.style.borderBottom = "3px solid var(--primary-navy)";
      signupBtn.style.color = "var(--primary-navy)";
    }
    if (signinBtn) {
      signinBtn.classList.remove("active");
      signinBtn.style.borderBottom = "3px solid transparent";
      signinBtn.style.color = "var(--text-muted)";
    }
    if (signupForm) signupForm.style.display = "block";
    if (signinForm) signinForm.style.display = "none";
  }
}
window.switchAuthTab = switchAuthTab;

function showAuthError(message) {
  const errDiv = document.getElementById("auth-error-message");
  if (errDiv) {
    errDiv.textContent = message;
    errDiv.style.display = "block";
  }
}
window.showAuthError = showAuthError;

function hideAuthError() {
  const errDiv = document.getElementById("auth-error-message");
  if (errDiv) {
    errDiv.style.display = "none";
    errDiv.style.color = "#DC2626";
    errDiv.style.backgroundColor = "#FEF2F2";
    errDiv.style.borderColor = "#FCA5A5";
  }
}
window.hideAuthError = hideAuthError;

function togglePasswordVisibility(inputId, btnElement) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    if (btnElement) btnElement.textContent = "🙈";
  } else {
    input.type = "password";
    if (btnElement) btnElement.textContent = "👁️";
  }
}
window.togglePasswordVisibility = togglePasswordVisibility;

function toggleAuthSpinner(formId, show) {
  const form = document.getElementById(formId);
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  const spinner = btn.querySelector('.auth-spinner');
  
  if (show) {
    btn.disabled = true;
    if (spinner) spinner.style.display = "block";
  } else {
    btn.disabled = false;
    if (spinner) spinner.style.display = "none";
  }
}
window.toggleAuthSpinner = toggleAuthSpinner;

async function handleSignIn(e) {
  e.preventDefault();
  hideAuthError();
  
  const emailInput = document.getElementById('signin-email');
  const passwordInput = document.getElementById('signin-password');
  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showAuthError("⚠️ Please enter both your email address and password.");
    return;
  }

  toggleAuthSpinner('signin-form', true);
  if (typeof showGlobalLoader === 'function') showGlobalLoader("Loading...");
  
  try {
    if (!window.NEXUS_FIREBASE) throw new Error("Firebase backend unavailable");
    await window.NEXUS_FIREBASE.login(email, password);
    closeAuthModal();
  } catch (error) {
    console.error("Sign in error:", error);
    const code = error.code || "";
    
    if (code === "auth/user-not-found") {
      showAuthError("❌ No account found with this email. Please click 'Create Account' tab to sign up first.");
    } else if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
      showAuthError("❌ Incorrect password or credentials. Please check your password or click 'Forgot?'.");
    } else if (code === "auth/invalid-email") {
      showAuthError("❌ Invalid email format. Please enter a valid email address.");
    } else if (code === "auth/too-many-requests") {
      showAuthError("⚠️ Access temporarily locked due to multiple failed attempts. Please try again in a few minutes or click 'Forgot?'.");
    } else {
      showAuthError(error.message || "❌ Sign in failed. Please check your credentials.");
    }
  } finally {
    toggleAuthSpinner('signin-form', false);
    if (typeof hideGlobalLoader === 'function') hideGlobalLoader();
  }
}
window.handleSignIn = handleSignIn;

function selectSignupAvatar(avatar, element) {
  selectedSignupAvatarSymbol = avatar || '👤';
  const valInput = document.getElementById('signup-avatar-value');
  if (valInput) valInput.value = selectedSignupAvatarSymbol;
  const preview = document.getElementById('signup-avatar-preview');
  if (preview) {
    preview.textContent = selectedSignupAvatarSymbol;
    preview.style.transform = 'scale(1.2)';
    setTimeout(() => { preview.style.transform = 'scale(1)'; }, 180);
  }
  document.querySelectorAll('.signup-avatar-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (element) {
    element.classList.add('active');
  }
}
window.selectSignupAvatar = selectSignupAvatar;

async function handleSignUp(e) {
  e.preventDefault();
  hideAuthError();
  
  const name = document.getElementById('signup-name').value;
  const company = document.getElementById('signup-company').value;
  const role = document.getElementById('signup-role').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-password-confirm').value;
  const avatarEl = document.getElementById('signup-avatar-value');
  const avatar = (avatarEl && avatarEl.value) ? avatarEl.value : (selectedSignupAvatarSymbol || '👤');
  
  if (password !== confirm) {
    showAuthError("⚠️ Password confirmation does not match. Please re-enter your password.");
    return;
  }
  
  toggleAuthSpinner('signup-form', true);
  if (typeof showGlobalLoader === 'function') showGlobalLoader("Loading...");
  
  try {
    if (!window.NEXUS_FIREBASE) throw new Error("Firebase not initialized");
    const user = await window.NEXUS_FIREBASE.signUp(email, password, name, company || "Not Set", role || "Not Set", avatar);
    
    if (user && window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveUserProfileData === 'function') {
      await window.NEXUS_FIREBASE.saveUserProfileData(user.uid, {
        company: company || "Not Set",
        role: role || "Not Set",
        name: name,
        displayName: name,
        email: email,
        avatar: avatar,
        createdAt: new Date().toISOString()
      });
    }
    
    if (user) updateAuthUI(user);
    closeAuthModal();
    if (typeof switchPage === 'function') switchPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error("Sign up error:", error);
    const code = error.code || "";
    if (code === "auth/email-already-in-use") {
      showAuthError("⚠️ An account already exists with this email address! Please click 'Sign In' tab to log in.");
    } else if (code === "auth/weak-password") {
      showAuthError("⚠️ Password is too weak. Please use at least 6 characters.");
    } else if (code === "auth/invalid-email") {
      showAuthError("⚠️ Invalid email format. Please enter a valid email address.");
    } else {
      showAuthError(error.message || "Failed to create account.");
    }
  } finally {
    toggleAuthSpinner('signup-form', false);
    if (typeof hideGlobalLoader === 'function') hideGlobalLoader();
  }
}
window.handleSignUp = handleSignUp;

async function handleLogout() {
  try {
    if (typeof showGlobalLoader === 'function') showGlobalLoader("Loading...");
    closeProfileModal();
    closeAuthModal();

    if (window.NEXUS_FIREBASE) {
      await window.NEXUS_FIREBASE.logout();
    }

    if (typeof switchPage === 'function') switchPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    if (typeof hideGlobalLoader === 'function') hideGlobalLoader();
  }
}
window.handleLogout = handleLogout;

async function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('signin-email').value.trim();
  if (!email) {
    showAuthError("Please enter your email address first.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAuthError("Please enter a valid email address.");
    return;
  }
  
  try {
    if (!window.NEXUS_FIREBASE) {
      throw new Error("Firebase backend unavailable. Please refresh the page and try again.");
    }

    if (typeof window.NEXUS_FIREBASE.sendPasswordResetEmail === 'function') {
      await window.NEXUS_FIREBASE.sendPasswordResetEmail(email);
    } else if (window.NEXUS_FIREBASE.auth) {
      await window.NEXUS_FIREBASE.auth.sendPasswordResetEmail(email);
    } else {
      throw new Error("Authentication service is not available.");
    }

    const msgEl = document.getElementById("auth-error-message");
    showAuthError("✅ Password reset email sent to " + email + "! Check your inbox (and spam/junk folder). The link expires in 1 hour.");
    if (msgEl) {
      msgEl.style.color = "#059669";
      msgEl.style.backgroundColor = "#D1FAE5";
      msgEl.style.borderColor = "#6EE7B7";
    }
  } catch (error) {
    console.error("❌ Password reset failed:", error.code, error.message);
    let userMessage;
    switch (error.code) {
      case 'auth/user-not-found':
        userMessage = "No account found with this email address. Please check the email or create a new account.";
        break;
      case 'auth/invalid-email':
        userMessage = "Invalid email address format. Please check and try again.";
        break;
      case 'auth/too-many-requests':
        userMessage = "Too many reset attempts. Please wait a few minutes before trying again.";
        break;
      case 'auth/network-request-failed':
        userMessage = "Network error. Please check your internet connection and try again.";
        break;
      default:
        userMessage = error.message || "Failed to send password reset email. Please try again.";
    }
    showAuthError(userMessage);
  }
}
window.handleForgotPassword = handleForgotPassword;

/* Profile Modal Methods */
function toggleProfileEditMode(isEdit) {
  const viewSection = document.getElementById("profile-view-section");
  const editSection = document.getElementById("profile-edit-section");
  
  if (isEdit) {
    if (viewSection) viewSection.style.display = "none";
    if (editSection) editSection.style.display = "block";
  } else {
    if (viewSection) viewSection.style.display = "block";
    if (editSection) editSection.style.display = "none";
  }
}
window.toggleProfileEditMode = toggleProfileEditMode;

function openProfileModal() {
  if (!currentUser) {
    openAuthModal();
    return;
  }

  const modal = document.getElementById("profile-modal");
  if (!modal) return;

  toggleProfileEditMode(false);

  const displayName = currentUser.displayName || currentUser.email.split('@')[0];
  const nameDisplay = document.getElementById("modal-user-name-display");
  const emailDisplay = document.getElementById("modal-user-email-display");
  const nameInput = document.getElementById("profile-input-name");
  if (nameDisplay) nameDisplay.textContent = displayName;
  if (emailDisplay) emailDisplay.textContent = currentUser.email;
  if (nameInput) nameInput.value = displayName;

  const db = getFirestoreDb();
  if (db) {
    db.collection("users").doc(currentUser.uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const realName = data.name || data.displayName || displayName;
        const realCompany = data.company || "Not Set";
        const realRole = data.role || "Not Set";
        const realAvatar = data.avatar || "👤";

        if (nameInput) nameInput.value = realName;
        const compInput = document.getElementById("profile-input-company");
        const roleInput = document.getElementById("profile-input-role");
        if (compInput) compInput.value = realCompany !== "Not Set" ? realCompany : "";
        if (roleInput) roleInput.value = realRole !== "Not Set" ? realRole : "";
        
        const viewComp = document.getElementById("view-user-company");
        const viewRole = document.getElementById("view-user-role");
        if (viewComp) viewComp.textContent = realCompany;
        if (viewRole) viewRole.textContent = realRole;
        if (nameDisplay) nameDisplay.textContent = realName;
        
        selectedAvatarSymbol = realAvatar;
        const avatarDisplay = document.getElementById("modal-avatar-display");
        if (avatarDisplay) avatarDisplay.textContent = realAvatar;

        document.querySelectorAll(".avatar-option").forEach(btn => {
          if (btn.dataset.avatar === realAvatar) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
    });
  }

  modal.classList.add("active");
}
window.openProfileModal = openProfileModal;

function closeProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.remove("active");
  
  const msg = document.getElementById("profile-success-message");
  const err = document.getElementById("profile-error-message");
  if (msg) msg.style.display = "none";
  if (err) err.style.display = "none";
}
window.closeProfileModal = closeProfileModal;

function selectAvatar(avatar, element) {
  selectedAvatarSymbol = avatar;
  const avatarDisplay = document.getElementById("modal-avatar-display");
  if (avatarDisplay) avatarDisplay.textContent = avatar;
  
  document.querySelectorAll(".avatar-option").forEach(btn => {
    btn.classList.remove("active");
  });

  if (element) {
    element.classList.add("active");
  }
}
window.selectAvatar = selectAvatar;

async function saveUserProfile(e) {
  e.preventDefault();
  if (!currentUser) return;

  const nameInput = document.getElementById("profile-input-name");
  const compInput = document.getElementById("profile-input-company");
  const roleInput = document.getElementById("profile-input-role");
  const name = nameInput ? nameInput.value.trim() : "";
  const company = compInput ? compInput.value.trim() : "";
  const role = roleInput ? roleInput.value.trim() : "";

  const btn = document.getElementById("profile-save-btn");
  if (btn) btn.disabled = true;

  if (typeof showGlobalLoader === 'function') showGlobalLoader("Saving Profile...");

  try {
    await currentUser.updateProfile({ displayName: name });

    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveUserProfileData === 'function') {
      await window.NEXUS_FIREBASE.saveUserProfileData(currentUser.uid, {
        name: name,
        displayName: name,
        company: company || "Not Set",
        role: role || "Not Set",
        avatar: selectedAvatarSymbol
      });
    }

    updateProfileBadgesUI(name, selectedAvatarSymbol, role || "Not Set", company || "Not Set");
    closeProfileModal();
    if (typeof showToast === 'function') showToast("✅ Profile updated successfully!", "success");
  } catch (err) {
    console.error("Error saving profile:", err);
    const errDiv = document.getElementById("profile-error-message");
    if (errDiv) {
      errDiv.textContent = err.message || "Failed to update profile.";
      errDiv.style.display = "block";
    }
  } finally {
    if (btn) btn.disabled = false;
    if (typeof hideGlobalLoader === 'function') hideGlobalLoader();
  }
}
window.saveUserProfile = saveUserProfile;

async function handleSwitchAccount() {
  closeProfileModal();
  await handleLogout();
  setTimeout(() => {
    openAuthModal();
  }, 400);
}
window.handleSwitchAccount = handleSwitchAccount;
