/*
  Render the verse screen and manage each step of the memorization flow.
*/

const VerseScreen = {
  steps: [
    { key: 'read', label: 'Read the Verse', helper: 'Slow down, read it aloud, and settle into the truth of the verse.' },
    { key: 'understand', label: 'Understand the Verse', helper: 'See the meaning clearly before trying to memorize it.' },
    { key: 'fill', label: 'Fill in the Blanks', helper: 'Practice the important words until they come naturally.' },
    { key: 'meaning', label: 'What Does This Mean?', helper: 'Choose the explanation that matches the verse faithfully.' },
    { key: 'wrongTeaching', label: 'Spot the Wrong Teaching', helper: 'Discern what the verse does not support.' },
    { key: 'ownWords', label: 'Say It In Your Own Words', helper: 'Turn the verse into language you can remember and share.' },
    { key: 'memoryCheck', label: 'Memory Check', helper: 'Type the verse from memory and test your retention.' },
    { key: 'mastered', label: 'Verse Mastered', helper: 'Finish the journey and mark this verse complete.' },
  ],

  getSteps() {
    return this.steps;
  },

  normalizeText(value) {
    return value
      .toLowerCase()
      .replace(/[.,"â€œâ€â€˜â€™â€“â€”?:!;]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  getActiveStepIndex() {
    const firstIncomplete = this.steps.findIndex((step) => !this.progress.completedSteps.includes(step.key));
    return firstIncomplete === -1 ? this.steps.length - 1 : firstIncomplete;
  },

  getCompletionPercent() {
    return Math.round((this.progress.completedSteps.length / this.steps.length) * 100);
  },

  isStepCompleted(index) {
    return this.progress.completedSteps.includes(this.steps[index].key);
  },

  isStepUnlocked(index) {
    return index <= this.currentStepIndex;
  },

  getStepState(index) {
    if (this.isStepCompleted(index)) {
      return 'completed';
    }

    if (index === this.currentStepIndex) {
      return 'current';
    }

    if (this.isStepUnlocked(index)) {
      return 'available';
    }

    return 'locked';
  },

  getStepStatusLabel(index) {
    const state = this.getStepState(index);
    if (state === 'completed') {
      return 'Completed';
    }

    if (state === 'current') {
      return 'Current step';
    }

    if (state === 'available') {
      return 'Ready to review';
    }

    return 'Unlock by finishing the earlier steps';
  },

  getDisplayedStep() {
    return this.steps[this.viewStepIndex];
  },

  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  },

  jumpToCurrentStep() {
    this.viewStepIndex = this.currentStepIndex;
  },

  moveView(offset) {
    const nextIndex = this.viewStepIndex + offset;
    if (nextIndex < 0 || nextIndex > this.currentStepIndex) {
      return false;
    }

    this.viewStepIndex = nextIndex;
    return true;
  },

  render(container, verseData) {
    this.verseData = verseData;
    this.progress = StorageHelper.getVerseProgress(verseData.id);
    this.currentStepIndex = this.getActiveStepIndex();

    if (typeof this.viewStepIndex !== 'number' || this.viewStepIndex > this.currentStepIndex || this.viewStepIndex < 0) {
      this.viewStepIndex = this.currentStepIndex;
    }

    const displayedStep = this.getDisplayedStep();
    const completionPercent = this.getCompletionPercent();
    const completedSteps = this.progress.completedSteps.length;
    const isViewingCurrentStep = this.viewStepIndex === this.currentStepIndex;

    container.innerHTML = `
      <section class="verse-shell">
        <article class="verse-hero card">
          <div class="verse-topbar">
            <button class="button-secondary back-home" type="button">Back to home</button>
            <div class="step-indicator">Step ${Math.min(this.currentStepIndex + 1, this.steps.length)} of ${this.steps.length}</div>
          </div>
          <div class="verse-hero-grid">
            <div class="verse-copy">
              <span class="verse-reference">${verseData.reference}</span>
              <h1 class="heading-md">${verseData.title}</h1>
              <p class="verse-text">${verseData.verseText}</p>
              <div class="verse-progress-inline">
                <span>${completedSteps}/${this.steps.length} steps complete</span>
                <div class="progress-bar"><div class="progress-fill" style="width: ${completionPercent}%"></div></div>
              </div>
            </div>
            <aside class="verse-progress-panel">
              <div class="verse-progress-badge">Verse Progress</div>
              <div class="verse-progress-value">${completionPercent}%</div>
              <p>${completedSteps} of ${this.steps.length} learning steps completed.</p>
              <div class="verse-progress-note">${displayedStep.label}</div>
            </aside>
          </div>
        </article>

        <section class="verse-workspace">
          <article class="step-stage card-soft card">
            <div class="step-stage-header">
              <div>
                <span class="step-stage-kicker">${isViewingCurrentStep ? 'Current step' : 'Review step'}</span>
                <h2>${this.viewStepIndex + 1}. ${displayedStep.label}</h2>
                <p>${displayedStep.helper}</p>
              </div>
              ${isViewingCurrentStep ? '' : '<button class="button-secondary jump-current" type="button">Return to current step</button>'}
            </div>
            <div class="step-pills" aria-label="Verse steps">
              ${this.steps.map((step, index) => `
                <button
                  class="step-pill ${this.getStepState(index)} ${index === this.viewStepIndex ? 'is-viewing' : ''}"
                  type="button"
                  data-step-index="${index}"
                  ${this.isStepUnlocked(index) ? '' : 'disabled'}
                >
                  <span>${index + 1}</span>
                  <span>${step.label}</span>
                </button>
              `).join('')}
            </div>
            <div class="step-stage-body">
              ${this.getStepContent(displayedStep, isViewingCurrentStep)}
            </div>
          </article>
        </section>
      </section>
    `;

    this.attachEvents(container);
  },

  getStepContent(step, isCurrentStep) {
    if (!isCurrentStep) {
      return this.getReviewContent(step);
    }

    switch (step.key) {
      case 'read':
        return `
          <div class="stage-panel">
            <p>Read the verse carefully and feel the truth of these words.</p>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button">I have read it</button>
            </div>
          </div>
        `;
      case 'understand':
        return `
          <div class="stage-panel stage-panel-split">
            <div class="insight-card">
              <span>Explanation</span>
              <p>${this.verseData.explanation}</p>
            </div>
            <div class="insight-card">
              <span>Simple meaning</span>
              <p>${this.verseData.simpleMeaning}</p>
            </div>
            <div class="verse-actions stage-panel-wide">
              <button class="button-primary step-action" type="button">I understand</button>
            </div>
          </div>
        `;
      case 'fill':
        return `
          <div class="field-grid stage-panel">
            <p>${this.verseData.fillBlank.prompt}</p>
            ${this.verseData.fillBlank.answers.map((_, index) => `
              <label class="field-label" for="fill-${index}">Word ${index + 1}</label>
              <input id="fill-${index}" class="input-field" type="text" autocomplete="off" />
            `).join('')}
            <div class="verse-actions">
              <button class="button-primary step-action" type="button">Check answers</button>
            </div>
            <p class="feedback-message" aria-live="polite"></p>
          </div>
        `;
      case 'meaning':
        return `
          <div class="field-grid stage-panel">
            <p>${this.verseData.meaningQuestion.prompt}</p>
            <div class="option-group">
              ${this.verseData.meaningQuestion.options.map((option, index) => `
                <label class="radio-button">
                  <input type="radio" name="meaning-option" value="${index}" />
                  <span>${option}</span>
                </label>
              `).join('')}
            </div>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button" disabled>Submit answer</button>
            </div>
            <p class="feedback-message" aria-live="polite"></p>
          </div>
        `;
      case 'wrongTeaching':
        return `
          <div class="field-grid stage-panel">
            <p>${this.verseData.wrongTeachingQuestion.prompt}</p>
            <div class="option-group">
              ${this.verseData.wrongTeachingQuestion.options.map((option, index) => `
                <label class="radio-button">
                  <input type="radio" name="wrong-option" value="${index}" />
                  <span>${option}</span>
                </label>
              `).join('')}
            </div>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button" disabled>Submit answer</button>
            </div>
            <p class="feedback-message" aria-live="polite"></p>
          </div>
        `;
      case 'ownWords':
        return `
          <div class="field-grid stage-panel">
            <label class="field-label" for="reflection">${this.verseData.ownWordsPrompt}</label>
            <textarea id="reflection" class="textarea-field" placeholder="Write your thoughts here."></textarea>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button" disabled>Save reflection</button>
            </div>
            <p class="feedback-message" aria-live="polite"></p>
          </div>
        `;
      case 'memoryCheck':
        return `
          <div class="field-grid stage-panel">
            <label class="field-label" for="memory-input">Type the verse from memory</label>
            <textarea id="memory-input" class="textarea-field" placeholder="${this.verseData.reference}" rows="6"></textarea>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button">Submit memory check</button>
            </div>
            <p class="feedback-message" aria-live="polite"></p>
          </div>
        `;
      case 'mastered':
        return `
          <div class="stage-panel">
            <div class="insight-card">
              <span>Ready to complete</span>
              <p><strong>${this.verseData.title}</strong> is ready to be marked as mastered.</p>
              <p>When you select complete, this verse will be saved as fully mastered and you will return home.</p>
            </div>
            <div class="verse-actions">
              <button class="button-primary step-action" type="button">Complete verse</button>
            </div>
          </div>
        `;
      default:
        return '<p>Continue to the next step to build your memory.</p>';
    }
  },

  getReviewContent(step) {
    switch (step.key) {
      case 'read':
        return `
          <div class="review-panel">
            <p>You already completed the reading step. Revisit the verse above and move forward when you are ready.</p>
          </div>
        `;
      case 'understand':
        return `
          <div class="review-panel review-grid">
            <div class="insight-card">
              <span>Explanation</span>
              <p>${this.verseData.explanation}</p>
            </div>
            <div class="insight-card">
              <span>Simple meaning</span>
              <p>${this.verseData.simpleMeaning}</p>
            </div>
          </div>
        `;
      case 'fill':
        return `
          <div class="review-panel">
            <p>${this.verseData.fillBlank.prompt}</p>
            <div class="answer-chip-row">
              ${this.verseData.fillBlank.answers.map((answer) => `<span class="answer-chip">${answer}</span>`).join('')}
            </div>
          </div>
        `;
      case 'meaning':
        return `
          <div class="review-panel">
            <p>${this.verseData.meaningQuestion.prompt}</p>
            <div class="insight-card">
              <span>Correct answer</span>
              <p>${this.verseData.meaningQuestion.options[this.verseData.meaningQuestion.correct]}</p>
            </div>
          </div>
        `;
      case 'wrongTeaching':
        return `
          <div class="review-panel">
            <p>${this.verseData.wrongTeachingQuestion.prompt}</p>
            <div class="insight-card">
              <span>Unsupported statement</span>
              <p>${this.verseData.wrongTeachingQuestion.options[this.verseData.wrongTeachingQuestion.correct]}</p>
            </div>
          </div>
        `;
      case 'ownWords':
        return `
          <div class="review-panel">
            <div class="insight-card">
              <span>Your reflection</span>
              <p>${this.progress.reflection || 'No saved reflection yet.'}</p>
            </div>
          </div>
        `;
      case 'memoryCheck': {
        const attempts = this.progress.memoryCheckAttempts || [];
        const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1].entered : '';
        return `
          <div class="review-panel review-grid">
            <div class="insight-card">
              <span>Verse from memory</span>
              <p>${this.verseData.memoryText}</p>
            </div>
            <div class="insight-card">
              <span>Latest attempt</span>
              <p>${latestAttempt || 'No attempt has been saved yet.'}</p>
            </div>
          </div>
        `;
      }
      case 'mastered':
        return `
          <div class="review-panel">
            <div class="insight-card">
              <span>Journey complete</span>
              <p>This verse has already been brought through the full Genesis Light journey.</p>
            </div>
          </div>
        `;
      default:
        return '<p>This step is available for review.</p>';
    }
  },

  rerender(container) {
    this.render(container, this.verseData);
  },

  attachEvents(container) {
    const backButton = container.querySelector('.back-home');
    backButton.addEventListener('click', () => Router.navigateBackHome());

    container.querySelectorAll('.step-pill').forEach((button) => {
      button.addEventListener('click', () => {
        this.viewStepIndex = Number(button.dataset.stepIndex);
        this.rerender(container);
      });
    });

    const jumpCurrentButton = container.querySelector('.jump-current');
    if (jumpCurrentButton) {
      jumpCurrentButton.addEventListener('click', () => {
        this.jumpToCurrentStep();
        this.rerender(container);
      });
    }

    if (this.viewStepIndex !== this.currentStepIndex) {
      return;
    }

    const actionButton = container.querySelector('.step-action');
    if (!actionButton) {
      return;
    }

    const currentKey = this.getCurrentStep().key;
    if (currentKey === 'read' || currentKey === 'understand') {
      actionButton.addEventListener('click', () => {
        StorageHelper.markStepComplete(this.verseData.id, currentKey);
        this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
        this.rerender(container);
      });
      return;
    }

    if (currentKey === 'fill') {
      const feedback = container.querySelector('.feedback-message');
      actionButton.addEventListener('click', () => {
        const inputs = Array.from(container.querySelectorAll('input[id^="fill-"]'));
        const answers = this.verseData.fillBlank.answers;
        const values = inputs.map((input) => input.value.trim().toLowerCase());
        const correct = answers.every((answer, index) => values[index] === answer.toLowerCase());

        if (correct) {
          feedback.textContent = 'All answers are correct. Well done.';
          feedback.className = 'feedback-message feedback-correct';
          StorageHelper.markStepComplete(this.verseData.id, currentKey);
          this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
          setTimeout(() => this.rerender(container), 450);
        } else {
          feedback.textContent = 'One or more words need adjustment. Try again.';
          feedback.className = 'feedback-message feedback-wrong';
        }
      });
      return;
    }

    if (currentKey === 'meaning') {
      const submitBtn = actionButton;
      const feedback = container.querySelector('.feedback-message');
      const options = container.querySelectorAll('input[name="meaning-option"]');
      options.forEach((option) => {
        option.addEventListener('change', () => {
          submitBtn.disabled = false;
          feedback.textContent = '';
        });
      });
      submitBtn.addEventListener('click', () => {
        const selected = container.querySelector('input[name="meaning-option"]:checked');
        const choice = Number(selected?.value);
        const correctChoice = this.verseData.meaningQuestion.correct;
        if (choice === correctChoice) {
          feedback.textContent = 'Correct. This meaning reflects the verse well.';
          feedback.className = 'feedback-message feedback-correct';
          StorageHelper.markStepComplete(this.verseData.id, currentKey);
          this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
          setTimeout(() => this.rerender(container), 450);
        } else {
          feedback.textContent = 'That answer is not supported by the verse. Please review and try again.';
          feedback.className = 'feedback-message feedback-wrong';
        }
      });
      return;
    }

    if (currentKey === 'wrongTeaching') {
      const submitBtn = actionButton;
      const feedback = container.querySelector('.feedback-message');
      const options = container.querySelectorAll('input[name="wrong-option"]');
      options.forEach((option) => {
        option.addEventListener('change', () => {
          submitBtn.disabled = false;
          feedback.textContent = '';
        });
      });
      submitBtn.addEventListener('click', () => {
        const selected = container.querySelector('input[name="wrong-option"]:checked');
        const choice = Number(selected?.value);
        const correctChoice = this.verseData.wrongTeachingQuestion.correct;
        if (choice === correctChoice) {
          feedback.textContent = 'Correct. That statement is not supported by the verse.';
          feedback.className = 'feedback-message feedback-correct';
          StorageHelper.markStepComplete(this.verseData.id, currentKey);
          this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
          setTimeout(() => this.rerender(container), 450);
        } else {
          feedback.textContent = 'The chosen statement is supported by the verse. Try again.';
          feedback.className = 'feedback-message feedback-wrong';
        }
      });
      return;
    }

    if (currentKey === 'ownWords') {
      const textarea = container.querySelector('#reflection');
      const submitBtn = actionButton;
      const feedback = container.querySelector('.feedback-message');
      textarea.addEventListener('input', () => {
        submitBtn.disabled = textarea.value.trim().length === 0;
      });
      submitBtn.addEventListener('click', () => {
        const reflection = textarea.value.trim();
        if (!reflection) {
          feedback.textContent = 'Please share your own words to continue.';
          feedback.className = 'feedback-message feedback-wrong';
          return;
        }
        StorageHelper.saveReflection(this.verseData.id, reflection);
        StorageHelper.markStepComplete(this.verseData.id, currentKey);
        feedback.textContent = 'Reflection saved.';
        feedback.className = 'feedback-message feedback-correct';
        this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
        setTimeout(() => this.rerender(container), 450);
      });
      return;
    }

    if (currentKey === 'memoryCheck') {
      const input = container.querySelector('#memory-input');
      const feedback = container.querySelector('.feedback-message');
      actionButton.addEventListener('click', () => {
        const answer = this.normalizeText(input.value);
        const expected = this.normalizeText(this.verseData.memoryText);
        StorageHelper.saveMemoryCheckAttempt(this.verseData.id, input.value.trim());
        if (answer === expected) {
          feedback.textContent = 'Memory check passed. You have remembered the verse.';
          feedback.className = 'feedback-message feedback-correct';
          StorageHelper.markStepComplete(this.verseData.id, currentKey);
          this.viewStepIndex = Math.min(this.currentStepIndex + 1, this.steps.length - 1);
          setTimeout(() => this.rerender(container), 450);
        } else {
          feedback.textContent = 'The verse is close but not exact yet. Try again from memory.';
          feedback.className = 'feedback-message feedback-wrong';
        }
      });
      return;
    }

    if (currentKey === 'mastered') {
      actionButton.addEventListener('click', () => {
        StorageHelper.completeVerse(this.verseData.id);
        const progress = StorageHelper.loadProgress();
        const finishedCount = Object.values(progress.verses).filter((verse) => verse.completedSteps.length >= 8).length;
        if (finishedCount >= APP_DATA.verses.length) {
          Router.showCompletion();
        } else {
          Router.showHome();
        }
      });
    }
  },
};
