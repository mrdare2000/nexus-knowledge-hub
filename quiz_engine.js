// Nexus Quiz Hub - Interactive Engine & Certification Management
// Handles Portal Dashboard, Weekly Auto-Rotation, Quiz Execution, Scoring, Results View, PDF Certificate Generation & Firebase Owner Admin Sync

(function () {
  'use strict';

  // Owner Passcode for Admin Dashboard Access
  const ADMIN_PASSCODE = "nexusowner2026";

  // State Management
  let currentUser = JSON.parse(localStorage.getItem('nexus_quiz_user')) || null;
  let userAttempts = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
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

  // Initialize Quiz Hub
  function initQuizHub() {
    activeWeekIndex = calculateActiveWeekIndex();
    if (window.NEXUS_QUIZ_DATABASE && window.NEXUS_QUIZ_DATABASE.weeks) {
      activeQuiz = window.NEXUS_QUIZ_DATABASE.weeks[activeWeekIndex];
    }
    renderQuizHubUI();
  }

  // Render Core UI Shell
  function renderQuizHubUI() {
    const container = document.getElementById('quiz-hub-container');
    if (!container) return;

    if (!currentUser) {
      container.innerHTML = renderRegistrationPrompt();
      bindRegistrationEvents();
      return;
    }

    if (currentViewingAttempt) {
      container.innerHTML = renderQuizResultsView(currentViewingAttempt);
      bindResultsViewEvents();
    } else if (isAttemptingQuiz) {
      container.innerHTML = renderQuizQuestionsForm();
      bindQuizEvents();
    } else {
      container.innerHTML = renderPortalDashboard();
      bindDashboardEvents();
    }
  }

  // Registration Prompt (Easy KYC)
  function renderRegistrationPrompt() {
    return `
      <div class="quiz-kyc-card card-glass" style="max-width: 600px; margin: 40px auto; padding: 35px; border-radius: 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
        <div style="font-size: 3.5rem; margin-bottom: 15px;">📝</div>
        <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin-bottom: 10px; font-weight: 800;">Welcome to Nexus Quiz Hub</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 25px; line-height: 1.6;">
          Register once to access weekly logistics certification challenges, track your candidate rank, and download verifiable PDF certificates.
        </p>

        <form id="quiz-kyc-form" style="text-align: left; display: flex; flex-direction: column; gap: 15px;">
          <div>
            <label style="font-weight: 700; font-size: 0.85rem; color: var(--primary-navy); display: block; margin-bottom: 5px;">Full Name *</label>
            <input type="text" id="kyc-name" required placeholder="e.g. Darshika Perera" class="quiz-input" style="width: 100%; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem;">
          </div>
          <div>
            <label style="font-weight: 700; font-size: 0.85rem; color: var(--primary-navy); display: block; margin-bottom: 5px;">Email Address *</label>
            <input type="email" id="kyc-email" required placeholder="e.g. darshika@company.com" class="quiz-input" style="width: 100%; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <label style="font-weight: 700; font-size: 0.85rem; color: var(--primary-navy); display: block; margin-bottom: 5px;">Company / University</label>
              <input type="text" id="kyc-company" placeholder="e.g. Nexus Cargos Ltd" class="quiz-input" style="width: 100%; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem;">
            </div>
            <div>
              <label style="font-weight: 700; font-size: 0.85rem; color: var(--primary-navy); display: block; margin-bottom: 5px;">Professional Role</label>
              <select id="kyc-role" class="quiz-input" style="width: 100%; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem; background: var(--bg-white);">
                <option value="Freight Forwarder">Freight Forwarder</option>
                <option value="Exporter / Importer">Exporter / Importer</option>
                <option value="Customs Broker">Customs Broker</option>
                <option value="Logistics Student">Logistics Student / Educator</option>
                <option value="Supply Chain Professional">Supply Chain Professional</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="margin-top: 15px; width: 100%; padding: 14px; border-radius: 50px; font-weight: 700; font-size: 1rem;">
            🚀 Enter Quiz Hub Portal
          </button>
        </form>
      </div>
    `;
  }

  // Bind KYC Form Registration
  function bindRegistrationEvents() {
    const form = document.getElementById('quiz-kyc-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('kyc-name').value.trim();
      const email = document.getElementById('kyc-email').value.trim();
      const company = document.getElementById('kyc-company').value.trim() || 'Independent Professional';
      const role = document.getElementById('kyc-role').value;

      if (!name || !email) return;

      currentUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        company: company,
        role: role,
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('nexus_quiz_user', JSON.stringify(currentUser));
      saveUserToFirebase(currentUser);
      renderQuizHubUI();
    });
  }

  // Render Portal Dashboard
  function renderPortalDashboard() {
    const myAttempts = userAttempts
      .filter(a => a.userId === currentUser.id || a.userEmail === currentUser.email)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const totalAttempts = myAttempts.length;
    const avgScore = totalAttempts > 0 ? Math.round(myAttempts.reduce((acc, cur) => acc + cur.percentage, 0) / totalAttempts) : 0;
    const passedAttempts = myAttempts.filter(a => a.percentage >= 50);
    const bestScore = totalAttempts > 0 ? Math.max(...myAttempts.map(a => a.percentage)) : 0;

    let rankLabel = "New Learner";
    if (bestScore >= 90) rankLabel = "Freight Master 🏆";
    else if (bestScore >= 75) rankLabel = "Advanced Practitioner 🥈";
    else if (bestScore >= 50) rankLabel = "Competent Practitioner 🥉";

    const weeks = window.NEXUS_QUIZ_DATABASE.weeks;

    return `
      <div class="quiz-portal-dashboard" style="max-width: 1050px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Header Banner & Candidate Profile -->
        <div style="background: var(--bg-white); padding: 18px 28px; border-radius: 18px; border: 1.5px solid var(--border-color); margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.04); flex-wrap: wrap; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #FF5A1F 0%, #FF8C00 100%); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.4rem; box-shadow: 0 4px 12px rgba(255,90,31,0.3);">
              ${currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style="margin: 0 0 3px 0; color: var(--primary-navy); font-family: 'Outfit', sans-serif; font-size: 1.15rem;">${currentUser.name}</h3>
              <span style="font-size: 0.85rem; color: var(--text-muted);">${currentUser.company} • ${currentUser.role}</span>
            </div>
          </div>

          <button id="btn-logout" style="background: #FFF; border: 1.5px solid #EF4444; color: #EF4444; padding: 8px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">
            Sign Out
          </button>
        </div>

        <!-- Page Section Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 35px;">
          <h2 style="font-size: 2.2rem; margin-bottom: 8px; font-family: 'Outfit', sans-serif;">
            <span style="color: var(--primary-navy);">Quiz</span> <span style="color: var(--accent-orange);">Hub</span>
          </h2>
          <p style="font-size: 0.98rem; color: var(--text-muted); max-width: 650px; margin: 0 auto; line-height: 1.5;">
            Test your knowledge with weekly logistics challenges, track competency scores, and earn verifiable certificates.
          </p>
        </div>

        <!-- 4 Candidate Stats Metric Cards -->
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

        <!-- Featured Active Weekly Challenge Card -->
        <div style="background: linear-gradient(135deg, #FFF 0%, #FFF7ED 100%); border: 2px solid var(--accent-orange); padding: 30px; border-radius: 20px; margin-bottom: 40px; box-shadow: 0 10px 25px rgba(255,90,31,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div style="flex: 1; min-width: 280px;">
            <span style="background: var(--accent-orange); color: #FFF; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 12px; letter-spacing: 0.5px; display: inline-block; margin-bottom: 10px;">
              🔥 FEATURED WEEKLY CHALLENGE
            </span>
            <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0 0 10px 0; font-size: 1.5rem;">
              ${activeQuiz.title}
            </h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin: 0 0 15px 0; line-height: 1.5;">
              ${activeQuiz.description}
            </p>
            <div style="display: flex; gap: 15px; font-size: 0.82rem; color: var(--primary-navy); font-weight: 700;">
              <span>📝 20 Assessment Questions</span>
              <span>•</span>
              <span>⏱️ Rotates Every Monday</span>
            </div>
          </div>

          <div>
            ${(function(){
              const actAtt = myAttempts.find(a => a.weekId === activeQuiz.id);
              if (actAtt) {
                return `<button class="btn btn-secondary btn-view-results" data-attempt-id="${actAtt.attemptId}" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.05rem; border: 2px solid #10B981; color: #065F46; background: #ECFDF5; white-space: nowrap;">
                  📊 View Score & Certificate
                </button>`;
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
          ${[...weeks].reverse().map((w, idx) => {
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

        <!-- Candidate Quiz History & Downloadable Certificates Table -->
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

        <!-- Footer Admin Shortcut -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px dashed var(--border-color);">
          <button id="btn-owner-admin-footer" style="background: transparent; border: none; color: #94A3B8; font-size: 0.78rem; cursor: pointer; text-decoration: underline;">
            Owner Portal Access (Passcode Protected)
          </button>
        </div>

      </div>
    `;
  }

  // Bind Dashboard Events
  function bindDashboardEvents() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        currentUser = null;
        localStorage.removeItem('nexus_quiz_user');
        renderQuizHubUI();
      });
    }

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

    const adminFooterBtn = document.getElementById('btn-owner-admin-footer');
    if (adminFooterBtn) {
      adminFooterBtn.addEventListener('click', openOwnerAdminModal);
    }
  }

  // Render Quiz Questions Form (NO STICKY TOP BAR)
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
          <!-- SUBMIT BUTTON AT THE VERY BOTTOM OF THE QUIZ -->
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

  // Grade Assessment Logic & Show Results Screen
  function gradeAssessment(form) {
    const formData = new FormData(form);
    let mcqScore = 0;
    let shortScore = 0;
    const detailedResults = [];

    activeQuiz.questions.forEach(q => {
      const val = formData.get('q_' + q.id);
      let isCorrect = false;

      if (q.type === 'mcq') {
        if (parseInt(val, 10) === q.answerIndex) {
          mcqScore++;
          isCorrect = true;
        }
        detailedResults.push({
          questionId: q.id,
          type: 'mcq',
          question: q.question,
          userAnswer: q.options[parseInt(val, 10)] || 'Unanswered',
          correctAnswer: q.options[q.answerIndex],
          isCorrect: isCorrect,
          explanation: q.explanation
        });
      } else {
        const userText = (val || '').trim().toLowerCase();
        isCorrect = q.keywords.some(kw => userText.includes(kw.toLowerCase()));
        if (isCorrect) shortScore++;
        detailedResults.push({
          questionId: q.id,
          type: 'short',
          question: q.question,
          userAnswer: val || 'Unanswered',
          correctAnswer: q.modelAnswer,
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

    const attemptRecord = {
      attemptId: 'att_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userCompany: currentUser.company,
      userRole: currentUser.role,
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
    localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts));
    saveAttemptToFirebase(attemptRecord);

    isAttemptingQuiz = false;
    currentViewingAttempt = attemptRecord;
    renderQuizHubUI();
  }

  // Render Quiz Results View Screen (With Generate Certificate Button & Explanations)
  function renderQuizResultsView(attempt) {
    return `
      <div class="quiz-results-view" style="max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        
        <!-- Results Card Header -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%); color: #FFF; padding: 35px; border-radius: 24px; text-align: center; margin-bottom: 30px; box-shadow: 0 15px 35px rgba(10,37,64,0.3);">
          <h2 style="font-family: 'Outfit', sans-serif; color: #FFF; font-size: 2rem; margin: 0 0 10px 0;">${attempt.weekTitle}</h2>
          <p style="color: #94A3B8; font-size: 0.95rem; margin-bottom: 25px;">Candidate: <strong>${attempt.userName}</strong></p>

          <!-- Big Score Circle / Gauge -->
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

          <!-- GENERATE CERTIFICATE BUTTON & DASHBOARD BUTTON -->
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button id="btn-generate-pdf-cert" class="btn btn-primary" style="padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1rem; box-shadow: 0 10px 25px rgba(255,90,31,0.4);">
              📜 Generate Certificate (PDF)
            </button>
            <button id="btn-results-to-dashboard" class="btn btn-secondary" style="padding: 16px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; border: 1.5px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #FFF;">
              ← Back
            </button>
          </div>
        </div>

        <!-- Question Explanations & Review Breakdown -->
        <h3 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); font-size: 1.3rem; margin: 0 0 20px 0;">
          💡 Question Explanations & Detailed Evaluation
        </h3>

        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px;">
          ${attempt.detailedResults.map((r, idx) => `
            <div style="background: var(--bg-white); border: 1.5px solid ${r.isCorrect ? '#10B981' : '#EF4444'}; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-navy);">Question ${idx + 1}</span>
                <span style="background: ${r.isCorrect ? '#D1FAE5' : '#FEE2E2'}; color: ${r.isCorrect ? '#065F46' : '#991B1B'}; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 20px;">
                  ${r.isCorrect ? '✅ Correct (+1 Mark)' : '❌ Incorrect (0 Marks)'}
                </span>
              </div>
              <h4 style="font-size: 0.98rem; color: var(--primary-navy); margin: 0 0 10px 0; font-weight: 700;">${r.question}</h4>
              <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">
                Your Answer: <strong style="color: ${r.isCorrect ? '#059669' : '#DC2626'};">${r.userAnswer}</strong>
              </div>
              ${!r.isCorrect ? `<div style="font-size: 0.88rem; color: var(--primary-navy); margin-bottom: 8px;">Correct Answer: <strong>${r.correctAnswer}</strong></div>` : ''}
              <div style="background: #F8FAFC; border-left: 3px solid var(--accent-orange); padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #475569; margin-top: 8px;">
                💡 <strong>Explanation:</strong> ${r.explanation}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // Bind Results View Events
  function bindResultsViewEvents() {
    const certBtn = document.getElementById('btn-generate-pdf-cert');
    if (certBtn) {
      certBtn.addEventListener('click', function () {
        if (currentViewingAttempt) downloadPDFResultSheet(currentViewingAttempt);
      });
    }

    const backDashBtn = document.getElementById('btn-results-to-dashboard');
    if (backDashBtn) {
      backDashBtn.addEventListener('click', function () {
        currentViewingAttempt = null;
        isAttemptingQuiz = false;
        renderQuizHubUI();
      });
    }
  }

  // Generate & Download PDF Result Sheet
  function downloadPDFResultSheet(attempt) {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nexus Competency Certificate - ${attempt.userName}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; }
          .cert-border { border: 10px solid #0A2540; padding: 35px; border-radius: 15px; text-align: center; }
          .logo { font-size: 26px; font-weight: bold; color: #FF5A1F; margin-bottom: 20px; }
          h1 { color: #0A2540; font-size: 26px; margin-bottom: 5px; }
          .subtitle { font-size: 14px; color: #64748B; text-transform: uppercase; letter-spacing: 2px; }
          .name { font-size: 32px; color: #FF5A1F; margin: 25px 0 10px 0; font-weight: bold; text-decoration: underline; }
          .company { font-size: 16px; color: #334155; margin-bottom: 30px; }
          .score-box { background: #f8fafc; border: 2px solid #cbd5e1; padding: 20px; border-radius: 10px; display: inline-block; margin-bottom: 30px; min-width: 300px; }
          .footer { font-size: 12px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="cert-border">
          <div class="logo"><span style="color: #0A2540;">NEXUS</span> <span style="color: #FF5A1F;">KNOWLEDGE HUB</span></div>
          <div class="subtitle">CERTIFICATE OF LOGISTICS COMPETENCY</div>
          <h1 style="margin-top: 15px;">${attempt.weekTitle}</h1>
          <p style="margin-top: 20px; color: #475569;">This official statement certifies that</p>
          <div class="name" style="margin-bottom: 25px;">${attempt.userName}</div>
          
          <div class="score-box">
            <div style="font-size: 14px; color: #64748B; font-weight: bold;">TOTAL SCORE PERCENTAGE</div>
            <div style="font-size: 42px; font-weight: bold; color: #FF5A1F; margin: 5px 0;">${attempt.percentage}%</div>
            <div style="font-size: 16px; font-weight: bold; color: #0A2540;">${attempt.grade}</div>
          </div>

          <p style="font-size: 13px; color: #475569; max-width: 500px; margin: 0 auto 20px auto;">
            Performance: Multiple Choice Questions: ${attempt.mcqScore}/10 | Technical Short Answer: ${attempt.shortScore}/10
          </p>

          <div class="footer">
            Verification ID: ${attempt.attemptId} | Issued on: ${new Date(attempt.timestamp).toLocaleDateString()} | Nexus Cargo (Pvt) Ltd Sri Lanka
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }

  // Open Owner Admin Portal Modal
  function openOwnerAdminModal() {
    const inputPass = prompt("Enter Nexus Owner Passcode:");
    if (inputPass !== ADMIN_PASSCODE) {
      alert("Invalid Passcode!");
      return;
    }

    const attempts = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
    let modalHtml = `
      <div id="admin-portal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,37,64,0.85); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: #FFF; border-radius: 20px; width: 100%; max-width: 950px; max-height: 85vh; overflow-y: auto; padding: 30px; box-shadow: 0 25px 50px rgba(0,0,0,0.3); font-family: 'Inter', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 15px; margin-bottom: 20px;">
            <div>
              <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 0;">👑 Owner Admin Portal - User Directory & Scores</h2>
              <span style="font-size: 0.85rem; color: var(--text-muted);">Total Candidates Registered: ${attempts.length}</span>
            </div>
            <button id="btn-close-admin" style="background: #EF4444; color: #FFF; border: none; padding: 8px 18px; border-radius: 20px; font-weight: 700; cursor: pointer;">
              Close ✖
            </button>
          </div>

          <div style="margin-bottom: 20px; display: flex; justify-content: flex-end;">
            <button id="btn-export-csv" class="btn btn-secondary" style="font-size: 0.85rem; padding: 8px 18px; border-radius: 30px;">
              📥 Export All Results to CSV
            </button>
          </div>

          <div style="overflow-x: auto;">
            <table class="kb-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
              <thead>
                <tr style="background: #F8FAFC;">
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Candidate Name</th>
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Email</th>
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Company / Role</th>
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Score %</th>
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Grade</th>
                  <th style="padding: 12px; border-bottom: 2px solid #CBD5E1;">Date</th>
                </tr>
              </thead>
              <tbody>
                ${attempts.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding: 20px;">No quiz attempts logged yet.</td></tr>' : ''}
                ${attempts.map(a => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;"><strong>${a.userName}</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${a.userEmail}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${a.userCompany} (${a.userRole})</td>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: var(--accent-orange);">${a.percentage}%</td>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${a.grade}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${new Date(a.timestamp).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('btn-close-admin').addEventListener('click', function () {
      const modal = document.getElementById('admin-portal-overlay');
      if (modal) modal.remove();
    });

    document.getElementById('btn-export-csv').addEventListener('click', function () {
      exportAttemptsToCSV(attempts);
    });
  }

  // Export Results to CSV
  function exportAttemptsToCSV(attempts) {
    if (!attempts || attempts.length === 0) {
      alert("No data available to export.");
      return;
    }
    let csv = "Candidate Name,Email,Company,Role,Week Challenge,Score MCQ,Score Short,Total Score,Percentage,Grade,Timestamp\n";
    attempts.forEach(a => {
      csv += `"${a.userName}","${a.userEmail}","${a.userCompany}","${a.userRole}","${a.weekTitle}",${a.mcqScore},${a.shortScore},${a.totalScore},"${a.percentage}%","${a.grade}","${a.timestamp}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `nexus_quiz_candidates_${Date.now()}.csv`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Firebase Fallback Helpers
  function saveUserToFirebase(user) {
    try {
      if (window.firebaseDB) {
        window.firebaseDB.collection('users').doc(user.id).set(user);
      }
    } catch (err) {
      console.warn("Firebase sync fallback:", err);
    }
  }

  function saveAttemptToFirebase(attempt) {
    try {
      if (window.firebaseDB) {
        window.firebaseDB.collection('attempts').doc(attempt.attemptId).set(attempt);
      }
    } catch (err) {
      console.warn("Firebase attempt sync fallback:", err);
    }
  }

  // Event Listeners on DOM Loaded
  document.addEventListener('DOMContentLoaded', function () {
    initQuizHub();
  });

  window.NEXUS_QUIZ_ENGINE = {
    init: initQuizHub,
    openAdmin: openOwnerAdminModal
  };

})();
