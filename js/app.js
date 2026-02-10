/* ============================================
   Main Application Logic
   ============================================ */

const App = {
  // State
  state: {
    username: '',
    completedLessons: [],
    completedQuizzes: [],
    currentView: 'dashboard',
    currentModuleIndex: null,
    currentLessonIndex: null,
  },

  STORAGE_KEY: 'datapath_progress',

  // ---- Init ----
  init() {
    this.loadState();

    if (this.state.username) {
      this.showApp();
    } else {
      this.showWelcome();
    }

    this.bindEvents();
  },

  // ---- LocalStorage ----
  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved state');
    }
  },

  saveState() {
    try {
      const toSave = {
        username: this.state.username,
        completedLessons: this.state.completedLessons,
        completedQuizzes: this.state.completedQuizzes,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save state');
    }
  },

  resetProgress() {
    if (!confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) return;
    this.state.completedLessons = [];
    this.state.completedQuizzes = [];
    this.saveState();
    this.renderSidebar();
    this.renderDashboard();
    this.navigateTo('dashboard');
  },

  // ---- Welcome ----
  showWelcome() {
    document.getElementById('welcome-modal').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    const input = document.getElementById('student-name');
    const btn = document.getElementById('start-btn');

    input.addEventListener('input', () => {
      btn.disabled = input.value.trim().length === 0;
    });

    btn.addEventListener('click', () => {
      const name = input.value.trim();
      if (!name) return;
      this.state.username = name;
      this.saveState();
      document.getElementById('welcome-modal').classList.add('hidden');
      this.showApp();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        btn.click();
      }
    });
  },

  // ---- App ----
  showApp() {
    document.getElementById('welcome-modal').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    this.renderSidebar();
    this.renderDashboard();
    this.navigateTo('dashboard');
  },

  // ---- Events ----
  bindEvents() {
    // Mobile menu
    document.getElementById('menu-toggle').addEventListener('click', () => this.toggleSidebar(true));
    document.getElementById('sidebar-close').addEventListener('click', () => this.toggleSidebar(false));
    document.getElementById('sidebar-overlay').addEventListener('click', () => this.toggleSidebar(false));

    // Reset progress
    document.getElementById('reset-progress-btn').addEventListener('click', () => this.resetProgress());

    // Lesson tabs
    document.querySelectorAll('.lesson-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.lesson-tabs .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
      });
    });

    // Lesson actions (only static handlers here — dynamic onclick set in renderLessonActions)
    document.getElementById('btn-complete-lesson').addEventListener('click', () => this.completeCurrentLesson());
    document.getElementById('btn-back-lesson').addEventListener('click', () => this.navigateTo('dashboard'));
    document.getElementById('btn-back-quiz').addEventListener('click', () => this.navigateTo('dashboard'));

    // Quiz actions
    document.getElementById('btn-submit-quiz').addEventListener('click', () => QuizEngine.submit());
    document.getElementById('btn-retry-quiz').addEventListener('click', () => QuizEngine.retry());
    document.getElementById('btn-next-module').addEventListener('click', () => this.goToNextModule());

    // Certificate
    document.getElementById('cert-close').addEventListener('click', () => {
      document.getElementById('cert-modal').classList.add('hidden');
    });
    document.getElementById('cert-download').addEventListener('click', () => this.downloadCertificate());
  },

  toggleSidebar(open) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (open) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  },

  // ---- Navigation ----
  navigateTo(view, data) {
    this.state.currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (view === 'dashboard') {
      document.getElementById('view-dashboard').classList.add('active');
      this.renderDashboard();
    } else if (view === 'lesson') {
      document.getElementById('view-lesson').classList.add('active');
      this.renderLesson(data.moduleIndex, data.lessonIndex);
    } else if (view === 'quiz') {
      document.getElementById('view-quiz').classList.add('active');
      QuizEngine.render(data.moduleIndex);
    }

    this.toggleSidebar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ---- Progress Helpers ----
  isLessonCompleted(lessonId) {
    return this.state.completedLessons.includes(lessonId);
  },

  isQuizCompleted(quizId) {
    return this.state.completedQuizzes.includes(quizId);
  },

  isModuleUnlocked(moduleIndex) {
    if (moduleIndex === 0) return true;
    const prevModule = COURSE_DATA.modules[moduleIndex - 1];
    const allLessonsDone = prevModule.lessons.every(l => this.isLessonCompleted(l.id));
    const quizDone = this.isQuizCompleted(prevModule.quiz.id);
    return allLessonsDone && quizDone;
  },

  isLessonUnlocked(moduleIndex, lessonIndex) {
    if (!this.isModuleUnlocked(moduleIndex)) return false;
    if (lessonIndex === 0) return true;
    const prevLesson = COURSE_DATA.modules[moduleIndex].lessons[lessonIndex - 1];
    return this.isLessonCompleted(prevLesson.id);
  },

  isQuizUnlocked(moduleIndex) {
    const mod = COURSE_DATA.modules[moduleIndex];
    return mod.lessons.every(l => this.isLessonCompleted(l.id));
  },

  getModuleProgress(moduleIndex) {
    const mod = COURSE_DATA.modules[moduleIndex];
    const totalItems = mod.lessons.length + 1; // lessons + quiz
    let completed = mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
    if (this.isQuizCompleted(mod.quiz.id)) completed++;
    return Math.round((completed / totalItems) * 100);
  },

  getGlobalProgress() {
    let total = 0;
    let completed = 0;
    COURSE_DATA.modules.forEach(mod => {
      total += mod.lessons.length + 1;
      completed += mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
      if (this.isQuizCompleted(mod.quiz.id)) completed++;
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },

  getTotalCompletedLessons() {
    return this.state.completedLessons.length;
  },

  getTotalLessons() {
    return COURSE_DATA.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  },

  getCompletedQuizzesCount() {
    return this.state.completedQuizzes.length;
  },

  isCourseDone() {
    return COURSE_DATA.modules.every((mod, i) => {
      const lessonsDone = mod.lessons.every(l => this.isLessonCompleted(l.id));
      const quizDone = this.isQuizCompleted(mod.quiz.id);
      return lessonsDone && quizDone;
    });
  },

  // ---- Complete Actions ----
  completeCurrentLesson() {
    const mod = COURSE_DATA.modules[this.state.currentModuleIndex];
    const lesson = mod.lessons[this.state.currentLessonIndex];

    if (!this.isLessonCompleted(lesson.id)) {
      this.state.completedLessons.push(lesson.id);
      this.saveState();
    }

    this.renderSidebar();
    this.renderLessonActions();
    this.updateGlobalProgress();
  },

  completeQuiz(moduleIndex) {
    const mod = COURSE_DATA.modules[moduleIndex];
    if (!this.isQuizCompleted(mod.quiz.id)) {
      this.state.completedQuizzes.push(mod.quiz.id);
      this.saveState();
    }
    this.renderSidebar();
    this.updateGlobalProgress();

    // Check if course is complete
    if (this.isCourseDone()) {
      setTimeout(() => this.showCertificate(), 800);
    }
  },

  // ---- Render Sidebar ----
  renderSidebar() {
    // Username
    document.getElementById('sidebar-username').textContent = this.state.username;
    document.getElementById('user-avatar').textContent = this.state.username.charAt(0).toUpperCase();

    // Global progress
    this.updateGlobalProgress();

    // Modules nav
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, mi) => {
      const unlocked = this.isModuleUnlocked(mi);
      const progress = this.getModuleProgress(mi);
      const isComplete = progress === 100;

      const moduleEl = document.createElement('div');
      moduleEl.className = `nav-module${unlocked ? '' : ' locked'}`;

      // Module button
      const modBtn = document.createElement('button');
      modBtn.className = `nav-module-btn${!unlocked ? ' locked' : ''}${isComplete ? ' completed' : ''}`;
      modBtn.innerHTML = `
        <span class="mod-icon">${mod.icon}</span>
        <span class="mod-title">${mod.title}</span>
        <span class="mod-chevron">▶</span>
      `;

      if (unlocked) {
        modBtn.addEventListener('click', () => {
          moduleEl.classList.toggle('open');
        });
      }

      moduleEl.appendChild(modBtn);

      // Lessons list
      const lessonsEl = document.createElement('div');
      lessonsEl.className = 'nav-lessons';

      mod.lessons.forEach((lesson, li) => {
        const lessonUnlocked = this.isLessonUnlocked(mi, li);
        const lessonDone = this.isLessonCompleted(lesson.id);

        const lessonBtn = document.createElement('button');
        lessonBtn.className = `nav-lesson-btn${lessonDone ? ' completed' : ''}${!lessonUnlocked ? ' locked' : ''}`;
        lessonBtn.innerHTML = `
          <span class="lesson-status">${lessonDone ? '✓' : !lessonUnlocked ? '🔒' : ''}</span>
          <span>${lesson.title}</span>
        `;

        if (lessonUnlocked) {
          lessonBtn.addEventListener('click', () => {
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: li });
          });
        }

        lessonsEl.appendChild(lessonBtn);
      });

      // Quiz button
      const quizUnlocked = this.isQuizUnlocked(mi);
      const quizDone = this.isQuizCompleted(mod.quiz.id);

      const quizBtn = document.createElement('button');
      quizBtn.className = `nav-quiz-btn${quizDone ? ' completed' : ''}${!quizUnlocked ? ' locked' : ''}`;
      quizBtn.innerHTML = `
        <span class="quiz-icon">${quizDone ? '✓' : !quizUnlocked ? '🔒' : '?'}</span>
        <span>Quiz</span>
      `;

      if (quizUnlocked && !quizDone) {
        quizBtn.addEventListener('click', () => {
          this.navigateTo('quiz', { moduleIndex: mi });
        });
      } else if (quizDone) {
        quizBtn.addEventListener('click', () => {
          this.navigateTo('quiz', { moduleIndex: mi });
        });
      }

      lessonsEl.appendChild(quizBtn);
      moduleEl.appendChild(lessonsEl);
      nav.appendChild(moduleEl);
    });
  },

  updateGlobalProgress() {
    const pct = this.getGlobalProgress();
    document.getElementById('global-progress-pct').textContent = `${pct}%`;
    document.getElementById('global-progress-bar').style.width = `${pct}%`;
    document.getElementById('header-progress-text').textContent = `${pct}%`;
  },

  // ---- Render Dashboard ----
  renderDashboard() {
    document.getElementById('dashboard-username').textContent = this.state.username;
    document.getElementById('stat-completed').textContent = this.getTotalCompletedLessons();
    document.getElementById('stat-total').textContent = this.getTotalLessons();
    document.getElementById('stat-quizzes').textContent = this.getCompletedQuizzesCount();

    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, mi) => {
      const unlocked = this.isModuleUnlocked(mi);
      const progress = this.getModuleProgress(mi);
      const isComplete = progress === 100;

      const card = document.createElement('div');
      card.className = `module-card${!unlocked ? ' locked' : ''}${isComplete ? ' completed' : ''}`;

      card.innerHTML = `
        <div class="module-card-header">
          <span class="module-icon">${mod.icon}</span>
          <span class="module-number">Módulo ${mi + 1}</span>
        </div>
        <h3>${mod.title}</h3>
        <p>${mod.description}</p>
        <div class="module-card-footer">
          ${unlocked
            ? `<div class="module-progress-bar">
                <div class="module-progress-fill" style="width:${progress}%"></div>
              </div>
              <span class="module-progress-text">${progress}%</span>`
            : `<span class="module-lock-icon">🔒</span>
              <span class="module-progress-text">Bloqueado</span>`
          }
        </div>
      `;

      if (unlocked) {
        card.addEventListener('click', () => {
          // Open first incomplete lesson or quiz
          const firstIncompleteLessonIndex = mod.lessons.findIndex(l => !this.isLessonCompleted(l.id));
          if (firstIncompleteLessonIndex !== -1) {
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: firstIncompleteLessonIndex });
          } else if (!this.isQuizCompleted(mod.quiz.id)) {
            this.navigateTo('quiz', { moduleIndex: mi });
          } else {
            // All done, open first lesson for review
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: 0 });
          }
        });
      }

      grid.appendChild(card);
    });

    // Show certificate button if course is complete
    if (this.isCourseDone()) {
      const certCard = document.createElement('div');
      certCard.className = 'module-card completed';
      certCard.style.borderColor = 'rgba(0, 212, 255, 0.3)';
      certCard.innerHTML = `
        <div class="module-card-header">
          <span class="module-icon">🎓</span>
          <span class="module-number">Completado</span>
        </div>
        <h3>Tu Certificado</h3>
        <p>Has completado todo el curso. Descarga tu certificado de finalización.</p>
        <div class="module-card-footer">
          <span class="module-progress-text" style="color: var(--accent-cyan);">Ver certificado →</span>
        </div>
      `;
      certCard.addEventListener('click', () => this.showCertificate());
      grid.appendChild(certCard);
    }
  },

  // ---- Render Lesson ----
  renderLesson(moduleIndex, lessonIndex) {
    // Validate bounds
    const mod = COURSE_DATA.modules[moduleIndex];
    if (!mod || !mod.lessons[lessonIndex]) {
      this.navigateTo('dashboard');
      return;
    }

    this.state.currentModuleIndex = moduleIndex;
    this.state.currentLessonIndex = lessonIndex;

    const lesson = mod.lessons[lessonIndex];

    // Badge & title
    document.getElementById('lesson-badge').textContent = `Módulo ${moduleIndex + 1} — Lección ${lessonIndex + 1}`;
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-duration').innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      ${lesson.duration}
    `;

    // Video — always rebuild to avoid stale iframe references
    const videoContainer = document.getElementById('video-container');
    if (lesson.videoId && lesson.videoId !== 'VIDEO_ID_PLACEHOLDER') {
      const youtubeUrl = lesson.youtubeUrl || `https://www.youtube.com/watch?v=${lesson.videoId}`;
      if (lesson.noEmbed) {
        // Video doesn't allow embedding — show thumbnail with link to YouTube
        videoContainer.innerHTML = `
          <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="display:block;position:relative;padding-bottom:56.25%;background:#000;border-radius:12px;overflow:hidden;text-decoration:none;">
            <img src="https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg" alt="${lesson.title}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.7;">
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
              <div style="width:68px;height:48px;background:red;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;">
                <div style="width:0;height:0;border-left:18px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:4px;"></div>
              </div>
              <span style="color:#fff;font-size:0.95rem;font-weight:600;text-shadow:0 1px 4px rgba(0,0,0,0.7);">Ver en YouTube</span>
            </div>
          </a>
        `;
      } else {
        videoContainer.innerHTML = `
          <div class="video-wrapper">
            <iframe src="https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      }
    } else {
      videoContainer.innerHTML = `
        <div class="video-wrapper" style="display:flex;align-items:center;justify-content:center;padding-bottom:0;height:300px;">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:3rem;margin-bottom:12px;">▶</div>
            <p>Video pendiente de configurar</p>
            <p style="font-size:0.8rem;margin-top:4px;">Reemplaza VIDEO_ID_PLACEHOLDER en data.js con el ID de tu video de YouTube</p>
          </div>
        </div>
      `;
    }

    // Reading content - convert simple markdown-like text to HTML
    const readingHTML = this.formatReading(lesson.reading);
    document.getElementById('reading-content').innerHTML = readingHTML;

    // Resources
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    if (lesson.resources && lesson.resources.length > 0) {
      lesson.resources.forEach(res => {
        const iconMap = {
          notebook: { class: 'notebook', icon: '📓' },
          download: { class: 'download', icon: '⬇' },
          link: { class: 'link', icon: '🔗' },
          article: { class: 'article', icon: '📄' },
          github: { class: 'github', icon: '💻' },
        };
        const iconInfo = iconMap[res.type] || iconMap.link;

        const el = document.createElement('a');
        el.className = 'resource-item';
        el.href = res.url;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        el.innerHTML = `
          <div class="resource-icon ${iconInfo.class}">${iconInfo.icon}</div>
          <div class="resource-info">
            <div class="resource-title">${res.title}</div>
            <div class="resource-type">${res.type}</div>
          </div>
          <span class="resource-arrow">→</span>
        `;
        resourcesList.appendChild(el);
      });
    }

    // Reset tabs to reading
    document.querySelectorAll('.lesson-tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelector('.lesson-tabs .tab[data-tab="reading"]').classList.add('active');
    document.getElementById('tab-reading').classList.add('active');

    // Render actions
    this.renderLessonActions();
  },

  renderLessonActions() {
    const mod = COURSE_DATA.modules[this.state.currentModuleIndex];
    const lesson = mod.lessons[this.state.currentLessonIndex];
    const isDone = this.isLessonCompleted(lesson.id);

    const completeBtn = document.getElementById('btn-complete-lesson');
    if (isDone) {
      completeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        Completada
      `;
      completeBtn.classList.add('completed-state');
      completeBtn.disabled = true;
    } else {
      completeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        Marcar como completada
      `;
      completeBtn.classList.remove('completed-state');
      completeBtn.disabled = false;
    }

    // Next lesson button — capture current indices to avoid stale state reads
    const nextBtn = document.getElementById('btn-next-lesson');
    const mi = this.state.currentModuleIndex;
    const li = this.state.currentLessonIndex;
    const isLastLesson = li === mod.lessons.length - 1;

    // Always clear previous handler
    nextBtn.onclick = null;
    nextBtn.classList.add('hidden');

    if (isLastLesson) {
      // Check if quiz is available
      if (this.isQuizUnlocked(mi)) {
        nextBtn.innerHTML = `
          Ir al Quiz
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        `;
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => this.navigateTo('quiz', { moduleIndex: mi });
      }
    } else if (isDone) {
      // Only show next if current lesson is completed
      const nextLi = li + 1;
      if (nextLi < mod.lessons.length) {
        nextBtn.innerHTML = `
          Siguiente lección
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        `;
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: nextLi });
      }
    }
  },

  formatReading(text) {
    if (!text) return '';
    // Convert **bold** to <strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert lines starting with - to list items
    const lines = html.split('\n');
    let result = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        if (!inList) {
          result += '<ul>';
          inList = true;
        }
        result += `<li>${trimmed.substring(2)}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        if (trimmed === '') {
          // skip empty lines
        } else {
          result += `<p>${trimmed}</p>`;
        }
      }
    });

    if (inList) result += '</ul>';
    return result;
  },

  // ---- Navigation helpers ----
  goToNextModule() {
    const nextIndex = this.state.currentModuleIndex + 1;
    if (nextIndex < COURSE_DATA.modules.length) {
      if (this.isModuleUnlocked(nextIndex)) {
        this.navigateTo('lesson', { moduleIndex: nextIndex, lessonIndex: 0 });
      } else {
        this.navigateTo('dashboard');
      }
    } else {
      // Course complete
      this.navigateTo('dashboard');
    }
  },

  // ---- Certificate ----
  showCertificate() {
    document.getElementById('cert-modal').classList.remove('hidden');
    this.renderCertificate();
  },

  renderCertificate() {
    const canvas = document.getElementById('cert-canvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#0b0d17';
    ctx.fillRect(0, 0, w, h);

    // Border gradient
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, '#00d4ff');
    borderGrad.addColorStop(1, '#7b2ff7');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Inner border
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, w - 90, h - 90);

    // Corner decorations
    const cornerSize = 30;
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2;
    // Top-left
    ctx.beginPath(); ctx.moveTo(50, 80); ctx.lineTo(50, 50); ctx.lineTo(80, 50); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(w - 80, 50); ctx.lineTo(w - 50, 50); ctx.lineTo(w - 50, 80); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(50, h - 80); ctx.lineTo(50, h - 50); ctx.lineTo(80, h - 50); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(w - 80, h - 50); ctx.lineTo(w - 50, h - 50); ctx.lineTo(w - 50, h - 80); ctx.stroke();

    // Logo
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('◆ DataPath', w / 2, 110);

    // Title
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.fillText('CERTIFICADO DE FINALIZACIÓN', w / 2, 180);

    // Line
    const lineGrad = ctx.createLinearGradient(w / 2 - 100, 0, w / 2 + 100, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.5, '#00d4ff');
    lineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 150, 200);
    ctx.lineTo(w / 2 + 150, 200);
    ctx.stroke();

    // "Se certifica que"
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Se certifica que', w / 2, 260);

    // Name
    const nameGrad = ctx.createLinearGradient(w / 2 - 150, 0, w / 2 + 150, 0);
    nameGrad.addColorStop(0, '#00d4ff');
    nameGrad.addColorStop(1, '#7b2ff7');
    ctx.fillStyle = nameGrad;
    ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(this.state.username, w / 2, 330);

    // "ha completado satisfactoriamente"
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('ha completado satisfactoriamente el curso', w / 2, 400);

    // Course name
    ctx.fillStyle = '#e4e4e7';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Ciencia de Datos desde Cero', w / 2, 460);

    // Description
    ctx.fillStyle = '#555a70';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Incluyendo: Python, Análisis de Datos, Visualización y Machine Learning', w / 2, 500);

    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Bottom section
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';

    // Date
    ctx.fillText('Fecha de emisión', w / 2, 620);
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(dateStr, w / 2, 650);

    // Bottom line
    ctx.strokeStyle = lineGrad;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 150, 690);
    ctx.lineTo(w / 2 + 150, 690);
    ctx.stroke();

    // ID
    ctx.fillStyle = '#555a70';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    const certId = `CERT-${Date.now().toString(36).toUpperCase()}`;
    ctx.fillText(`ID: ${certId}`, w / 2, 720);
  },

  downloadCertificate() {
    const canvas = document.getElementById('cert-canvas');
    const link = document.createElement('a');
    link.download = `Certificado_${this.state.username.replace(/\s+/g, '_')}_CienciaDeDatos.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  },
};

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
