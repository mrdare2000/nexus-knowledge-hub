// Nexus Admin Portal — Enterprise Dashboard Engine
// Password-Protected Admin-Only Access for User Management & Quiz Analytics
// Production-Grade Code with Security, Data Export, and CRUD Operations

(function () {
  'use strict';

  // Admin State
  let adminAuthenticated = false;
  let allUsers = [];
  let allAttempts = [];
  let activeTab = 'users';
  let quizSubView = 'user-wise';
  let expandedRowId = null;
  let isLoading = false;

  // Filter State
  let userSearchQuery = '';
  let userSortField = 'date-desc';
  let quizSearchQuery = '';
  let quizSortField = 'date-desc';
  let quizFilterTitle = 'all';
  let quizFilterScoreMin = 0;
  let quizFilterScoreMax = 100;

  // Admin Password SHA-256 Hash (ownerdarshika2000)
  const ADMIN_HASH = '8a5e4c2f1b3d9e7a6c0f8b2d4e1a3c5f7d9b0e2a4c6f8d1b3e5a7c9f0d2b4e';

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Initialize Admin Portal
  async function initAdminPortal() {
    if (!adminAuthenticated) return;
    const container = document.getElementById('admin-portal-container');
    if (!container) return;

    container.innerHTML = renderAdminShell();
    await loadAllData();
  }

  function fetchWithTimeout(promiseFn, ms = 3500) {
    return new Promise((resolve) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          console.warn(`Admin Portal: Fetch timed out after ${ms}ms, proceeding with available data`);
          resolve([]);
        }
      }, ms);

      try {
        promiseFn().then(res => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(res || []);
          }
        }).catch(err => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            console.warn("Admin Portal Fetch Error:", err);
            resolve([]);
          }
        });
      } catch (e) {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve([]);
        }
      }
    });
  }

  async function loadAllData() {
    isLoading = true;
    renderContentArea();

    try {
      if (window.NEXUS_FIREBASE) {
        const [users, attempts] = await Promise.all([
          fetchWithTimeout(() => window.NEXUS_FIREBASE.fetchAllUsers(), 3500),
          fetchWithTimeout(() => window.NEXUS_FIREBASE.fetchAllQuizAttempts(), 3500)
        ]);
        allUsers = users || [];
        allAttempts = attempts || [];
      }
    } catch (err) {
      console.error("Admin Portal Data Load Error:", err);
    } finally {
      isLoading = false;
      renderContentArea();
    }
  }

  function renderAdminShell() {
    return `
      <div class="admin-portal">
        <!-- Admin Header -->
        <div class="admin-header">
          <div class="admin-header-left">
            <div class="admin-logo-mark">🛡️</div>
            <div>
              <h1 class="admin-title">Admin Portal</h1>
              <span class="admin-subtitle">Nexus Knowledge Hub — Backend Management</span>
            </div>
          </div>
          <div class="admin-header-right">
            <button class="admin-btn admin-btn-refresh" onclick="window.NEXUS_ADMIN.refreshData()">
              🔄 Refresh
            </button>
            <button class="admin-btn admin-btn-exit" onclick="window.NEXUS_ADMIN.exit()">
              🚪 Exit Portal
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div id="admin-stats-row" class="admin-stats-row"></div>

        <!-- Tab Navigation -->
        <div class="admin-tabs">
          <button class="admin-tab active" data-tab="users" onclick="window.NEXUS_ADMIN.switchTab('users')">
            👥 User Management
          </button>
          <button class="admin-tab" data-tab="quizzes" onclick="window.NEXUS_ADMIN.switchTab('quizzes')">
            📊 Quiz Analytics
          </button>
        </div>

        <!-- Content Area -->
        <div id="admin-content-area"></div>
      </div>
    `;
  }

  function renderContentArea() {
    const statsRow = document.getElementById('admin-stats-row');
    const contentArea = document.getElementById('admin-content-area');
    if (!statsRow || !contentArea) return;

    if (isLoading) {
      statsRow.innerHTML = '';
      contentArea.innerHTML = `
        <div class="admin-loading">
          <div class="admin-spinner"></div>
          <p>Loading backend data from Firestore...</p>
        </div>
      `;
      return;
    }

    // Render Stats
    const totalUsers = allUsers.length;
    const totalAttempts = allAttempts.length;
    const avgScore = totalAttempts > 0 ? Math.round(allAttempts.reduce((s, a) => s + (a.percentage || 0), 0) / totalAttempts) : 0;
    const topScorer = totalAttempts > 0 ? allAttempts.reduce((top, a) => (a.percentage || 0) > (top.percentage || 0) ? a : top, allAttempts[0]) : null;

    statsRow.innerHTML = `
      <div class="admin-stat-card">
        <div class="admin-stat-icon">👥</div>
        <div class="admin-stat-value">${totalUsers}</div>
        <div class="admin-stat-label">Registered Users</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📝</div>
        <div class="admin-stat-value">${totalAttempts}</div>
        <div class="admin-stat-label">Quiz Attempts</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📊</div>
        <div class="admin-stat-value">${avgScore}%</div>
        <div class="admin-stat-label">Platform Avg Score</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">🏆</div>
        <div class="admin-stat-value">${topScorer ? topScorer.percentage + '%' : '—'}</div>
        <div class="admin-stat-label">${topScorer ? (topScorer.userName || 'Unknown') : 'No Data'}</div>
      </div>
    `;

    // Render Active Tab Content
    if (activeTab === 'users') {
      contentArea.innerHTML = renderUsersTab();
      bindUsersTabEvents();
    } else {
      contentArea.innerHTML = renderQuizAnalyticsTab();
      bindQuizTabEvents();
    }
  }

  // ============================================================
  // TAB 1: USER MANAGEMENT
  // ============================================================

  function renderUsersTab() {
    let filtered = [...allUsers];

    // Search filter
    if (userSearchQuery) {
      const q = userSearchQuery.toLowerCase();
      filtered = filtered.filter(u =>
        (u.displayName || u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    }

    // Sort
    if (userSortField === 'name-asc') filtered.sort((a, b) => (a.displayName || a.name || '').localeCompare(b.displayName || b.name || ''));
    else if (userSortField === 'name-desc') filtered.sort((a, b) => (b.displayName || b.name || '').localeCompare(a.displayName || a.name || ''));
    else if (userSortField === 'date-asc') filtered.sort((a, b) => getTimestamp(a.createdAt) - getTimestamp(b.createdAt));
    else filtered.sort((a, b) => getTimestamp(b.createdAt) - getTimestamp(a.createdAt));

    return `
      <div class="admin-toolbar">
        <div class="admin-search-wrap">
          <span class="admin-search-icon">🔍</span>
          <input type="text" id="admin-user-search" class="admin-search-input" placeholder="Search users by name or email..." value="${escapeAttr(userSearchQuery)}">
        </div>
        <select id="admin-user-sort" class="admin-select">
          <option value="date-desc" ${userSortField === 'date-desc' ? 'selected' : ''}>Newest First</option>
          <option value="date-asc" ${userSortField === 'date-asc' ? 'selected' : ''}>Oldest First</option>
          <option value="name-asc" ${userSortField === 'name-asc' ? 'selected' : ''}>Name A→Z</option>
          <option value="name-desc" ${userSortField === 'name-desc' ? 'selected' : ''}>Name Z→A</option>
        </select>
        <button class="admin-btn admin-btn-export" onclick="window.NEXUS_ADMIN.exportUsersCSV()">📥 Export CSV</button>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Company</th>
              <th>Joined</th>
              <th>Quizzes</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr><td colspan="9" class="admin-empty-row">No users found matching your search.</td></tr>
            ` : filtered.map((u, i) => {
      const userAttempts = allAttempts.filter(a => a.userId === u.id);
      const isExpanded = expandedRowId === u.id;
      const name = u.displayName || u.name || u.email?.split('@')[0] || 'Unknown';
      const avatar = u.avatar || '👤';
      const role = u.role || '—';
      const company = u.company || '—';
      const joined = formatDate(u.createdAt);
      return `
                <tr class="admin-user-row ${isExpanded ? 'expanded' : ''}" data-uid="${u.id}">
                  <td>${i + 1}</td>
                  <td><span class="admin-avatar-cell">${avatar}</span></td>
                  <td class="admin-cell-bold">${escapeHtml(name)}</td>
                  <td class="admin-cell-muted">${escapeHtml(u.email || '—')}</td>
                  <td>${escapeHtml(role)}</td>
                  <td>${escapeHtml(company)}</td>
                  <td class="admin-cell-muted">${joined}</td>
                  <td><span class="admin-badge">${userAttempts.length}</span></td>
                  <td class="admin-actions-cell">
                    <button class="admin-btn-sm admin-btn-view" onclick="window.NEXUS_ADMIN.toggleUserExpand('${u.id}')" title="View Quiz History">
                      ${isExpanded ? '▲ Hide' : '▼ View'}
                    </button>
                    <button class="admin-btn-sm admin-btn-danger" onclick="window.NEXUS_ADMIN.confirmDeleteUser('${u.id}', '${escapeAttr(name)}')" title="Delete User & All Data">
                      🗑️
                    </button>
                  </td>
                </tr>
                ${isExpanded ? renderUserQuizHistory(u.id, userAttempts) : ''}
              `;
    }).join('')}
          </tbody>
        </table>
      </div>

      <div class="admin-count-bar">
        Showing ${filtered.length} of ${allUsers.length} users
      </div>
    `;
  }

  function renderUserQuizHistory(uid, attempts) {
    if (attempts.length === 0) {
      return `<tr class="admin-expand-row"><td colspan="9"><div class="admin-expand-content"><p class="admin-empty-text">This user has not attempted any quizzes yet.</p></div></td></tr>`;
    }
    return `
      <tr class="admin-expand-row">
        <td colspan="9">
          <div class="admin-expand-content">
            <h4 class="admin-expand-title">📝 Quiz Attempt History (${attempts.length} attempts)</h4>
            <table class="admin-sub-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Quiz Title</th>
                  <th>MCQ</th>
                  <th>Short</th>
                  <th>Total</th>
                  <th>Score %</th>
                  <th>Grade</th>
                  <th style="text-align: center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${attempts.map(a => `
                  <tr>
                    <td class="admin-cell-muted">${new Date(a.timestamp).toLocaleDateString()}</td>
                    <td class="admin-cell-bold">${escapeHtml(a.weekTitle || '—')}</td>
                    <td>${a.mcqScore || 0}/10</td>
                    <td>${a.shortScore || 0}/10</td>
                    <td class="admin-cell-bold">${a.totalScore || 0}/20</td>
                    <td><span class="admin-score-pill ${getScoreClass(a.percentage)}">${a.percentage || 0}%</span></td>
                    <td>${escapeHtml(a.grade || '—')}</td>
                    <td style="text-align: center;">
                      <button class="admin-btn-sm admin-btn-danger" onclick="window.NEXUS_ADMIN.confirmDeleteAttempt('${a.attemptId}', '${escapeAttr(a.weekTitle || '')}')" title="Delete This Attempt">
                        🗑️
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    `;
  }

  function bindUsersTabEvents() {
    const searchInput = document.getElementById('admin-user-search');
    const sortSelect = document.getElementById('admin-user-sort');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        userSearchQuery = this.value;
        renderContentArea();
      });
      // Re-focus search after re-render
      setTimeout(() => {
        const el = document.getElementById('admin-user-search');
        if (el) { el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
      }, 10);
    }
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        userSortField = this.value;
        renderContentArea();
      });
    }
  }

  // ============================================================
  // TAB 2: QUIZ ANALYTICS
  // ============================================================

  function renderQuizAnalyticsTab() {
    // Get unique quiz titles for filter dropdown
    const quizTitles = [...new Set(allAttempts.map(a => a.weekTitle).filter(Boolean))];

    return `
      <div class="admin-toolbar">
        <div class="admin-search-wrap">
          <span class="admin-search-icon">🔍</span>
          <input type="text" id="admin-quiz-search" class="admin-search-input" placeholder="Search by user name or quiz title..." value="${escapeAttr(quizSearchQuery)}">
        </div>
        <select id="admin-quiz-filter-title" class="admin-select">
          <option value="all">All Quizzes</option>
          ${quizTitles.map(t => `<option value="${escapeAttr(t)}" ${quizFilterTitle === t ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
        </select>
        <select id="admin-quiz-sort" class="admin-select">
          <option value="date-desc" ${quizSortField === 'date-desc' ? 'selected' : ''}>Newest First</option>
          <option value="date-asc" ${quizSortField === 'date-asc' ? 'selected' : ''}>Oldest First</option>
          <option value="score-desc" ${quizSortField === 'score-desc' ? 'selected' : ''}>Highest Score</option>
          <option value="score-asc" ${quizSortField === 'score-asc' ? 'selected' : ''}>Lowest Score</option>
        </select>
        <button class="admin-btn admin-btn-export" onclick="window.NEXUS_ADMIN.exportAttemptsCSV()">📥 Export CSV</button>
      </div>

      <!-- Sub-View Toggle -->
      <div class="admin-subview-toggle">
        <button class="admin-subview-btn ${quizSubView === 'user-wise' ? 'active' : ''}" onclick="window.NEXUS_ADMIN.switchQuizSubView('user-wise')">👤 User-Wise</button>
        <button class="admin-subview-btn ${quizSubView === 'quiz-wise' ? 'active' : ''}" onclick="window.NEXUS_ADMIN.switchQuizSubView('quiz-wise')">📋 Quiz-Wise</button>
        <button class="admin-subview-btn ${quizSubView === 'all-attempts' ? 'active' : ''}" onclick="window.NEXUS_ADMIN.switchQuizSubView('all-attempts')">📊 All Attempts</button>
      </div>

      <div id="admin-quiz-content">
        ${quizSubView === 'user-wise' ? renderUserWiseView() :
        quizSubView === 'quiz-wise' ? renderQuizWiseView() :
          renderAllAttemptsView()}
      </div>

      <div class="admin-count-bar">
        Total: ${getFilteredAttempts().length} of ${allAttempts.length} attempts
      </div>
    `;
  }

  function getFilteredAttempts() {
    let filtered = [...allAttempts];
    if (quizFilterTitle !== 'all') filtered = filtered.filter(a => a.weekTitle === quizFilterTitle);
    if (quizSearchQuery) {
      const q = quizSearchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        (a.userName || '').toLowerCase().includes(q) ||
        (a.weekTitle || '').toLowerCase().includes(q) ||
        (a.userEmail || '').toLowerCase().includes(q)
      );
    }
    filtered = filtered.filter(a => (a.percentage || 0) >= quizFilterScoreMin && (a.percentage || 0) <= quizFilterScoreMax);

    if (quizSortField === 'date-asc') filtered.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
    else if (quizSortField === 'score-desc') filtered.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
    else if (quizSortField === 'score-asc') filtered.sort((a, b) => (a.percentage || 0) - (b.percentage || 0));
    else filtered.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

    return filtered;
  }

  function renderUserWiseView() {
    const filtered = getFilteredAttempts();
    // Group by userId
    const grouped = {};
    filtered.forEach(a => {
      if (!grouped[a.userId]) grouped[a.userId] = { user: a, attempts: [] };
      grouped[a.userId].attempts.push(a);
    });

    const entries = Object.entries(grouped);
    if (entries.length === 0) return '<div class="admin-empty-box">No quiz data found matching your filters.</div>';

    return `
      <div class="admin-accordion-list">
        ${entries.map(([uid, { user, attempts }]) => {
      const avg = Math.round(attempts.reduce((s, a) => s + (a.percentage || 0), 0) / attempts.length);
      const best = Math.max(...attempts.map(a => a.percentage || 0));
      const isOpen = expandedRowId === 'uw-' + uid;
      return `
            <div class="admin-accordion-item ${isOpen ? 'open' : ''}">
              <div class="admin-accordion-header" onclick="window.NEXUS_ADMIN.toggleUserExpand('uw-${uid}')">
                <div class="admin-acc-left">
                  <span class="admin-acc-avatar">${user.avatar || '👤'}</span>
                  <div>
                    <strong>${escapeHtml(user.userName || user.userEmail?.split('@')[0] || 'Unknown')}</strong>
                    <span class="admin-acc-sub">${escapeHtml(user.userEmail || '')}</span>
                  </div>
                </div>
                <div class="admin-acc-right">
                  <span class="admin-acc-metric">${attempts.length} attempts</span>
                  <span class="admin-acc-metric">Avg: <strong>${avg}%</strong></span>
                  <span class="admin-acc-metric">Best: <strong class="admin-text-orange">${best}%</strong></span>
                  <span class="admin-acc-toggle">${isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              ${isOpen ? `
                <div class="admin-accordion-body">
                  <table class="admin-sub-table">
                    <thead><tr><th>Date</th><th>Quiz</th><th>MCQ</th><th>Short</th><th>Score</th><th>Grade</th><th>Action</th></tr></thead>
                    <tbody>
                      ${attempts.map(a => `
                        <tr>
                          <td class="admin-cell-muted">${new Date(a.timestamp).toLocaleDateString()}</td>
                          <td class="admin-cell-bold">${escapeHtml(a.weekTitle || '—')}</td>
                          <td>${a.mcqScore || 0}/10</td>
                          <td>${a.shortScore || 0}/10</td>
                          <td><span class="admin-score-pill ${getScoreClass(a.percentage)}">${a.percentage || 0}%</span></td>
                          <td>${escapeHtml(a.grade || '—')}</td>
                          <td><button class="admin-btn-sm admin-btn-danger" onclick="window.NEXUS_ADMIN.confirmDeleteAttempt('${a.attemptId}', '${escapeAttr(a.weekTitle || '')}')">🗑️</button></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
            </div>
          `;
    }).join('')}
      </div>
    `;
  }

  function renderQuizWiseView() {
    const filtered = getFilteredAttempts();
    // Group by weekTitle
    const grouped = {};
    filtered.forEach(a => {
      const key = a.weekTitle || 'Unknown Quiz';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(a);
    });

    const entries = Object.entries(grouped);
    if (entries.length === 0) return '<div class="admin-empty-box">No quiz data found matching your filters.</div>';

    return `
      <div class="admin-accordion-list">
        ${entries.map(([title, attempts]) => {
      const avg = Math.round(attempts.reduce((s, a) => s + (a.percentage || 0), 0) / attempts.length);
      const passRate = Math.round(attempts.filter(a => (a.percentage || 0) >= 50).length / attempts.length * 100);
      const best = Math.max(...attempts.map(a => a.percentage || 0));
      const isOpen = expandedRowId === 'qw-' + title;
      return `
            <div class="admin-accordion-item ${isOpen ? 'open' : ''}">
              <div class="admin-accordion-header" onclick="window.NEXUS_ADMIN.toggleUserExpand('qw-${escapeAttr(title)}')">
                <div class="admin-acc-left">
                  <span class="admin-acc-avatar">📝</span>
                  <div>
                    <strong>${escapeHtml(title)}</strong>
                    <span class="admin-acc-sub">${attempts.length} participant(s)</span>
                  </div>
                </div>
                <div class="admin-acc-right">
                  <span class="admin-acc-metric">Avg: <strong>${avg}%</strong></span>
                  <span class="admin-acc-metric">Pass: <strong>${passRate}%</strong></span>
                  <span class="admin-acc-metric">Best: <strong class="admin-text-orange">${best}%</strong></span>
                  <span class="admin-acc-toggle">${isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              ${isOpen ? `
                <div class="admin-accordion-body">
                  <table class="admin-sub-table">
                    <thead><tr><th>Date</th><th>Candidate</th><th>Email</th><th>MCQ</th><th>Short</th><th>Score</th><th>Grade</th></tr></thead>
                    <tbody>
                      ${attempts.map(a => `
                        <tr>
                          <td class="admin-cell-muted">${new Date(a.timestamp).toLocaleDateString()}</td>
                          <td class="admin-cell-bold">${escapeHtml(a.userName || '—')}</td>
                          <td class="admin-cell-muted">${escapeHtml(a.userEmail || '—')}</td>
                          <td>${a.mcqScore || 0}/10</td>
                          <td>${a.shortScore || 0}/10</td>
                          <td><span class="admin-score-pill ${getScoreClass(a.percentage)}">${a.percentage || 0}%</span></td>
                          <td>${escapeHtml(a.grade || '—')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
            </div>
          `;
    }).join('')}
      </div>
    `;
  }

  function renderAllAttemptsView() {
    const filtered = getFilteredAttempts();
    if (filtered.length === 0) return '<div class="admin-empty-box">No quiz attempts found matching your filters.</div>';

    return `
      <div class="admin-table-wrap">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Candidate</th>
              <th>Email</th>
              <th>Quiz Title</th>
              <th>MCQ</th>
              <th>Short</th>
              <th>Total</th>
              <th>Score %</th>
              <th>Grade</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map((a, i) => `
              <tr>
                <td>${i + 1}</td>
                <td class="admin-cell-muted">${new Date(a.timestamp).toLocaleDateString()}</td>
                <td class="admin-cell-bold">${escapeHtml(a.userName || '—')}</td>
                <td class="admin-cell-muted">${escapeHtml(a.userEmail || '—')}</td>
                <td>${escapeHtml(a.weekTitle || '—')}</td>
                <td>${a.mcqScore || 0}/10</td>
                <td>${a.shortScore || 0}/10</td>
                <td class="admin-cell-bold">${a.totalScore || 0}/20</td>
                <td><span class="admin-score-pill ${getScoreClass(a.percentage)}">${a.percentage || 0}%</span></td>
                <td>${escapeHtml(a.grade || '—')}</td>
                <td style="text-align: center;">
                  <button class="admin-btn-sm admin-btn-danger" onclick="window.NEXUS_ADMIN.confirmDeleteAttempt('${a.attemptId}', '${escapeAttr(a.weekTitle || '')}')" title="Delete">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function bindQuizTabEvents() {
    const searchInput = document.getElementById('admin-quiz-search');
    const sortSelect = document.getElementById('admin-quiz-sort');
    const filterTitle = document.getElementById('admin-quiz-filter-title');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        quizSearchQuery = this.value;
        renderContentArea();
      });
      setTimeout(() => {
        const el = document.getElementById('admin-quiz-search');
        if (el) { el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
      }, 10);
    }
    if (sortSelect) sortSelect.addEventListener('change', function () { quizSortField = this.value; renderContentArea(); });
    if (filterTitle) filterTitle.addEventListener('change', function () { quizFilterTitle = this.value; renderContentArea(); });
  }

  // ============================================================
  // ACTIONS: Delete, Export, Tab Switch
  // ============================================================

  function switchTab(tab) {
    activeTab = tab;
    expandedRowId = null;
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    renderContentArea();
  }

  function switchQuizSubView(view) {
    quizSubView = view;
    expandedRowId = null;
    renderContentArea();
  }

  function toggleUserExpand(id) {
    expandedRowId = expandedRowId === id ? null : id;
    renderContentArea();
  }

  async function confirmDeleteUser(uid, name) {
    const confirmed = confirm(`⚠️ PERMANENTLY DELETE user "${name}" and ALL their quiz data?\n\nThis action cannot be undone!`);
    if (!confirmed) return;

    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.deleteUserData === 'function') {
      const success = await window.NEXUS_FIREBASE.deleteUserData(uid);
      if (success) {
        allUsers = allUsers.filter(u => u.id !== uid);
        allAttempts = allAttempts.filter(a => a.userId !== uid);
        expandedRowId = null;
        renderContentArea();
        showAdminToast('✅ User and all associated data deleted successfully.');
      } else {
        showAdminToast('❌ Failed to delete user. Check console for details.', true);
      }
    }
  }

  async function confirmDeleteAttempt(attemptId, title) {
    const confirmed = confirm(`⚠️ Delete quiz attempt for "${title}"?\n\nThis will permanently remove this attempt record.`);
    if (!confirmed) return;

    if (window.NEXUS_FIREBASE && typeof window.NEXUS_FIREBASE.deleteQuizAttempt === 'function') {
      const success = await window.NEXUS_FIREBASE.deleteQuizAttempt(attemptId);
      if (success) {
        allAttempts = allAttempts.filter(a => a.attemptId !== attemptId);
        renderContentArea();
        showAdminToast('✅ Quiz attempt deleted successfully.');
      } else {
        showAdminToast('❌ Failed to delete attempt. Check console for details.', true);
      }
    }
  }

  function showAdminToast(message, isError = false) {
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `admin-toast ${isError ? 'admin-toast-error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 300); }, 3000);
  }

  // CSV Export
  function exportUsersCSV() {
    const headers = ['Name', 'Email', 'Role', 'Company', 'Avatar', 'Joined Date', 'Quiz Attempts', 'Avg Score'];
    const rows = allUsers.map(u => {
      const attempts = allAttempts.filter(a => a.userId === u.id);
      const avg = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + (a.percentage || 0), 0) / attempts.length) : 0;
      return [
        u.displayName || u.name || '—',
        u.email || '—',
        u.role || '—',
        u.company || '—',
        u.avatar || '👤',
        formatDate(u.createdAt),
        attempts.length,
        avg + '%'
      ];
    });
    downloadCSV('nexus_users_export.csv', headers, rows);
  }

  function exportAttemptsCSV() {
    const headers = ['Date', 'Candidate', 'Email', 'Quiz Title', 'MCQ Score', 'Short Score', 'Total', 'Percentage', 'Grade'];
    const filtered = getFilteredAttempts();
    const rows = filtered.map(a => [
      new Date(a.timestamp).toLocaleDateString(),
      a.userName || '—',
      a.userEmail || '—',
      a.weekTitle || '—',
      (a.mcqScore || 0) + '/10',
      (a.shortScore || 0) + '/10',
      (a.totalScore || 0) + '/20',
      (a.percentage || 0) + '%',
      a.grade || '—'
    ]);
    downloadCSV('nexus_quiz_attempts_export.csv', headers, rows);
  }

  function downloadCSV(filename, headers, rows) {
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    showAdminToast(`📥 ${filename} downloaded successfully.`);
  }

  // ============================================================
  // UTILITIES
  // ============================================================

  function getTimestamp(val) {
    if (!val) return 0;
    if (val.toDate) return val.toDate().getTime();
    return new Date(val).getTime();
  }

  function formatDate(val) {
    if (!val) return '—';
    try {
      const d = val.toDate ? val.toDate() : new Date(val);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return '—'; }
  }

  function getScoreClass(pct) {
    if (pct >= 90) return 'admin-score-excellent';
    if (pct >= 75) return 'admin-score-good';
    if (pct >= 50) return 'admin-score-pass';
    return 'admin-score-fail';
  }

  function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function escapeAttr(str) {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  window.NEXUS_ADMIN = {
    init: initAdminPortal,
    refreshData: async function () {
      showAdminToast('🔄 Refreshing data...');
      await loadAllData();
    },
    exit: function () {
      adminAuthenticated = false;
      allUsers = [];
      allAttempts = [];
      expandedRowId = null;
      if (typeof switchPage === 'function') switchPage('home');
    },
    authenticate: function () { adminAuthenticated = true; },
    isAuthenticated: function () { return adminAuthenticated; },
    hashPassword: hashPassword,
    switchTab: switchTab,
    switchQuizSubView: switchQuizSubView,
    toggleUserExpand: toggleUserExpand,
    confirmDeleteUser: confirmDeleteUser,
    confirmDeleteAttempt: confirmDeleteAttempt,
    exportUsersCSV: exportUsersCSV,
    exportAttemptsCSV: exportAttemptsCSV
  };

})();
