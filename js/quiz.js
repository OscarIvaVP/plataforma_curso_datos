/* ============================================
   Quiz Engine
   ============================================ */

const QuizEngine = {
  currentQuiz: null,
  currentModuleIndex: null,
  answers: {},
  submitted: false,

  render(moduleIndex) {
    this.currentModuleIndex = moduleIndex;
    const mod = COURSE_DATA.modules[moduleIndex];
    this.currentQuiz = mod.quiz;
    this.answers = {};
    this.submitted = false;

    document.getElementById('quiz-badge').textContent = `Módulo ${moduleIndex + 1}`;
    document.getElementById('quiz-title').textContent = this.currentQuiz.title;

    const body = document.getElementById('quiz-body');
    body.innerHTML = '';

    this.currentQuiz.questions.forEach((q, i) => {
      const questionEl = document.createElement('div');
      questionEl.className = 'quiz-question';
      questionEl.innerHTML = `
        <div class="question-number">Pregunta ${i + 1} de ${this.currentQuiz.questions.length}</div>
        <div class="question-text">${q.question}</div>
        <div class="question-options" id="options-${i}">
          ${q.options.map((opt, j) => `
            <button class="option-btn" data-question="${i}" data-option="${j}">
              <span class="option-letter">${String.fromCharCode(65 + j)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="question-explanation" id="explanation-${i}">${q.explanation}</div>
      `;
      body.appendChild(questionEl);
    });

    // Bind option clicks
    body.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.submitted) return;
        const qIndex = parseInt(btn.dataset.question);
        const oIndex = parseInt(btn.dataset.option);
        this.selectOption(qIndex, oIndex);
      });
    });

    // Show submit, hide results
    document.getElementById('quiz-actions').classList.remove('hidden');
    document.getElementById('quiz-results').classList.add('hidden');

    const submitBtn = document.getElementById('btn-submit-quiz');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar respuestas';
  },

  selectOption(questionIndex, optionIndex) {
    this.answers[questionIndex] = optionIndex;

    // Update UI
    const container = document.getElementById(`options-${questionIndex}`);
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.option) === optionIndex) {
        btn.classList.add('selected');
      }
    });
  },

  submit() {
    const totalQuestions = this.currentQuiz.questions.length;
    const answeredCount = Object.keys(this.answers).length;

    if (answeredCount < totalQuestions) {
      // Highlight unanswered
      for (let i = 0; i < totalQuestions; i++) {
        if (this.answers[i] === undefined) {
          const q = document.querySelectorAll('.quiz-question')[i];
          q.style.borderColor = 'var(--error)';
          setTimeout(() => { q.style.borderColor = ''; }, 2000);
        }
      }
      return;
    }

    this.submitted = true;
    let correct = 0;

    this.currentQuiz.questions.forEach((q, i) => {
      const container = document.getElementById(`options-${i}`);
      const explanation = document.getElementById(`explanation-${i}`);
      const buttons = container.querySelectorAll('.option-btn');

      buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.classList.remove('selected');
        const oIndex = parseInt(btn.dataset.option);

        if (oIndex === q.correct) {
          btn.classList.add('correct');
        } else if (oIndex === this.answers[i] && oIndex !== q.correct) {
          btn.classList.add('incorrect');
        }
      });

      if (this.answers[i] === q.correct) {
        correct++;
      }

      explanation.classList.add('show');
    });

    const score = Math.round((correct / totalQuestions) * 100);
    const passed = score >= this.currentQuiz.passingScore;

    // Show results
    document.getElementById('quiz-actions').classList.add('hidden');
    const results = document.getElementById('quiz-results');
    results.classList.remove('hidden');

    const icon = document.getElementById('result-icon');
    icon.textContent = passed ? '✓' : '✗';
    icon.className = `result-icon ${passed ? 'pass' : 'fail'}`;

    document.getElementById('result-title').textContent = passed ? '¡Aprobado!' : 'No aprobado';
    document.getElementById('result-message').textContent =
      passed
        ? `Has obtenido ${score}% (${correct}/${totalQuestions} correctas). ¡Excelente trabajo!`
        : `Has obtenido ${score}% (${correct}/${totalQuestions} correctas). Necesitas al menos ${this.currentQuiz.passingScore}% para aprobar.`;

    const nextBtn = document.getElementById('btn-next-module');
    const retryBtn = document.getElementById('btn-retry-quiz');

    if (passed) {
      nextBtn.classList.remove('hidden');
      retryBtn.classList.add('hidden');

      // Save quiz as passed
      if (typeof App !== 'undefined') {
        App.completeQuiz(this.currentModuleIndex);
      }
    } else {
      nextBtn.classList.add('hidden');
      retryBtn.classList.remove('hidden');
    }

    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  retry() {
    this.render(this.currentModuleIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
