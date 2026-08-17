// Nexus Quiz Hub - Interactive Engine & Certification Management
// Handles weekly Monday auto-rotation, Quiz Execution, Scoring, PDF Certificate Generation & Firebase Owner Admin Sync

(function () {
  'use strict';

  // Owner Passcode for Admin Dashboard Access
  const ADMIN_PASSCODE = "nexusowner2026";

  // State Management
  let currentUser = JSON.parse(localStorage.getItem('nexus_quiz_user')) || null;
  let userAttempts = JSON.parse(localStorage.getItem('nexus_quiz_attempts')) || [];
  let activeWeekIndex = 0;
  let activeQuiz = null;
  let userAnswers = {}; // { questionId: answer }

  // Calculate Monday Auto-Rotation Week Index
  function calculateActiveWeekIndex() {
    if (!window.NEXUS_QUIZ_DATABASE || !window.NEXUS_QUIZ_DATABASE.weeks) return 0;
    const weeksPool = window.NEXUS_QUIZ_DATABASE.weeks;
    const referenceMonday = new Date('2026-01-05T00:00:00Z').getTime();
    const now = new Date().getTime();
    const elapsedMs = now - referenceMonday;
    const elapsedWeeks = Math.floor(elapsedMs / (7 * 24 * 60 * 60 * 1000));
    return Math.abs(elapsedWeeks) % weeksPool.length;
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

    container.innerHTML = renderQuizDashboard();
    bindQuizEvents();
  }

  // Registration Prompt (Easy KYC)
  function renderRegistrationPrompt() {
    return `
      <div class="quiz-kyc-card card-glass" style="max-width: 600px; margin: 40px auto; padding: 35px; border-radius: 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
        <div style="font-size: 3.5rem; margin-bottom: 15px;">📝</div>
        <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin-bottom: 10px; font-weight: 800;">Welcome to Nexus Quiz Hub</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 25px; line-height: 1.6;">
          Register once to access weekly logistics certification challenges, track your global rank, and download verifiable PDF certificates.
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
            🚀 Start Weekly Challenge
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

  // Render Active Quiz Dashboard
  function renderQuizDashboard() {
    if (!activeQuiz) return '<p style="text-align:center; padding:40px;">No quiz currently available.</p>';

    const latestAttempt = userAttempts.find(a => a.weekId === activeQuiz.id && a.userId === currentUser.id);

    return `
      <div class="quiz-dashboard" style="max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <!-- User Profile Banner & Owner Admin Link -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-white); padding: 18px 25px; border-radius: 16px; border: 1.5px solid var(--border-color); margin-bottom: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 45px; height: 45px; border-radius: 50%; background: var(--accent-orange); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem;">
              ${currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style="color: var(--primary-navy); font-size: 1rem; display: block;">${currentUser.name}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${currentUser.company} • ${currentUser.role}</span>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button id="btn-owner-admin" style="background: transparent; border: 1px dashed var(--accent-orange); color: var(--accent-orange); padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
              🔑 Owner Portal
            </button>
            <button id="btn-logout" style="background: none; border: none; color: #EF4444; font-size: 0.8rem; font-weight: 600; cursor: pointer; text-decoration: underline;">
              Logout
            </button>
          </div>
        </div>

        <!-- Weekly Header Card -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #1E293B 100%); color: #FFF; padding: 30px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(10,37,64,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px;">
            <div>
              <span style="background: rgba(255,90,31,0.2); color: #FF7A45; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; letter-spacing: 0.5px;">
                🔄 Active Weekly Challenge (Rotates Every Monday)
              </span>
              <h2 style="font-family: 'Outfit', sans-serif; margin: 12px 0 8px 0; font-size: 1.6rem; color: #FFF;">${activeQuiz.title}</h2>
              <p style="color: #94A3B8; font-size: 0.92rem; margin: 0; line-height: 1.5;">${activeQuiz.description}</p>
            </div>
            <div style="background: rgba(255,255,255,0.08); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); text-align: center;">
              <span style="font-size: 0.75rem; color: #CBD5E1; display: block;">Total Assessment</span>
              <strong style="font-size: 1.2rem; color: #FFF;">20 Questions</strong>
              <span style="font-size: 0.7rem; color: #94A3B8; display: block;">(10 MCQ + 10 Short Ans)</span>
            </div>
          </div>
        </div>

        ${latestAttempt ? renderAttemptResults(latestAttempt) : renderQuizQuestionsForm()}
      </div>
    `;
  }

  // Render Quiz Questions Form
  function renderQuizQuestionsForm() {
    let html = `
      <form id="quiz-attempt-form" style="display: flex; flex-direction: column; gap: 25px;">
        <div style="background: var(--bg-white); padding: 20px 25px; border-radius: 16px; border: 1.5px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 80px; z-index: 10; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
          <div>
            <strong style="color: var(--primary-navy); font-size: 0.95rem;">Assessment Progress</strong>
            <div style="width: 200px; height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden; margin-top: 5px;">
              <div id="quiz-progress-bar" style="width: 0%; height: 100%; background: var(--accent-orange); transition: width 0.3s ease;"></div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="padding: 10px 25px; border-radius: 50px; font-weight: 700; font-size: 0.9rem;">
            ✅ Submit & Grade Assessment
          </button>
        </div>

        <h3 style="font-family:'Outfit', sans-serif; color: var(--primary-navy); border-bottom: 2px solid var(--accent-orange); padding-bottom: 8px; margin-top: 10px;">
          SECTION 1: Multiple Choice Questions (10 Marks)
        </h3>
    `;

    // Render 10 MCQs
    activeQuiz.questions.filter(q => q.type === 'mcq').forEach((q, idx) => {
      html += `
        <div class="quiz-question-card" style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.78rem; font-weight: 700; background: #EFF6FF; color: #1E40AF; padding: 4px 10px; border-radius: 6px;">
              Q${idx + 1} • ${q.category}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">MCQ (1 Mark)</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--primary-navy); margin: 0 0 15px 0; line-height: 1.5;">${q.question}</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${q.options.map((opt, oIdx) => `
              <label style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; cursor: pointer; transition: all 0.2s ease; background: #FAFAFA;" class="quiz-opt-label">
                <input type="radio" name="q_${q.id}" value="${oIdx}" class="quiz-radio" style="accent-color: var(--accent-orange);" required>
                <span style="font-size: 0.92rem; color: var(--primary-navy);">${opt}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <h3 style="font-family:'Outfit', sans-serif; color: var(--primary-navy); border-bottom: 2px solid var(--accent-orange); padding-bottom: 8px; margin-top: 20px;">
        SECTION 2: Short Answer Technical Assessment (10 Marks)
      </h3>
    `;

    // Render 10 Short Answer Questions
    activeQuiz.questions.filter(q => q.type === 'short').forEach((q, idx) => {
      html += `
        <div class="quiz-question-card" style="background: var(--bg-white); border: 1.5px solid var(--border-color); padding: 22px; border-radius: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.78rem; font-weight: 700; background: #F0FDF4; color: #166534; padding: 4px 10px; border-radius: 6px;">
              Q${idx + 11} • ${q.category}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Short Answer (1 Mark)</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--primary-navy); margin: 0 0 12px 0; line-height: 1.5;">${q.question}</h4>
          <input type="text" name="q_${q.id}" required placeholder="Type your answer here..." style="width: 100%; padding: 12px 16px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem;">
        </div>
      `;
    });

    html += `
        <div style="text-align: center; margin-top: 20px;">
          <button type="submit" class="btn btn-primary" style="padding: 16px 45px; border-radius: 50px; font-weight: 800; font-size: 1.05rem; box-shadow: 0 10px 25px rgba(255,90,31,0.3);">
            🏁 Complete & Generate Official Certificate
          </button>
        </div>
      </form>
    `;

    return html;
  }

  // Bind Quiz Submission & Grading
  function bindQuizEvents() {
    const form = document.getElementById('quiz-attempt-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        gradeAssessment(form);
      });
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        currentUser = null;
        localStorage.removeItem('nexus_quiz_user');
        renderQuizHubUI();
      });
    }

    const adminBtn = document.getElementById('btn-owner-admin');
    if (adminBtn) {
      adminBtn.addEventListener('click', openOwnerAdminModal);
    }
  }

  // Grade Assessment Logic
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

    renderQuizHubUI();
  }

  // Render Results & Certificate Download Screen
  function renderAttemptResults(attempt) {
    return `
      <div style="background: var(--bg-white); border: 1.5px solid var(--border-color); border-radius: 20px; padding: 35px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.08);">
        <span style="font-size: 3.5rem;">🎉</span>
        <h2 style="font-family: 'Outfit', sans-serif; color: var(--primary-navy); margin: 10px 0 5px 0;">Assessment Completed!</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 25px;">Your score has been officially recorded in the Nexus Knowledge Hub directory.</p>

        <!-- Score Gauge Display -->
        <div style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border: 2px solid var(--border-color); border-radius: 16px; padding: 25px; max-width: 450px; margin: 0 auto 30px auto;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Final Score Percentage</span>
          <div style="font-size: 3.5rem; font-weight: 900; color: var(--accent-orange); font-family: 'Outfit', sans-serif; line-height: 1;">
            ${attempt.percentage}%
          </div>
          <strong style="display: block; margin-top: 10px; color: var(--primary-navy); font-size: 1.1rem;">${attempt.grade}</strong>
          <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 5px;">
            MCQ: ${attempt.mcqScore}/10 • Short Answer: ${attempt.shortScore}/10
          </span>
        </div>

        <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 35px;">
          <button id="btn-download-pdf" class="btn btn-primary" style="padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem;">
            📜 Download Official PDF Result Sheet
          </button>
          <button id="btn-retake-quiz" class="btn btn-secondary" style="padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; border: 1.5px solid var(--border-color);">
            🔄 Re-take Assessment
          </button>
        </div>

        <!-- Question Breakdown Review -->
        <h3 style="text-align: left; font-family: 'Outfit', sans-serif; color: var(--primary-navy); border-bottom: 2px solid var(--accent-orange); padding-bottom: 8px; margin-bottom: 20px;">
          Detailed Answer Explanations
        </h3>
        <div style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
          ${attempt.detailedResults.map((r, idx) => `
            <div style="background: ${r.isCorrect ? '#F0FDF4' : '#FEF2F2'}; border: 1px solid ${r.isCorrect ? '#86EFAC' : '#FCA5A5'}; padding: 18px; border-radius: 12px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.85rem; margin-bottom: 6px; color: ${r.isCorrect ? '#15803D' : '#B91C1C'};">
                <span>Q${idx + 1}. ${r.question}</span>
                <span>${r.isCorrect ? '✔ Correct (+1)' : '✖ Incorrect (0)'}</span>
              </div>
              <p style="margin: 4px 0; font-size: 0.88rem; color: #334155;"><strong>Your Answer:</strong> ${r.userAnswer}</p>
              ${!r.isCorrect ? `<p style="margin: 4px 0; font-size: 0.88rem; color: #15803D;"><strong>Correct Answer:</strong> ${r.correctAnswer}</p>` : ''}
              <p style="margin: 6px 0 0 0; font-size: 0.82rem; color: #64748B; font-style: italic; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 6px;">💡 ${r.explanation}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
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
          .cert-border { border: 10px solid #0A2540; padding: 30px; border-radius: 15px; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; color: #FF5A1F; margin-bottom: 20px; }
          h1 { color: #0A2540; font-size: 28px; margin-bottom: 5px; }
          .subtitle { font-size: 14px; color: #64748B; text-transform: uppercase; letter-spacing: 2px; }
          .name { font-size: 32px; color: #FF5A1F; margin: 25px 0 10px 0; font-weight: bold; text-decoration: underline; }
          .company { font-size: 16px; color: #334155; margin-bottom: 30px; }
          .score-box { background: #f8fafc; border: 2px solid #cbd5e1; padding: 20px; border-radius: 10px; display: inline-block; margin-bottom: 30px; min-width: 300px; }
          .footer { font-size: 12px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="cert-border">
          <div class="logo">NEXUS KNOWLEDGE HUB</div>
          <div class="subtitle">Official Statement of Logistics Competency</div>
          <h1>${attempt.weekTitle}</h1>
          <p style="margin-top: 20px; color: #475569;">This official statement certifies that</p>
          <div class="name">${attempt.userName}</div>
          <div class="company">${attempt.userCompany} • ${attempt.userRole}</div>
          
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

  // Firebase Fallback Helpers (Zero-Cost Persistence)
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

    // Delegate PDF download button
    document.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'btn-download-pdf') {
        const latest = userAttempts[0];
        if (latest) downloadPDFResultSheet(latest);
      }
      if (e.target && e.target.id === 'btn-retake-quiz') {
        if (confirm("Are you sure you want to retake this quiz? Your existing attempt will be updated.")) {
          userAttempts.shift();
          localStorage.setItem('nexus_quiz_attempts', JSON.stringify(userAttempts));
          renderQuizHubUI();
        }
      }
    });
  });

  window.NEXUS_QUIZ_ENGINE = {
    init: initQuizHub,
    openAdmin: openOwnerAdminModal
  };

})();
