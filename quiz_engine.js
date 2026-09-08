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
    userAttempts = deduplicateUserAttempts(regradePreviousZeroAttempts(userAttempts));

    // 2. Fetch remote attempts from Firestore if logged in (Backend is primary source)
    if (currentUser && window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.fetchQuizAttempts === 'function') {
      if (!fetchedRemoteAttempts) {
        fetchedRemoteAttempts = true;
        try {
          const remoteAttempts = await window.NEXUS_FIREBASE.fetchQuizAttempts(currentUser.uid);
          if (remoteAttempts && remoteAttempts.length > 0) {
            userAttempts = deduplicateUserAttempts(regradePreviousZeroAttempts(remoteAttempts));
            // Update localStorage cache with backend data
            try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts)); } catch(e) {}
          } else {
            // Backend has no data — try localStorage cache as fallback for offline scenarios
            try {
              const cached = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
              if (cached.length > 0) {
                userAttempts = deduplicateUserAttempts(regradePreviousZeroAttempts(cached));
              }
            } catch(e) {}
          }
        } catch(err) {
          console.error("Error fetching user attempts from backend:", err);
          // Fallback to localStorage cache on network error
          try {
            const cached = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
            if (cached.length > 0) userAttempts = deduplicateUserAttempts(cached);
          } catch(e) {}
        }

        // Asynchronously auto-regrade all stored quiz attempts across all users in Cloud DB
        setTimeout(() => {
          if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.fetchQuizAttempts === 'function') {
            window.NEXUS_FIREBASE.fetchQuizAttempts(null).then(allAttempts => {
              if (allAttempts && Array.isArray(allAttempts) && allAttempts.length > 0) {
                regradePreviousZeroAttempts(allAttempts);
              }
            }).catch(e => {});
          }
        }, 1500);
      }
    } else if (!currentUser) {
      userAttempts = [];
    }

    userAttempts = deduplicateUserAttempts(userAttempts);

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

  // ----------------------------------------------------
  // SMART & FLEXIBLE SHORT-ANSWER EVALUATION
  // ----------------------------------------------------
  function evaluateShortAnswer(userAnswer, q) {
    if (!userAnswer || typeof userAnswer !== 'string') return false;
    const rawText = userAnswer.trim();
    if (!rawText || rawText === 'No Answer') return false;

    const userLower = rawText.toLowerCase();

    // Strip common noise prefixes (case-insensitive)
    const cleanedUser = userLower
      .replace(/^(the|a|an|it is|its|answer is|this is)\s+/i, '')
      .trim();

    const normUser = cleanedUser.replace(/[-_.,/()]/g, ' ').replace(/\s+/g, ' ').trim();
    const alphaUser = cleanedUser.replace(/[^a-z0-9]/g, '');

    const validKeywords = q.keywords || q.acceptedKeywords || [];
    const modelAns = q.modelAnswer || q.correctAnswer || '';

    // Collect all comparison targets
    const targets = [...validKeywords];
    if (modelAns) targets.push(modelAns);

    // Extract text inside parentheses e.g. "VMI (Vendor Managed Inventory)" -> "VMI", "Vendor Managed Inventory"
    const parenMatches = modelAns.match(/\(([^)]+)\)/g);
    if (parenMatches) {
      parenMatches.forEach(m => {
        const inner = m.replace(/[()]/g, '').trim();
        if (inner) targets.push(inner);
      });
    }
    const cleanModelNoParen = modelAns.replace(/\([^)]+\)/g, '').trim();
    if (cleanModelNoParen) targets.push(cleanModelNoParen);

    // Tier 1: Substring, exact, or normalized match
    for (const target of targets) {
      if (!target) continue;
      const targetLower = target.toLowerCase().trim();
      const normTarget = targetLower.replace(/[-_.,/()]/g, ' ').replace(/\s+/g, ' ').trim();
      const alphaTarget = targetLower.replace(/[^a-z0-9]/g, '');

      if (userLower.includes(targetLower) || normUser.includes(normTarget)) return true;
      if (normTarget.length >= 3 && normUser.includes(normTarget)) return true;
      if (normUser.length >= 4 && normTarget.includes(normUser)) return true;
      if (alphaUser && alphaTarget && (alphaUser === alphaTarget || alphaUser.includes(alphaTarget))) return true;
    }

    // Tier 2: Grammatical & Synonym Equivalences (e.g. managed <-> management <-> managing)
    const flexUser = normUser.replace(/\bmanagement\b/g, 'managed').replace(/\bmanaging\b/g, 'managed');
    for (const target of targets) {
      if (!target) continue;
      const flexTarget = target.toLowerCase().replace(/[-_.,/()]/g, ' ').replace(/\s+/g, ' ').replace(/\bmanagement\b/g, 'managed').replace(/\bmanaging\b/g, 'managed').trim();
      if (flexUser.includes(flexTarget) || flexTarget.includes(flexUser)) return true;
    }

    // Tier 3: Core Concept Token Overlap
    const userWords = normUser.split(' ');
    const hasWord = (w) => userWords.some(uw => uw.startsWith(w));

    if (hasWord('vendor') && (hasWord('manage') || hasWord('manag')) && hasWord('inventor')) return true;
    if (hasWord('warehouse') && (hasWord('manage') || hasWord('manag')) && hasWord('system')) return true;
    if (hasWord('terminal') && (hasWord('handl') || hasWord('charge') || hasWord('fee'))) return true;
    if (hasWord('first') && hasWord('in') && hasWord('out')) return true;
    if (hasWord('just') && hasWord('in') && hasWord('time')) return true;
    if (hasWord('plimsoll') || (hasWord('load') && hasWord('line'))) return true;
    if (hasWord('bullwhip') || hasWord('bull-whip')) return true;
    if (hasWord('reefer') || (hasWord('refrigerat') && hasWord('container'))) return true;
    if (hasWord('pack') && hasWord('list')) return true;
    if (hasWord('certificat') && hasWord('origin')) return true;
    if ((hasWord('letter') && hasWord('credit')) || userLower.includes('l/c') || userLower.includes('lc')) return true;
    if ((hasWord('data') || hasWord('temp')) && (hasWord('logger') || hasWord('record'))) return true;
    if (hasWord('air') && (hasWord('waybill') || hasWord('way-bill') || hasWord('bill'))) return true;
    if (hasWord('asycuda')) return true;
    if (hasWord('transship') || hasWord('tranship')) return true;
    if (hasWord('ispm') && (userLower.includes('15') || hasWord('fifteen'))) return true;

    return false;
  }

  function deduplicateUserAttempts(attempts) {
    if (!attempts || !Array.isArray(attempts)) return [];
    const seen = new Set();
    const result = [];
    attempts.forEach(a => {
      if (!a || !a.weekId) return;
      const uId = a.userId || a.userEmail || 'guest';
      const key = `${uId}_${a.weekId}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(a);
      }
    });
    return result;
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

      if (a.weekId === 'week-5' || (a.detailedResults && a.detailedResults[0] && a.detailedResults[0].isCrossword)) {
        let correctWords = 0;
        let totalWords = 10;

        if (a.detailedResults && Array.isArray(a.detailedResults)) {
          totalWords = a.detailedResults.length || 10;
          correctWords = a.detailedResults.filter(r => r.isCorrect).length;
          // Handle old attempts where 10/10 words gave 50 marks or mcqScore was recorded as 10
          if ((a.percentage === 50 || a.totalScore === 50 || a.mcqScore === 10) && (correctWords === 10 || correctWords === 0)) {
            correctWords = 10;
          }
        } else {
          correctWords = (a.mcqScore && a.mcqScore > 0) ? a.mcqScore : 10;
        }

        const newTotal = Math.min(100, Math.round((correctWords / totalWords) * 100));

        if (a.percentage !== newTotal || a.totalScore !== newTotal || a.mcqScore !== correctWords) {
          a.mcqScore = correctWords;
          a.totalScore = newTotal;
          a.percentage = newTotal;
          if (newTotal >= 90) a.grade = "Distinction / Crossword Freight Master 🏆";
          else if (newTotal >= 75) a.grade = "Merit / Logistics Puzzle Specialist 🥈";
          else if (newTotal >= 50) a.grade = "Pass / Competent Freight Specialist 🥉";
          else a.grade = "Re-attempt Recommended";
          modified = true;

          if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveQuizAttempt === 'function') {
            window.NEXUS_FIREBASE.saveQuizAttempt(a);
          }
        }
        return;
      }

      if (a.detailedResults && Array.isArray(a.detailedResults)) {
        a.detailedResults.forEach(r => {
          if (r.isCrossword || !week.questions) return;
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

            const isCorrect = evaluateShortAnswer(r.userAnswer, q);
            r.isCorrect = isCorrect;
            if (isCorrect) shortScore++;
          }
        });

        const totalScore = mcqScore + shortScore;
        const percentage = Math.round((totalScore / 20) * 100);

        if (a.percentage !== percentage || a.mcqScore !== mcqScore || a.shortScore !== shortScore) {
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
      try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(attempts)); } catch(e) {}
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
    const featuredQuiz = weeks.length > 0 ? weeks[weeks.length - 1] : null;
    if (featuredQuiz && (!activeQuiz || !isAttemptingQuiz)) {
      activeQuiz = featuredQuiz;
    }

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
              ${featuredQuiz ? featuredQuiz.title : 'Weekly Quiz Challenge'}
            </h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin: 0 0 15px 0; line-height: 1.5;">
              ${featuredQuiz ? featuredQuiz.description : 'Test your logistics knowledge with 20 weekly questions.'}
            </p>
            <div style="display: flex; gap: 15px; font-size: 0.82rem; color: var(--primary-navy); font-weight: 700;">
              <span>📝 20 Assessment Questions</span>
              <span>•</span>
              <span>⏱️ Rotates Every Monday</span>
            </div>
          </div>

          <div>
            ${(function(){
              if (!featuredQuiz) return '';
              const actAtt = myAttempts.find(a => a.weekId === featuredQuiz.id);
              if (actAtt) {
                return `
                  <button class="btn btn-secondary btn-view-results" data-attempt-id="${actAtt.attemptId}" data-week-id="${featuredQuiz.id}" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.05rem; border: 2px solid #10B981; color: #065F46; background: #ECFDF5; white-space: nowrap; cursor: pointer;">
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
            const isSpecial = w.quizType === 'crossword' || (w.title && w.title.includes('Special Edition'));

            const cardStyle = isSpecial 
              ? `background: linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%); border: 2px solid #F26938; padding: 24px; border-radius: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(242, 105, 56, 0.18); position: relative; overflow: hidden;`
              : `background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 24px; border-radius: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.03);`;

            const badgeHtml = isSpecial
              ? `<span style="background: linear-gradient(135deg, #F26938 0%, #E11D48 100%); color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 6px; box-shadow: 0 2px 8px rgba(242,105,56,0.35);">🔥 SPECIAL EDITION #${originalSetNum}</span>`
              : `<span style="background: #EFF6FF; color: #1E40AF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">SET #${originalSetNum}</span>`;

            let titleHtml = `<h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.15rem; line-height: 1.4; font-weight: 800;">${w.title}</h4>`;
            if (isSpecial && w.title.includes(' — ')) {
              const parts = w.title.split(' — ');
              titleHtml = `
                <h4 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 8px 0; font-size: 1.15rem; line-height: 1.4; font-weight: 800;">
                  <span>${parts[0]}</span>
                  <span style="display: block; margin-top: 6px; background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); color: #F26938; border: 1.5px solid rgba(242, 105, 56, 0.4); padding: 6px 12px; border-radius: 10px; font-size: 0.95rem; font-weight: 900; box-shadow: 0 4px 12px rgba(242, 105, 56, 0.15);">
                    🧩 ${parts[1]}
                  </span>
                </h4>
              `;
            }

            const btnHtml = attempt
              ? `<button class="btn btn-secondary btn-view-results" data-attempt-id="${attempt.attemptId}" data-week-id="${w.id}" style="width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; border: 1.5px solid #10B981; color: #065F46; background: #ECFDF5; cursor: pointer;">
                  📊 View Score & Certificate
                 </button>`
              : (isSpecial 
                  ? `<button class="btn btn-primary btn-select-quiz" data-week-id="${w.id}" style="width: 100%; padding: 13px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; background: linear-gradient(135deg, #F26938 0%, #E11D48 100%); border: none; color: #FFF; box-shadow: 0 6px 20px rgba(242, 105, 56, 0.4); cursor: pointer;">
                      🧩 Attempt Special Crossword
                    </button>`
                  : `<button class="btn btn-primary btn-select-quiz" data-week-id="${w.id}" style="width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem;">
                      📝 Attempt Quiz
                    </button>`
                );

            return `
              <div style="${cardStyle}">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    ${badgeHtml}
                    ${attempt ? `<span style="background: #F0FDF4; color: #15803D; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">Completed: ${attempt.percentage}%</span>` : `<span style="background: #FFFBEB; color: #B45309; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">Available</span>`}
                  </div>
                  ${titleHtml}
                  <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0 0 20px 0; line-height: 1.5;">${w.description}</p>
                </div>

                ${btnHtml}
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
                      <button class="btn-view-results" data-attempt-id="${a.attemptId}" data-week-id="${a.weekId}" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 800; border: 1.5px solid var(--primary-navy); color: var(--primary-navy); background: #F8FAFC; cursor: pointer; transition: all 0.2s ease;">
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
        const weeks = (window.NEXUS_QUIZ_DATABASE && window.NEXUS_QUIZ_DATABASE.weeks) ? window.NEXUS_QUIZ_DATABASE.weeks : [];
        if (weeks.length > 0) {
          activeQuiz = weeks[weeks.length - 1];
        }
        const currentUser = getCurrentAuthUser();
        const existing = activeQuiz ? userAttempts.find(a => a.weekId === activeQuiz.id && currentUser && (a.userId === currentUser.uid || a.userEmail === currentUser.email)) : null;
        if (existing) {
          currentViewingAttempt = existing;
          isAttemptingQuiz = false;
          renderQuizHubUI();
          return;
        }
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
          const currentUser = getCurrentAuthUser();
          const existing = userAttempts.find(a => a.weekId === weekId && currentUser && (a.userId === currentUser.uid || a.userEmail === currentUser.email));
          if (existing) {
            currentViewingAttempt = existing;
            isAttemptingQuiz = false;
            renderQuizHubUI();
            return;
          }
          activeQuiz = selected;
          isAttemptingQuiz = true;
          currentViewingAttempt = null;
          renderQuizHubUI();
        }
      });
    });

    const viewBtns = document.querySelectorAll('.btn-view-results');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const attId = btn.getAttribute('data-attempt-id');
        const weekId = btn.getAttribute('data-week-id');
        const currentUser = getCurrentAuthUser();

        let att = userAttempts.find(a => (attId && (a.attemptId === attId || a.id === attId)));
        if (!att && weekId) {
          att = userAttempts.find(a => a.weekId === weekId && currentUser && (a.userId === currentUser.uid || a.userEmail === currentUser.email));
        }
        if (!att && weekId) {
          att = userAttempts.find(a => a.weekId === weekId);
        }

        if (att) {
          currentViewingAttempt = att;
          isAttemptingQuiz = false;
          renderQuizHubUI();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          console.warn("Attempt record not found for:", attId, weekId);
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
    if (!activeQuiz && window.NEXUS_QUIZ_DATABASE && window.NEXUS_QUIZ_DATABASE.weeks && window.NEXUS_QUIZ_DATABASE.weeks.length > 0) {
      activeQuiz = window.NEXUS_QUIZ_DATABASE.weeks[window.NEXUS_QUIZ_DATABASE.weeks.length - 1];
    }
    
    // Prevent re-attempting if quiz already completed
    const currentUser = getCurrentAuthUser();
    if (activeQuiz && currentUser) {
      const existing = userAttempts.find(a => a.weekId === activeQuiz.id && (a.userId === currentUser.uid || a.userEmail === currentUser.email));
      if (existing) {
        isAttemptingQuiz = false;
        currentViewingAttempt = existing;
        setTimeout(() => renderQuizHubUI(), 0);
        return renderQuizResultsView(existing);
      }
    }

    if (activeQuiz && activeQuiz.quizType === 'crossword') {
      return renderCrosswordQuizForm(activeQuiz);
    }

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

  // Render Crossword Quiz Form HTML
  function renderCrosswordQuizForm(quiz) {
    const data = quiz.crosswordData;
    const rows = data.gridRows;
    const cols = data.gridCols;
    const words = data.words;

    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

    words.forEach(w => {
      const isAcross = w.direction === 'across';
      const len = w.word.length;
      for (let i = 0; i < len; i++) {
        const r = isAcross ? w.row : w.row + i;
        const c = isAcross ? w.col + i : w.col;
        if (!grid[r][c]) {
          grid[r][c] = { letter: w.word[i], number: null, words: [] };
        }
        grid[r][c].words.push(w.id);
        if (i === 0) {
          grid[r][c].number = w.number;
        }
      }
    });

    const acrossWords = words.filter(w => w.direction === 'across');
    const downWords = words.filter(w => w.direction === 'down');
    const firstWord = words[0];

    return `
      <div class="crossword-container">
        
        <!-- Navigation Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-white); padding: 15px 25px; border-radius: 16px; border: 1.5px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <button id="btn-back-to-dashboard" style="padding: 10px 22px; border-radius: 30px; font-weight: 800; font-size: 0.88rem; border: 1.5px solid var(--primary-navy); color: var(--primary-navy); background: #F8FAFC; cursor: pointer; transition: all 0.2s ease;">
            ← Back
          </button>
          <span style="font-size: 0.95rem; font-weight: 800; color: var(--primary-navy); font-family: 'Outfit', sans-serif;">
            ${quiz.title}
          </span>
        </div>

        <!-- Special Edition Banner -->
        <div class="crossword-header-banner">
          <div class="cw-banner-info">
            <h2>
              <span>🧩 ${quiz.title}</span>
              <span class="cw-badge-special">Special Edition 01</span>
            </h2>
            <p>Fill in the ${words.length}-word logistics crossword puzzle using clues and hints! Click any clue to highlight its cells.</p>
          </div>
          <div class="cw-stats-pills">
            <div class="cw-stat-pill">📝 ${words.length} Words Total</div>
            <div class="cw-stat-pill">⭐ 100 Marks (${Math.round(100 / words.length)}/word)</div>
            <div class="cw-stat-pill">💡 Clue Hints Available</div>
          </div>
        </div>

        <!-- Active Clue Bar -->
        <div class="crossword-active-clue-bar" id="cw-active-clue-bar">
          <div class="cw-active-clue-text">
            <span class="cw-clue-tag" id="cw-bar-tag">${firstWord.number} ${firstWord.direction.toUpperCase()} (${firstWord.word.length} Letters)</span>
            <span class="cw-clue-main-desc" id="cw-bar-desc">${firstWord.clue}</span>
            <div class="cw-hint-text" id="cw-bar-hint">💡 Hint: ${firstWord.hint}</div>
          </div>
          <button type="button" class="cw-hint-toggle-btn" id="btn-toggle-hint" data-word-id="${firstWord.id}">
            💡 Reveal Hint
          </button>
        </div>

        <form id="crossword-attempt-form">
          <!-- Main Grid + Clues Layout -->
          <div class="crossword-main-layout">
            
            <!-- Left: Interactive Grid -->
            <div class="crossword-grid-wrapper">
              <div class="crossword-grid" style="grid-template-columns: repeat(${cols}, var(--cw-cell-size, 19.5px)); grid-template-rows: repeat(${rows}, var(--cw-cell-size, 19.5px));">
                ${grid.map((rowArr, rIdx) => {
                  return rowArr.map((cell, cIdx) => {
                    if (!cell) {
                      return `<div class="cw-cell black"></div>`;
                    }
                    const wordIdsStr = cell.words.join(' ');
                    const numHtml = cell.number ? `<span class="cw-num">${cell.number}</span>` : '';
                    return `
                      <div class="cw-cell" data-row="${rIdx}" data-col="${cIdx}" data-words="${wordIdsStr}" id="cw-cell-${rIdx}-${cIdx}">
                        ${numHtml}
                        <input type="text" class="cw-input" maxlength="1" data-row="${rIdx}" data-col="${cIdx}" id="cw-inp-${rIdx}-${cIdx}" autocomplete="off" spellcheck="false">
                      </div>
                    `;
                  }).join('');
                }).join('')}
              </div>
            </div>

            <!-- Right: Clues Split -->
            <div class="crossword-clues-wrapper">
              <div class="cw-clues-columns">
                
                <!-- Across Clues Column -->
                <div class="cw-clue-column">
                  <h3>➡️ ACROSS</h3>
                  <div class="cw-clue-list">
                    ${acrossWords.map(w => `
                      <div class="cw-clue-item ${w.id === firstWord.id ? 'active' : ''}" data-word-id="${w.id}" id="clue-item-${w.id}">
                        <div class="cw-clue-header">
                          <span class="cw-clue-num-title">${w.number}. ${w.clue.substring(0, 32)}...</span>
                          <span class="cw-word-len">(${w.word.length})</span>
                        </div>
                        <div class="cw-clue-body">${w.clue}</div>
                        <div class="cw-hint-text" id="hint-${w.id}">💡 Hint: ${w.hint}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Down Clues Column -->
                <div class="cw-clue-column">
                  <h3>⬇️ DOWN</h3>
                  <div class="cw-clue-list">
                    ${downWords.map(w => `
                      <div class="cw-clue-item ${w.id === firstWord.id ? 'active' : ''}" data-word-id="${w.id}" id="clue-item-${w.id}">
                        <div class="cw-clue-header">
                          <span class="cw-clue-num-title">${w.number}. ${w.clue.substring(0, 32)}...</span>
                          <span class="cw-word-len">(${w.word.length})</span>
                        </div>
                        <div class="cw-clue-body">${w.clue}</div>
                        <div class="cw-hint-text" id="hint-${w.id}">💡 Hint: ${w.hint}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- Submit Button -->
          <div style="text-align: center; margin: 35px 0 20px 0;">
            <button type="submit" class="btn btn-primary" style="padding: 18px 50px; border-radius: 50px; font-weight: 900; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(255,90,31,0.35);">
              ✅ Submit Crossword Puzzle
            </button>
          </div>

        </form>

      </div>
    `;
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

    if (activeQuiz && activeQuiz.quizType === 'crossword') {
      bindCrosswordEvents(activeQuiz);
      return;
    }

    const form = document.getElementById('quiz-attempt-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        gradeAssessment(form);
      });
    }
  }

  // Bind Interactive Crossword Puzzle Events
  function bindCrosswordEvents(quiz) {
    const words = quiz.crosswordData.words;
    let selectedWordId = words[0].id;
    let currentDir = words[0].direction;

    function selectWord(wordId, focusRow, focusCol) {
      const wordObj = words.find(w => w.id === wordId);
      if (!wordObj) return;

      selectedWordId = wordId;
      currentDir = wordObj.direction;

      // Highlight active clue in clue list
      document.querySelectorAll('.cw-clue-item').forEach(el => el.classList.remove('active'));
      const activeClueEl = document.getElementById(`clue-item-${wordId}`);
      if (activeClueEl) {
        activeClueEl.classList.add('active');
        activeClueEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Highlight active word cells in grid
      document.querySelectorAll('.cw-cell').forEach(el => {
        el.classList.remove('active-word');
        el.classList.remove('active-cell');
      });

      const isAcross = wordObj.direction === 'across';
      for (let i = 0; i < wordObj.word.length; i++) {
        const r = isAcross ? wordObj.row : wordObj.row + i;
        const c = isAcross ? wordObj.col + i : wordObj.col;
        const cellEl = document.getElementById(`cw-cell-${r}-${c}`);
        if (cellEl) cellEl.classList.add('active-word');
      }

      // Focus cell
      const targetRow = typeof focusRow === 'number' ? focusRow : wordObj.row;
      const targetCol = typeof focusCol === 'number' ? focusCol : wordObj.col;
      const targetCellEl = document.getElementById(`cw-cell-${targetRow}-${targetCol}`);
      const targetInpEl = document.getElementById(`cw-inp-${targetRow}-${targetCol}`);
      if (targetCellEl) targetCellEl.classList.add('active-cell');
      if (targetInpEl) targetInpEl.focus();

      // Update active clue bar
      const barTag = document.getElementById('cw-bar-tag');
      const barDesc = document.getElementById('cw-bar-desc');
      const barHint = document.getElementById('cw-bar-hint');
      const hintBtn = document.getElementById('btn-toggle-hint');

      if (barTag) barTag.textContent = `${wordObj.number} ${wordObj.direction.toUpperCase()} (${wordObj.word.length} Letters)`;
      if (barDesc) barDesc.textContent = wordObj.clue;
      if (barHint) {
        barHint.textContent = `💡 Hint: ${wordObj.hint}`;
        const hintTextEl = document.getElementById(`hint-${wordId}`);
        if (hintTextEl && hintTextEl.classList.contains('visible')) {
          barHint.classList.add('visible');
        } else {
          barHint.classList.remove('visible');
        }
      }
      if (hintBtn) hintBtn.setAttribute('data-word-id', wordId);
    }

    // Select initial word
    selectWord(selectedWordId);

    // Clue item clicks
    document.querySelectorAll('.cw-clue-item').forEach(item => {
      item.addEventListener('click', function () {
        const wId = item.getAttribute('data-word-id');
        selectWord(wId);
      });
    });

    // Hint toggle button click
    const hintBtn = document.getElementById('btn-toggle-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', function () {
        const wId = hintBtn.getAttribute('data-word-id') || selectedWordId;
        const hintEl = document.getElementById(`hint-${wId}`);
        const barHintEl = document.getElementById('cw-bar-hint');
        if (hintEl) {
          hintEl.classList.toggle('visible');
          if (barHintEl) barHintEl.classList.toggle('visible', hintEl.classList.contains('visible'));
        }
      });
    }

    // Grid cell clicks & input handlers
    document.querySelectorAll('.cw-input').forEach(inp => {
      inp.addEventListener('click', function () {
        const r = parseInt(inp.getAttribute('data-row'));
        const c = parseInt(inp.getAttribute('data-col'));
        const cellEl = document.getElementById(`cw-cell-${r}-${c}`);
        const wordIds = cellEl ? (cellEl.getAttribute('data-words') || '').split(' ') : [];

        // If clicked on an already selected cell, toggle direction if cell is an intersection
        if (wordIds.length > 1) {
          const currentWordObj = words.find(w => w.id === selectedWordId);
          const otherWordId = wordIds.find(id => id !== selectedWordId);
          if (otherWordId && currentWordObj && (currentWordObj.row === r && currentWordObj.col === c)) {
            selectWord(otherWordId, r, c);
            return;
          }
        }

        const matchWordId = wordIds.find(id => {
          const w = words.find(item => item.id === id);
          return w && w.direction === currentDir;
        }) || wordIds[0];

        if (matchWordId) selectWord(matchWordId, r, c);
      });

      inp.addEventListener('input', function (e) {
        inp.value = inp.value.toUpperCase();
        if (inp.value) {
          // Advance to next letter in current word
          const r = parseInt(inp.getAttribute('data-row'));
          const c = parseInt(inp.getAttribute('data-col'));
          const wordObj = words.find(w => w.id === selectedWordId);
          if (wordObj) {
            const isAcross = wordObj.direction === 'across';
            const nextR = isAcross ? r : r + 1;
            const nextC = isAcross ? c + 1 : c;
            const nextInp = document.getElementById(`cw-inp-${nextR}-${nextC}`);
            if (nextInp) {
              selectWord(selectedWordId, nextR, nextC);
            }
          }
        }
      });

      inp.addEventListener('keydown', function (e) {
        const r = parseInt(inp.getAttribute('data-row'));
        const c = parseInt(inp.getAttribute('data-col'));
        const wordObj = words.find(w => w.id === selectedWordId);

        if (e.key === 'Backspace') {
          if (!inp.value && wordObj) {
            const isAcross = wordObj.direction === 'across';
            const prevR = isAcross ? r : r - 1;
            const prevC = isAcross ? c - 1 : c;
            const prevInp = document.getElementById(`cw-inp-${prevR}-${prevC}`);
            if (prevInp) {
              prevInp.value = '';
              selectWord(selectedWordId, prevR, prevC);
            }
          }
        } else if (e.key === 'ArrowRight') {
          const nextInp = document.getElementById(`cw-inp-${r}-${c + 1}`);
          if (nextInp) nextInp.focus();
        } else if (e.key === 'ArrowLeft') {
          const prevInp = document.getElementById(`cw-inp-${r}-${c - 1}`);
          if (prevInp) prevInp.focus();
        } else if (e.key === 'ArrowDown') {
          const nextInp = document.getElementById(`cw-inp-${r + 1}-${c}`);
          if (nextInp) nextInp.focus();
        } else if (e.key === 'ArrowUp') {
          const prevInp = document.getElementById(`cw-inp-${r - 1}-${c}`);
          if (prevInp) prevInp.focus();
        }
      });
    });

    // Form submit
    const cwForm = document.getElementById('crossword-attempt-form');
    if (cwForm) {
      cwForm.addEventListener('submit', function (e) {
        e.preventDefault();
        gradeCrosswordAssessment(quiz);
      });
    }
  }

  let isSubmittingCrossword = false;

  // Grade Crossword Assessment
  async function gradeCrosswordAssessment(quiz) {
    if (isSubmittingCrossword) return;
    isSubmittingCrossword = true;

    const submitBtn = document.querySelector('#crossword-attempt-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "⏳ Submitting & Grading...";
    }

    const currentUser = getCurrentAuthUser();
    const candidateUid = currentUser ? currentUser.uid : "usr_guest";
    const candidateEmail = currentUser ? currentUser.email : "candidate@nexus.com";

    // Prevent duplicate submission if already exists
    const existing = userAttempts.find(a => a.weekId === quiz.id && (a.userId === candidateUid || a.userEmail === candidateEmail));
    if (existing) {
      isSubmittingCrossword = false;
      isAttemptingQuiz = false;
      currentViewingAttempt = existing;
      renderQuizHubUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const words = quiz.crosswordData.words;
    let correctCount = 0;
    const detailedResults = [];

    words.forEach(w => {
      const isAcross = w.direction === 'across';
      let userWord = '';
      for (let i = 0; i < w.word.length; i++) {
        const r = isAcross ? w.row : w.row + i;
        const c = isAcross ? w.col + i : w.col;
        const inp = document.getElementById(`cw-inp-${r}-${c}`);
        userWord += inp ? (inp.value.trim().toUpperCase() || '_') : '_';
      }

      const isCorrect = (userWord === w.word);
      if (isCorrect) correctCount++;

      detailedResults.push({
        isCrossword: true,
        wordId: w.id,
        label: `${w.number} ${w.direction.toUpperCase()}`,
        question: `Clue (${w.number} ${w.direction.toUpperCase()} • ${w.word.length} letters): ${w.clue}`,
        userAnswer: userWord.replace(/_/g, ' '),
        correctAnswer: w.word,
        isCorrect: isCorrect,
        explanation: `${w.clue} (Hint: ${w.hint})`
      });
    });

    const totalWords = words.length;
    const marksPerWord = 100 / totalWords;
    const totalScore = Math.round(correctCount * marksPerWord);
    const percentage = totalScore;

    let grade = "Re-attempt Recommended";
    if (percentage >= 90) grade = "Distinction / Crossword Freight Master 🏆";
    else if (percentage >= 75) grade = "Merit / Logistics Puzzle Specialist 🥈";
    else if (percentage >= 50) grade = "Pass / Competent Freight Specialist 🥉";

    const profile = window.currentUserProfileData || {};
    const candidateName = profile.name || (currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Logistics Candidate");
    const candidateRole = (profile.role && profile.role !== 'Not Set') ? profile.role : '';
    const candidateCompany = (profile.company && profile.company !== 'Not Set') ? profile.company : '';

    const attemptRecord = {
      attemptId: 'att_' + Date.now(),
      userId: candidateUid,
      userName: candidateName,
      userEmail: candidateEmail,
      userCompany: candidateCompany || 'Not Set',
      userRole: candidateRole || 'Not Set',
      weekId: quiz.id,
      weekTitle: quiz.title,
      mcqScore: correctCount,
      shortScore: 0,
      totalScore: totalScore,
      percentage: percentage,
      grade: grade,
      timestamp: new Date().toISOString(),
      detailedResults: detailedResults
    };

    userAttempts.unshift(attemptRecord);
    userAttempts = deduplicateUserAttempts(userAttempts);

    try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts)); } catch(e) {}

    isSubmittingCrossword = false;
    isAttemptingQuiz = false;
    currentViewingAttempt = attemptRecord;
    renderQuizHubUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.saveQuizAttempt === 'function') {
      window.NEXUS_FIREBASE.saveQuizAttempt(attemptRecord).then(saved => {
        console.log('☁️ Crossword attempt saved to cloud:', saved);
      }).catch(err => {
        console.error('❌ Cloud crossword save warning:', err);
      });
    }
  }

  let isSubmittingQuiz = false;

  // Grade Assessment Logic
  async function gradeAssessment(form) {
    if (isSubmittingQuiz) return;
    isSubmittingQuiz = true;

    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "⏳ Submitting & Grading...";
    }

    const currentUser = getCurrentAuthUser();
    const candidateUid = currentUser ? currentUser.uid : "usr_guest";
    const candidateEmail = currentUser ? currentUser.email : "candidate@nexus.com";

    const existing = activeQuiz ? userAttempts.find(a => a.weekId === activeQuiz.id && (a.userId === candidateUid || a.userEmail === candidateEmail)) : null;
    if (existing) {
      isSubmittingQuiz = false;
      isAttemptingQuiz = false;
      currentViewingAttempt = existing;
      renderQuizHubUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
        const userText = inputField ? inputField.value.trim() : '';
        
        const validKeywords = q.keywords || q.acceptedKeywords || [];
        const modelAns = q.modelAnswer || q.correctAnswer || (validKeywords.length > 0 ? validKeywords.join(' / ') : '');

        const isCorrect = evaluateShortAnswer(userText, q);
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

    const profile = window.currentUserProfileData || {};
    const candidateName = profile.name || (currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Logistics Candidate");
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
    userAttempts = deduplicateUserAttempts(userAttempts);

    // 1. Cache to localStorage immediately for instant data safety
    try { localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts)); } catch(e) {}

    // 2. Transition UI to Results & Certificate view INSTANTLY (<20ms)
    isSubmittingQuiz = false;
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
    if (!attempt) return `<div style="padding: 40px; text-align: center; font-size: 1.1rem; color: var(--text-muted);">No attempt results available.</div>`;

    const subtext = [attempt.userRole, attempt.userCompany].filter(val => val && val !== 'Not Set').join(' • ');
    const results = (attempt.detailedResults && Array.isArray(attempt.detailedResults)) ? attempt.detailedResults : [];
    const isCrossword = (results.length > 0 && results[0].isCrossword) || (attempt.weekTitle && attempt.weekTitle.includes('Crossword'));

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

          ${isCrossword ? `
            <div style="display: flex; gap: 20px; justify-content: center; font-size: 0.9rem; color: #CBD5E1; margin-bottom: 25px;">
              <span>Correct Words: <strong>${attempt.mcqScore}/${results.length || 10}</strong></span>
              <span>•</span>
              <span>Total Marks: <strong>${attempt.totalScore}/100</strong></span>
            </div>
          ` : `
            <div style="display: flex; gap: 20px; justify-content: center; font-size: 0.9rem; color: #CBD5E1; margin-bottom: 25px;">
              <span>MCQ Score: <strong>${attempt.mcqScore}/10</strong></span>
              <span>•</span>
              <span>Short Answer Score: <strong>${attempt.shortScore}/10</strong></span>
            </div>
          `}

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
          💡 Word Explanations & Detailed Evaluation
        </h3>

        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px;">
          ${results.map((r, idx) => {
            if (r.isCrossword) {
              const displayIsCorrect = r.isCorrect;
              const marksPerWord = Math.round(100 / (results.length || 10));
              return `
                <div style="background: var(--bg-white); border: 1.5px solid ${displayIsCorrect ? '#10B981' : '#EF4444'}; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 0.85rem; font-weight: 800; color: var(--primary-navy);">${r.label}</span>
                    <span style="background: ${displayIsCorrect ? '#D1FAE5' : '#FEE2E2'}; color: ${displayIsCorrect ? '#065F46' : '#991B1B'}; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px;">
                      ${displayIsCorrect ? `✅ Correct (+${marksPerWord} Marks)` : '❌ Incorrect (0 Marks)'}
                    </span>
                  </div>
                  <h4 style="font-size: 0.98rem; color: var(--primary-navy); margin: 0 0 10px 0; font-weight: 700;">${r.question}</h4>
                  <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">
                    Your Entry: <strong style="color: ${displayIsCorrect ? '#059669' : '#DC2626'}; font-family: monospace;">${r.userAnswer}</strong>
                  </div>
                  ${!displayIsCorrect ? `<div style="font-size: 0.88rem; color: var(--primary-navy); margin-bottom: 8px;">Correct Word: <strong style="font-family: monospace;">${r.correctAnswer}</strong></div>` : ''}
                  <div style="background: #F8FAFC; border-left: 3px solid var(--accent-orange); padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #475569; margin-top: 8px;">
                    💡 <strong>Clue & Hint:</strong> ${r.explanation}
                  </div>
                </div>
              `;
            }

            const week = (typeof NEXUS_QUIZ_DATABASE !== 'undefined' && NEXUS_QUIZ_DATABASE.weeks)
              ? (NEXUS_QUIZ_DATABASE.weeks.find(w => w.id === attempt.weekId) || NEXUS_QUIZ_DATABASE.weeks[0])
              : null;
            const q = (week && week.questions) ? week.questions.find(item => item.id === r.questionId || item.question === r.question) : null;
            
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
              displayIsCorrect = evaluateShortAnswer(r.userAnswer, q);
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
