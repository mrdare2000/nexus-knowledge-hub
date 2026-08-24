// Nexus Quiz Hub - Interactive Engine & Certification Management
// Pure Client-Side Interactive Engine (No Login, No Admin Portal, No External Database)

(function () {
  'use strict';

  // State Management
  let userAttempts = [];
  let activeWeekIndex = 0;
  let activeQuiz = null;
  let isAttemptingQuiz = false;
  let currentViewingAttempt = null;

  // Calculate Active Week Index (Defaults to Latest Active Week)
  function calculateActiveWeekIndex() {
    if (!window.NEXUS_QUIZ_DATABASE || !window.NEXUS_QUIZ_DATABASE.weeks) return 0;
    const weeksPool = window.NEXUS_QUIZ_DATABASE.weeks;
    return weeksPool.length - 1; // Always features the latest active week
  }

  let fetchedRemoteAttempts = false;

  function getCurrentAuthUser() {
    if (typeof window.getCurrentUser === 'function' && window.getCurrentUser()) {
      return window.getCurrentUser();
    }
    if (window.currentUser) {
      return window.currentUser;
    }
    if (window.NEXUS_FIREBASE) {
      if (typeof window.NEXUS_FIREBASE.getCurrentUser === 'function' && window.NEXUS_FIREBASE.getCurrentUser()) {
        return window.NEXUS_FIREBASE.getCurrentUser();
      }
      const auth = typeof window.NEXUS_FIREBASE.getAuth === 'function' ? window.NEXUS_FIREBASE.getAuth() : null;
      if (auth && auth.currentUser) return auth.currentUser;
    }
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
      return firebase.auth().currentUser;
    }
    return null;
  }

  // Initialize Quiz Hub
  function initQuizHub() {
    activeWeekIndex = calculateActiveWeekIndex();
    if (window.NEXUS_QUIZ_DATABASE && window.NEXUS_QUIZ_DATABASE.weeks) {
      activeQuiz = window.NEXUS_QUIZ_DATABASE.weeks[activeWeekIndex];
    }

    renderQuizHubUI();
  }

  // Render Core UI Shell
  async function renderQuizHubUI() {
    const container = document.getElementById('quiz-hub-container');
    if (!container) return;

    const currentUser = getCurrentAuthUser();

    // 1. GATEKEEPER: If user is logged out, show Gatekeeper UI
    if (!currentUser) {
      container.innerHTML = renderQuizGatekeeperUI();
      // Set short retry timeouts to catch async Firebase Auth hydration
      if (!window.__quizAuthHydrationChecked) {
        window.__quizAuthHydrationChecked = true;
        [300, 800, 1500, 3000].forEach(delay => {
          setTimeout(() => {
            const recheckUser = getCurrentAuthUser();
            if (recheckUser) {
              console.log("🔓 Firebase Auth hydrated user asynchronously, unlocking Quiz Hub...");
              renderQuizHubUI();
            }
          }, delay);
        });
      }
      return;
    } else {
      window.__quizAuthHydrationChecked = false;
    }

    // Auto-regrade any previous 0% attempts caused by earlier schema mismatch
    regradePreviousZeroAttempts(userAttempts);

    // 2. Fetch remote attempts from Firestore if logged in (Backend is primary source)
    if (currentUser && window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.fetchQuizAttempts === 'function') {
      if (!fetchedRemoteAttempts) {
        fetchedRemoteAttempts = true;
        try {
          const remoteAttempts = await window.NEXUS_FIREBASE.fetchQuizAttempts(currentUser.uid);
          if (remoteAttempts && remoteAttempts.length > 0) {
            userAttempts = regradePreviousZeroAttempts(remoteAttempts);
            // Update localStorage cache with backend data
            try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts)); } catch(e) {}
          } else {
            // Backend has no data — try localStorage cache as fallback for offline scenarios
            try {
              const cached = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
              if (cached.length > 0) {
                userAttempts = regradePreviousZeroAttempts(cached);
              }
            } catch(e) {}
          }
        } catch(err) {
          console.error("Error fetching user attempts from backend:", err);
          // Fallback to localStorage cache on network error
          try {
            const cached = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
            if (cached.length > 0) userAttempts = cached;
          } catch(e) {}
        }
      }
    } else if (!currentUser) {
      // Not logged in — clear attempts
      userAttempts = [];
    }

    if (currentViewingAttempt) {
      container.innerHTML = renderQuizResultsView(currentViewingAttempt);
      bindResultsViewEvents();
    } else if (isAttemptingQuiz) {
      container.innerHTML = renderQuizQuestionsForm();
      bindQuizEvents();
    } else {
      container.innerHTML = renderCandidateStrip(currentUser) + renderPortalDashboard();
      bindDashboardEvents();
    }
  }

  function regradePreviousZeroAttempts(attempts) {
    if (!attempts || !Array.isArray(attempts) || typeof NEXUS_QUIZ_DATABASE === 'undefined') return attempts;
    let modified = false;

    attempts.forEach(a => {
      const week = (NEXUS_QUIZ_DATABASE.weeks && NEXUS_QUIZ_DATABASE.weeks.length > 0)
        ? (NEXUS_QUIZ_DATABASE.weeks.find(w => w.id === a.weekId) || NEXUS_QUIZ_DATABASE.weeks[0])
        : null;
      if (!week) return;

      let mcqScore = 0;
      let shortScore = 0;

      if (a.detailedResults && Array.isArray(a.detailedResults)) {
        a.detailedResults.forEach(r => {
          const q = week.questions.find(item => item.id === r.questionId || item.question === r.question);
          if (!q) return;

          if (q.type === 'mcq') {
            const correctIdx = (typeof q.answerIndex !== 'undefined') ? q.answerIndex : q.correctAnswer;
            const correctText = q.options[correctIdx];
            r.correctAnswer = correctText;

            if (r.userAnswer === correctText || (typeof r.userChoiceIdx !== 'undefined' && r.userChoiceIdx === correctIdx)) {
              r.isCorrect = true;
              mcqScore++;
            } else {
              r.isCorrect = false;
            }
          } else if (q.type === 'short') {
            const validKeywords = q.keywords || q.acceptedKeywords || [];
            const modelAns = q.modelAnswer || q.correctAnswer || (validKeywords.length > 0 ? validKeywords.join(' / ') : '');
            r.correctAnswer = modelAns;

            if (validKeywords.length > 0) {
              if (validKeywords.some(kw => (r.userAnswer || '').toLowerCase().includes(kw.toLowerCase()))) {
                r.isCorrect = true;
                shortScore++;
              } else {
                r.isCorrect = false;
              }
            }
          }
        });

        const totalScore = mcqScore + shortScore;
        const percentage = Math.round((totalScore / 20) * 100);

        if (a.percentage !== percentage || a.mcqScore !== mcqScore) {
          a.mcqScore = mcqScore;
          a.shortScore = shortScore;
          a.totalScore = totalScore;
          a.percentage = percentage;
          if (percentage >= 90) a.grade = "Distinction / Freight Master 🏆";
          else if (percentage >= 75) a.grade = "Merit / Advanced Practitioner 🥈";
          else if (percentage >= 50) a.grade = "Pass / Competent Practitioner 🥉";
          else a.grade = "Re-attempt Recommended";
          modified = true;

          // Push corrected score to Cloud Firestore & Realtime DB
          if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveQuizAttempt === 'function') {
            window.NEXUS_FIREBASE.saveQuizAttempt(a);
          }
        }
      }
    });

    if (modified) {
      localStorage.setItem('nexus_quiz_attempts', JSON.stringify(attempts));
    }
    return attempts;
  }

  function renderQuizGatekeeperUI() {
    return `
      <div class="quiz-gatekeeper-card" style="max-width: 680px; margin: 35px auto; padding: 48px 36px; text-align: center; background: linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%); border: 1.5px solid #E2E8F0; border-radius: 28px; box-shadow: 0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.02); color: var(--primary-navy); position: relative; overflow: hidden;">
        
        <!-- Subtle Top Decorative Glow Accent -->
        <div style="position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 280px; height: 120px; background: radial-gradient(circle, rgba(255, 90, 31, 0.12) 0%, rgba(255, 255, 255, 0) 70%); pointer-events: none;"></div>

        <!-- Category Badge Pill -->
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 30px; color: var(--accent-orange); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 22px;">
          <span>✨</span> Professional Certification Hub
        </div>

        <!-- Lock Icon Badge -->
        <div style="width: 84px; height: 84px; background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 2.5px solid var(--accent-orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 22px auto; font-size: 2.5rem; box-shadow: 0 12px 28px -6px rgba(255, 90, 31, 0.25);">
          🔐
        </div>

        <!-- Main Title -->
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.9rem; font-weight: 800; margin-bottom: 12px; color: var(--primary-navy); letter-spacing: -0.3px;">
          Unlock Quiz Hub & Certifications
        </h2>

        <!-- Description -->
        <p style="font-size: 0.98rem; color: #475569; margin-bottom: 30px; line-height: 1.65; max-width: 530px; margin-left: auto; margin-right: auto; font-weight: 500;">
          Access weekly freight forwarding challenges, evaluate Incoterms & SOLAS mastery, track your progress, and earn verifiable logistics certificates.
        </p>

        <!-- Feature Highlight Pills -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 34px; text-align: left;">
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 14px 16px; border-radius: 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <span style="font-size: 1.3rem;">🎯</span>
            <span style="font-size: 0.83rem; font-weight: 700; color: var(--primary-navy); line-height: 1.3;">Weekly Freight Challenges</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 14px 16px; border-radius: 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <span style="font-size: 1.3rem;">🏆</span>
            <span style="font-size: 0.83rem; font-weight: 700; color: var(--primary-navy); line-height: 1.3;">Verifiable Digital Certificates</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 14px 16px; border-radius: 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <span style="font-size: 1.3rem;">⚡</span>
            <span style="font-size: 0.83rem; font-weight: 700; color: var(--primary-navy); line-height: 1.3;">Cross-Device Score Syncing</span>
          </div>
        </div>

        <!-- Primary Call to Action Button -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 14px;">
          <button onclick="openAuthModal()" class="btn btn-primary" style="padding: 15px 38px; font-size: 1.05rem; font-weight: 700; border-radius: 14px; background: linear-gradient(135deg, #FF5A1F 0%, #FF7A00 100%); color: white; border: none; box-shadow: 0 12px 28px -6px rgba(255, 90, 31, 0.38); cursor: pointer; transition: all 0.25s ease;">
            🔑 Sign In / Create Free Account
          </button>
          
          <span style="font-size: 0.84rem; color: #64748B; font-weight: 500;">
            100% Free for Students & Freight Professionals
          </span>
        </div>
      </div>
    `;
  }

  function renderCandidateStrip(user) {
    const avatar = (typeof selectedAvatarSymbol !== 'undefined') ? selectedAvatarSymbol : '👤';
    const name = user.displayName || user.email.split('@')[0];
    
    let subtext = user.email;
    if (window.currentUserProfileData) {
      const role = window.currentUserProfileData.role;
      const company = window.currentUserProfileData.company;
      if (role && role !== "Not Set" && company && company !== "Not Set") {
        subtext = `${role} • ${company}`;
      } else if (role && role !== "Not Set") {
        subtext = role;
      } else if (company && company !== "Not Set") {
        subtext = company;
      }
    }

    return `
      <div class="quiz-candidate-strip" style="background: var(--bg-white); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px 22px; margin-bottom: 25px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px; box-shadow: 0 4px 15px rgba(10,37,64,0.04);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #FFF7ED; border: 2px solid var(--accent-orange); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: 0 2px 8px rgba(255, 90, 31, 0.25); flex-shrink: 0;">
            ${avatar}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-navy); display: flex; align-items: center; gap: 8px;">
              ${name}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; margin-top: 2px;">${subtext}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" onclick="openProfileModal()" class="btn btn-secondary" style="padding: 8px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; border: 1px solid var(--accent-orange); color: var(--accent-orange); background: #FFF7ED; cursor: pointer; display: flex; align-items: center; gap: 5px;">
            ✏️ Edit Profile
          </button>
        </div>
      </div>
    `;
  }

  // Render Portal Dashboard
  function renderPortalDashboard() {
    const currentUser = getCurrentAuthUser();
    const myAttempts = userAttempts
      .filter(a => currentUser && (a.userId === currentUser.uid || a.userEmail === currentUser.email))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const totalAttempts = myAttempts.length;
    const avgScore = totalAttempts > 0 ? Math.round(myAttempts.reduce((acc, cur) => acc + (cur.percentage || 0), 0) / totalAttempts) : 0;
    const passedAttempts = myAttempts.filter(a => (a.percentage || 0) >= 50);
    const bestScore = totalAttempts > 0 ? Math.max(...myAttempts.map(a => a.percentage || 0)) : 0;

    let rankLabel = "New Learner";
    if (bestScore >= 90) rankLabel = "Freight Master 🏆";
    else if (bestScore >= 75) rankLabel = "Advanced Practitioner 🥈";
    else if (bestScore >= 50) rankLabel = "Competent Practitioner 🥉";

    const weeks = window.NEXUS_QUIZ_DATABASE ? window.NEXUS_QUIZ_DATABASE.weeks : [];
    const activeQuiz = weeks.length > 0 ? weeks[weeks.length - 1] : null;

    return `
      <div class="quiz-portal-dashboard" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Page Section Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 35px;">
          <h2 style="font-size: 2.2rem; margin-bottom: 8px; font-family: 'Outfit', sans-serif;">
            <span style="color: var(--primary-navy);">Quiz</span> <span style="color: var(--accent-orange);">Hub</span>
          </h2>
          <p style="font-size: 0.98rem; color: var(--text-muted); max-width: 650px; margin: 0 auto; line-height: 1.5;">
            Test your knowledge with weekly logistics challenges, track competency scores, and earn verifiable certificates.
          </p>
        </div>

        <!-- 4 Metric Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
          
          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Quizzes</span>
              <span style="font-size: 1.6rem;">🏆</span>
            </div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--primary-navy); font-family: 'Outfit', sans-serif;">${totalAttempts}</div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Completed attempts</span>
          </div>

          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Score</span>
              <span style="font-size: 1.6rem;">📊</span>
            </div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--accent-orange); font-family: 'Outfit', sans-serif;">${avgScore}%</div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Overall accuracy</span>
          </div>

          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Certificates</span>
              <span style="font-size: 1.6rem;">📜</span>
            </div>
            <div style="font-size: 2rem; font-weight: 900; color: #10B981; font-family: 'Outfit', sans-serif;">${passedAttempts.length}</div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Earned Statements</span>
          </div>

          <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Rank Level</span>
              <span style="font-size: 1.6rem;">🥇</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-navy); font-family: 'Outfit', sans-serif; margin-top: 5px;">${rankLabel}</div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Based on highest score</span>
          </div>

        </div>
        
        <!-- Active Featured Weekly Challenge Card -->
        <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 2px solid var(--accent-orange); border-radius: 24px; padding: 30px; margin-bottom: 35px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; box-shadow: 0 10px 30px rgba(255,90,31,0.12);">
          <div>
            <span style="background: var(--accent-orange); color: white; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 10px;">
              🔥 FEATURED WEEKLY CHALLENGE
            </span>
            <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 10px 0; font-size: 1.5rem;">
              ${activeQuiz ? activeQuiz.title : 'Weekly Quiz Challenge'}
            </h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin: 0 0 15px 0; line-height: 1.5;">
              ${activeQuiz ? activeQuiz.description : 'Test your logistics knowledge with 20 weekly questions.'}
            </p>
            <div style="display: flex; gap: 15px; font-size: 0.82rem; color: var(--primary-navy); font-weight: 700;">
              <span>📝 20 Assessment Questions</span>
              <span>•</span>
              <span>⏱️ Rotates Every Monday</span>
            </div>
          </div>

          <div>
            ${(function(){
              if (!activeQuiz) return '';
              const actAtt = myAttempts.find(a => a.weekId === activeQuiz.id);
              if (actAtt) {
                return `
                  <button class="btn btn-secondary btn-view-results" data-attempt-id="${actAtt.attemptId}" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.05rem; border: 2px solid #10B981; color: #065F46; background: #ECFDF5; white-space: nowrap;">
                    📊 View Score & Certificate
                  </button>
                `;
              }
              return `<button id="btn-start-active-quiz" class="btn btn-primary" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.05rem; box-shadow: 0 10px 25px rgba(255,90,31,0.3); white-space: nowrap;">
                🚀 Attempt Active Quiz
              </button>`;
            })()}
          </div>
        </div>

        <!-- Quiz Categories & Available Weekly Quizzes -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.4rem; margin: 0 0 20px 0;">
          📚 Available Quizzes
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 45px;">
          ${[...weeks].reverse().map((w) => {
            const originalSetNum = weeks.indexOf(w) + 1;
            const attempt = myAttempts.find(a => a.weekId === w.id);
            return `
              <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 24px; border-radius: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="background: #EFF6FF; color: #1E40AF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">
                      SET #${originalSetNum}
                    </span>
                    ${attempt ? `<span style="background: #F0FDF4; color: #15803D; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">Completed: ${attempt.percentage}%</span>` : `<span style="background: #FFFBEB; color: #B45309; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">Available</span>`}
                  </div>
                  <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.15rem; line-height: 1.4; font-weight: 800;">${w.title}</h4>
                  <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0 0 20px 0; line-height: 1.5;">${w.description}</p>
                </div>

                ${attempt ? `
                  <button class="btn btn-secondary btn-view-results" data-attempt-id="${attempt.attemptId}" style="width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; border: 1.5px solid #10B981; color: #065F46; background: #ECFDF5;">
                    📊 View Score & Certificate
                  </button>
                ` : `
                  <button class="btn btn-primary btn-select-quiz" data-week-id="${w.id}" style="width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem;">
                    📝 Attempt Quiz
                  </button>
                `}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Result History & Downloadable Certificates Table -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.4rem; margin: 0 0 20px 0;">
          📜 Your Result History & Downloadable Certificates
        </h3>

        <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); border-radius: 18px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow-x: auto;">
          <table class="kb-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <thead>
              <tr style="background: #F8FAFC; text-align: left;">
                <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Date</th>
                <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Quiz Title</th>
                <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Score %</th>
                <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Grade Level</th>
                <th style="padding: 12px; border-bottom: 2px solid #CBD5E1; text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${myAttempts.length === 0 ? `
                <tr>
                  <td colspan="5" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    No completed quiz attempts yet. Click <strong>"🚀 Attempt Active Quiz"</strong> above to start!
                  </td>
                </tr>
              ` : ''}
              ${myAttempts.map(a => `
                <tr>
                  <td style="padding: 14px 12px; border-bottom: 1px solid #E2E8F0; color: var(--text-muted); font-size: 0.85rem;">
                    ${new Date(a.timestamp).toLocaleDateString()}
                  </td>
                  <td style="padding: 14px 12px; border-bottom: 1px solid #E2E8F0; font-weight: 700; color: var(--primary-navy);">
                    ${a.weekTitle}
                  </td>
                  <td style="padding: 14px 12px; border-bottom: 1px solid #E2E8F0; font-weight: 900; color: var(--accent-orange);">
                    ${a.percentage}%
                  </td>
                  <td style="padding: 14px 12px; border-bottom: 1px solid #E2E8F0; font-weight: 600; color: var(--primary-navy);">
                    ${a.grade}
                  </td>
                  <td style="padding: 14px 12px; border-bottom: 1px solid #E2E8F0; text-align: center;">
                    <div style="display: flex; gap: 8px; justify-content: center;">
                      <button class="btn-view-results" data-attempt-id="${a.attemptId}" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 800; border: 1.5px solid var(--primary-navy); color: var(--primary-navy); background: #F8FAFC; cursor: pointer; transition: all 0.2s ease;">
                        📊 View Score
                      </button>
                      <button class="btn btn-primary btn-download-hist-pdf" data-attempt-id="${a.attemptId}" style="padding: 6px 16px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">
                        📜 PDF Certificate
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>
    `;
  }

  // Bind Dashboard Events
  function bindDashboardEvents() {
    const startActiveBtn = document.getElementById('btn-start-active-quiz');
    if (startActiveBtn) {
      startActiveBtn.addEventListener('click', function () {
        isAttemptingQuiz = true;
        currentViewingAttempt = null;
        renderQuizHubUI();
      });
    }

    const selectBtns = document.querySelectorAll('.btn-select-quiz');
    selectBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const weekId = btn.getAttribute('data-week-id');
        const selected = window.NEXUS_QUIZ_DATABASE.weeks.find(w => w.id === weekId);
        if (selected) {
          activeQuiz = selected;
          isAttemptingQuiz = true;
          currentViewingAttempt = null;
          renderQuizHubUI();
        }
      });
    });

    const viewBtns = document.querySelectorAll('.btn-view-results');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const attId = btn.getAttribute('data-attempt-id');
        const att = userAttempts.find(a => a.attemptId === attId);
        if (att) {
          currentViewingAttempt = att;
          isAttemptingQuiz = false;
          renderQuizHubUI();
        }
      });
    });

    const pdfBtns = document.querySelectorAll('.btn-download-hist-pdf');
    pdfBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const attId = btn.getAttribute('data-attempt-id');
        const att = userAttempts.find(a => a.attemptId === attId);
        if (att) downloadPDFResultSheet(att);
      });
    });
  }

  // Render Quiz Questions Form
  function renderQuizQuestionsForm() {
    let html = `
      <div class="quiz-questions-view" style="max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Header Navigation Back Button -->
        <div style="margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-white); padding: 15px 25px; border-radius: 16px; border: 1.5px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <button id="btn-back-to-dashboard" style="padding: 10px 22px; border-radius: 30px; font-weight: 800; font-size: 0.88rem; border: 1.5px solid var(--primary-navy); color: var(--primary-navy); background: #F8FAFC; cursor: pointer; transition: all 0.2s ease;">
            ← Back
          </button>
          <span style="font-size: 0.9rem; font-weight: 800; color: var(--primary-navy); font-family: 'Outfit', sans-serif;">
            ${activeQuiz.title}
          </span>
        </div>

        <form id="quiz-attempt-form" style="display: flex; flex-direction: column; gap: 25px;">
          
          <h3 style="font-family:'Outfit', sans-serif; color: var(--primary-navy); border-bottom: 2.5px solid var(--accent-orange); padding-bottom: 8px; margin-top: 10px; font-size: 1.25rem;">
            SECTION 1: Multiple Choice Questions (10 Marks)
          </h3>
    `;

    // Render 10 MCQs
    activeQuiz.questions.filter(q => q.type === 'mcq').forEach((q, idx) => {
      html += `
        <div class="quiz-question-card" style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.78rem; font-weight: 800; background: #EFF6FF; color: #1E40AF; padding: 4px 12px; border-radius: 8px;">
              Q${idx + 1} • ${q.category}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">MCQ (1 Mark)</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--primary-navy); margin: 0 0 15px 0; line-height: 1.5; font-weight: 700;">${q.question}</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${q.options.map((opt, oIdx) => `
              <label style="display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1.5px solid var(--border-color); border-radius: 12px; cursor: pointer; transition: all 0.2s ease; background: #FAFAFA;" class="quiz-opt-label">
                <input type="radio" name="q_${q.id}" value="${oIdx}" class="quiz-radio" style="accent-color: var(--accent-orange);" required>
                <span style="font-size: 0.92rem; color: var(--primary-navy);">${opt}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <h3 style="font-family:'Outfit', sans-serif; color: var(--primary-navy); border-bottom: 2.5px solid var(--accent-orange); padding-bottom: 8px; margin-top: 20px; font-size: 1.25rem;">
        SECTION 2: Short Answer Questions (10 Marks)
      </h3>
    `;

    // Render 10 Short Answer Questions
    activeQuiz.questions.filter(q => q.type === 'short').forEach((q, idx) => {
      html += `
        <div class="quiz-question-card" style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.78rem; font-weight: 800; background: #F0FDF4; color: #166534; padding: 4px 12px; border-radius: 8px;">
              Q${idx + 11} • ${q.category}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Short Answer (1 Mark)</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--primary-navy); margin: 0 0 12px 0; line-height: 1.5; font-weight: 700;">${q.question}</h4>
          <input type="text" name="q_${q.id}" required placeholder="Type your answer here..." style="width: 100%; padding: 14px 18px; border: 1.5px solid var(--border-color); border-radius: 12px; font-size: 0.95rem;">
        </div>
      `;
    });

    html += `
          <div style="text-align: center; margin: 35px 0 20px 0;">
            <button type="submit" class="btn btn-primary" style="padding: 18px 50px; border-radius: 50px; font-weight: 900; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(255,90,31,0.35);">
              ✅ Submit Quiz
            </button>
          </div>
        </form>
      </div>
    `;

    return html;
  }

  // Bind Quiz Events
  function bindQuizEvents() {
    const backBtn = document.getElementById('btn-back-to-dashboard');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        isAttemptingQuiz = false;
        renderQuizHubUI();
      });
    }

    const form = document.getElementById('quiz-attempt-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        gradeAssessment(form);
      });
    }
  }

  // Grade Assessment Logic
  async function gradeAssessment(form) {
    let mcqScore = 0;
    let shortScore = 0;
    const detailedResults = [];

    activeQuiz.questions.forEach((q) => {
      if (q.type === 'mcq') {
        const selectedRadio = form.querySelector(`input[name="q_${q.id}"]:checked`);
        const userChoiceIdx = selectedRadio ? parseInt(selectedRadio.value) : -1;
        const correctIdx = (typeof q.answerIndex !== 'undefined') ? q.answerIndex : q.correctAnswer;
        const isCorrect = (userChoiceIdx === correctIdx);
        if (isCorrect) mcqScore++;

        const correctAnsText = (q.options && typeof correctIdx === 'number' && q.options[correctIdx]) 
          ? q.options[correctIdx] 
          : (q.correctAnswer || 'N/A');

        detailedResults.push({
          questionId: q.id,
          question: q.question,
          userAnswer: userChoiceIdx >= 0 ? q.options[userChoiceIdx] : 'No Answer',
          correctAnswer: correctAnsText,
          isCorrect: isCorrect,
          explanation: q.explanation
        });
      } else if (q.type === 'short') {
        const inputField = form.querySelector(`input[name="q_${q.id}"]`);
        const userText = inputField ? inputField.value.trim().toLowerCase() : '';
        
        const validKeywords = q.keywords || q.acceptedKeywords || [];
        const modelAns = q.modelAnswer || q.correctAnswer || (validKeywords.length > 0 ? validKeywords.join(' / ') : '');

        let isCorrect = false;
        if (validKeywords.length > 0) {
          isCorrect = validKeywords.some(kw => userText.includes(kw.toLowerCase()));
        } else if (modelAns) {
          isCorrect = userText.includes(modelAns.toLowerCase());
        }
        if (isCorrect) shortScore++;

        detailedResults.push({
          questionId: q.id,
          question: q.question,
          userAnswer: userText || 'No Answer',
          correctAnswer: modelAns,
          isCorrect: isCorrect,
          explanation: q.explanation
        });
      }
    });

    const totalScore = mcqScore + shortScore;
    const percentage = Math.round((totalScore / 20) * 100);

    let grade = "Re-attempt Recommended";
    if (percentage >= 90) grade = "Distinction / Freight Master 🏆";
    else if (percentage >= 75) grade = "Merit / Advanced Practitioner 🥈";
    else if (percentage >= 50) grade = "Pass / Competent Practitioner 🥉";

    const currentUser = getCurrentAuthUser();
    const profile = window.currentUserProfileData || {};
    const candidateName = profile.name || (currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Logistics Candidate");
    const candidateEmail = currentUser ? currentUser.email : "candidate@nexus.com";
    const candidateUid = currentUser ? currentUser.uid : "usr_guest";
    const candidateRole = (profile.role && profile.role !== 'Not Set') ? profile.role : '';
    const candidateCompany = (profile.company && profile.company !== 'Not Set') ? profile.company : '';

    const attemptRecord = {
      attemptId: 'att_' + Date.now(),
      userId: candidateUid,
      userName: candidateName,
      userEmail: candidateEmail,
      userCompany: candidateCompany || 'Not Set',
      userRole: candidateRole || 'Not Set',
      weekId: activeQuiz.id,
      weekTitle: activeQuiz.title,
      mcqScore: mcqScore,
      shortScore: shortScore,
      totalScore: totalScore,
      percentage: percentage,
      grade: grade,
      timestamp: new Date().toISOString(),
      detailedResults: detailedResults
    };

    userAttempts.unshift(attemptRecord);

    // 1. Cache to localStorage immediately for instant data safety
    try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts)); } catch(e) {}

    // 2. Transition UI to Results & Certificate view INSTANTLY (<20ms)
    isAttemptingQuiz = false;
    currentViewingAttempt = attemptRecord;
    renderQuizHubUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 3. Asynchronously sync to Cloud Firebase Backend in background
    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveQuizAttempt === 'function') {
      window.NEXUS_FIREBASE.saveQuizAttempt(attemptRecord).then(saved => {
        console.log('☁️ Quiz attempt synced to Cloud Backend:', saved);
      }).catch(err => {
        console.error('❌ Cloud quiz sync warning:', err);
      });
    }
  }

  // Render Quiz Results View Screen
  function renderQuizResultsView(attempt) {
    const subtext = [attempt.userRole, attempt.userCompany].filter(val => val && val !== 'Not Set').join(' • ');

    return `
      <div class="quiz-results-view" style="max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Results Card Header -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%); color: #FFF; padding: 35px; border-radius: 24px; text-align: center; margin-bottom: 30px; box-shadow: 0 15px 35px rgba(10,37,64,0.3);">
          <h2 style="font-family: 'Outfit', sans-serif; color: #FFF; font-size: 2rem; margin: 0 0 8px 0;">${attempt.weekTitle}</h2>
          <div style="font-size: 1.25rem; font-weight: 800; color: #FFF; margin: 6px 0 3px 0;">${attempt.userName}</div>
          <div style="font-size: 0.88rem; color: #94A3B8; margin-bottom: 24px; font-weight: 500;">
            ${subtext || 'Logistics Candidate'}
          </div>

          <!-- Big Score Circle -->
          <div style="background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 25px; max-width: 320px; margin: 0 auto 25px auto;">
            <span style="font-size: 0.85rem; color: #CBD5E1; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Your Final Score</span>
            <div style="font-size: 3.8rem; font-weight: 900; color: #FF5A1F; font-family: 'Outfit', sans-serif; margin: 5px 0;">${attempt.percentage}%</div>
            <span style="font-size: 1.05rem; font-weight: 800; color: #FFF; background: rgba(255,255,255,0.12); padding: 6px 16px; border-radius: 30px; display: inline-block;">
              ${attempt.grade}
            </span>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; font-size: 0.9rem; color: #CBD5E1; margin-bottom: 25px;">
            <span>MCQ Score: <strong>${attempt.mcqScore}/10</strong></span>
            <span>•</span>
            <span>Short Answer Score: <strong>${attempt.shortScore}/10</strong></span>
          </div>

          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button id="btn-generate-pdf-cert" class="btn btn-primary" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1rem; box-shadow: 0 10px 25px rgba(255,90,31,0.4);">
              📜 Generate Certificate (PDF)
            </button>
            <button id="btn-results-to-dashboard" class="btn btn-secondary" style="padding: 16px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; border: 1.5px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #FFF;">
              ← Back
            </button>
          </div>
        </div>

        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.3rem; margin: 0 0 20px 0;">
          💡 Question Explanations & Detailed Evaluation
        </h3>

        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px;">
          ${attempt.detailedResults.map((r, idx) => {
            const week = (typeof NEXUS_QUIZ_DATABASE !== 'undefined' && NEXUS_QUIZ_DATABASE.weeks)
              ? (NEXUS_QUIZ_DATABASE.weeks.find(w => w.id === attempt.weekId) || NEXUS_QUIZ_DATABASE.weeks[0])
              : null;
            const q = week ? week.questions.find(item => item.id === r.questionId || item.question === r.question) : null;
            
            let displayCorrect = r.correctAnswer;
            let displayIsCorrect = r.isCorrect;

            if (q && q.type === 'mcq') {
              const correctIdx = (typeof q.answerIndex !== 'undefined') ? q.answerIndex : q.correctAnswer;
              const trueCorrectText = q.options[correctIdx];
              if (!displayCorrect || displayCorrect === 'undefined') displayCorrect = trueCorrectText;
              if (r.userAnswer === trueCorrectText || (typeof r.userChoiceIdx !== 'undefined' && r.userChoiceIdx === correctIdx)) {
                displayIsCorrect = true;
              }
            } else if (q && q.type === 'short') {
              const validKeywords = q.keywords || q.acceptedKeywords || [];
              const modelAns = q.modelAnswer || q.correctAnswer || (validKeywords.length > 0 ? validKeywords.join(' / ') : '');
              if (!displayCorrect || displayCorrect === 'undefined') displayCorrect = modelAns;
              if (validKeywords.length > 0 && validKeywords.some(kw => (r.userAnswer || '').toLowerCase().includes(kw.toLowerCase()))) {
                displayIsCorrect = true;
              }
            }

            return `
              <div style="background: var(--bg-white); border: 1.5px solid ${displayIsCorrect ? '#10B981' : '#EF4444'}; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-navy);">Question ${idx + 1}</span>
                  <span style="background: ${displayIsCorrect ? '#D1FAE5' : '#FEE2E2'}; color: ${displayIsCorrect ? '#065F46' : '#991B1B'}; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px;">
                    ${displayIsCorrect ? '✅ Correct (+1 Mark)' : '❌ Incorrect (0 Marks)'}
                  </span>
                </div>
                <h4 style="font-size: 0.98rem; color: var(--primary-navy); margin: 0 0 10px 0; font-weight: 700;">${r.question}</h4>
                <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">
                  Your Answer: <strong style="color: ${displayIsCorrect ? '#059669' : '#DC2626'};">${r.userAnswer}</strong>
                </div>
                ${!displayIsCorrect ? `<div style="font-size: 0.88rem; color: var(--primary-navy); margin-bottom: 8px;">Correct Answer: <strong>${displayCorrect}</strong></div>` : ''}
                <div style="background: #F8FAFC; border-left: 3px solid var(--accent-orange); padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #475569; margin-top: 8px;">
                  💡 <strong>Explanation:</strong> ${r.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Bind Results View Events
  function bindResultsViewEvents() {
    const backBtn = document.getElementById('btn-results-to-dashboard');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        currentViewingAttempt = null;
        renderQuizHubUI();
      });
    }

    const certBtn = document.getElementById('btn-generate-pdf-cert');
    if (certBtn) {
      certBtn.addEventListener('click', function () {
        if (currentViewingAttempt) {
          downloadPDFResultSheet(currentViewingAttempt);
        }
      });
    }
  }

  // Download PDF Result Sheet / Certificate
  function downloadPDFResultSheet(attempt) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("⚠️ Pop-up blocked! Please allow pop-ups to print/download your Statement of Result.");
      return;
    }

    const certHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nexus Certificate - ${attempt.userName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; background: #FFF; color: #0A2540; }
          .cert-border { border: 12px double #0A2540; padding: 40px; text-align: center; position: relative; }
          .cert-header { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 900; color: #0A2540; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
          .cert-subtitle { font-size: 1rem; color: #FF5A1F; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px; }
          .cert-name { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; color: #FF5A1F; border-bottom: 2px solid #E2E8F0; display: inline-block; padding-bottom: 5px; margin: 20px 0; }
          .cert-body { font-size: 1.1rem; line-height: 1.8; color: #475569; max-width: 700px; margin: 0 auto 30px auto; }
          .cert-score { font-size: 1.8rem; font-weight: 900; color: #10B981; margin: 15px 0; }
          .cert-footer { display: flex; justify-content: space-between; margin-top: 50px; font-size: 0.85rem; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 20px; }
          @media print { body { padding: 0; } .cert-border { border: 8px double #0A2540; } }
        </style>
      </head>
      <body>
        <div class="cert-border">
          <div style="font-size: 3rem; margin-bottom: 10px;">🎓</div>
          <div class="cert-header">Nexus Knowledge Hub</div>
          <div class="cert-subtitle">Certificate of Competency & Performance Statement</div>
          
          <p style="font-size: 1rem; color: #64748B; margin-bottom: 0;">This official statement certifies that</p>
          <div class="cert-name">${attempt.userName}</div>
          
          <div class="cert-body">
            has successfully completed the weekly professional competency challenge on<br>
            <strong style="color: #0A2540;">${attempt.weekTitle}</strong><br>
            demonstrating domain knowledge across international logistics, supply chain operations, and compliance standards.
          </div>

          <div class="cert-score">
            Achieved Score: ${attempt.percentage}% (${attempt.grade})
          </div>

          <div class="cert-footer">
            <div>
              <strong>Verification ID:</strong> ${attempt.attemptId}<br>
              <strong>Date Issued:</strong> ${new Date(attempt.timestamp).toLocaleDateString()}
            </div>
            <div style="text-align: right;">
              <strong>Nexus Certification Authority</strong><br>
              Global Supply Chain Excellence Portal
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(certHtml);
    printWindow.document.close();
  }

  // Event Listeners on DOM Loaded
  document.addEventListener('DOMContentLoaded', function () {
    initQuizHub();
  });

  window.NEXUS_QUIZ_ENGINE = {
    init: initQuizHub,
    refresh: function() {
      fetchedRemoteAttempts = false;
      renderQuizHubUI();
    }
  };

})();
