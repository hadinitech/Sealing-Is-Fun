/*
  Render the Revelation Sealing memorisation flow one step at a time.
*/

const RevelationMemoryScreen = {
  steps: [
    {
      title: 'Read It Slowly',
      helper: 'Read the verse aloud three times. Then cover it and try to say it once without looking.',
      renderContent(section) {
        return `
          <div class="memory-step-panel">
            <p class="memory-step-verse">${section.verseText}</p>
            <p class="memory-step-note">Take your time with the wording, pauses, and order of the sentence.</p>
            <div class="memory-step-actions">
              <button class="button-primary" type="button" data-action="memory-next">Next Step</button>
            </div>
          </div>
        `;
      },
      attachEvents(container, section, sectionIndex, stepIndex) {
        container.querySelector('[data-action="memory-next"]').addEventListener('click', () => {
          Router.showRevelationMemory(sectionIndex, stepIndex + 1);
        });
      },
    },
    {
      title: 'Fill In The Missing Words',
      helper: 'Use the missing-word exercise to strengthen the exact wording of the verse.',
      renderContent(section) {
        const exercise = RevelationMemoryScreen.buildBlankPrompt(section.verseText);
        return `
          <div class="memory-step-panel">
            <p class="memory-step-prompt">${exercise.prompt}</p>
            <div class="memory-step-inputs">
              ${exercise.answers.map((_, index) => `
                <input class="input-field memory-blank-input" type="text" data-blank-index="${index}" placeholder="Word ${index + 1}" autocomplete="off" />
              `).join('')}
            </div>
            <div class="memory-step-actions">
              <button class="button-secondary" type="button" data-action="check-blanks">Check answers</button>
              <button class="button-primary" type="button" data-action="memory-next" disabled>Next Step</button>
            </div>
            <p class="memory-step-feedback" data-feedback="blanks" aria-live="polite"></p>
          </div>
        `;
      },
      attachEvents(container, section, sectionIndex, stepIndex) {
        const exercise = RevelationMemoryScreen.buildBlankPrompt(section.verseText);
        const nextButton = container.querySelector('[data-action="memory-next"]');
        const feedback = container.querySelector('[data-feedback="blanks"]');

        container.querySelector('[data-action="check-blanks"]').addEventListener('click', () => {
          const values = Array.from(container.querySelectorAll('.memory-blank-input')).map((input) => input.value.trim().toLowerCase());
          const expected = exercise.answers.map((answer) => answer.toLowerCase());
          const allCorrect = expected.every((answer, index) => values[index] === answer);

          if (allCorrect) {
            feedback.textContent = 'Well done. You filled in all the missing words correctly.';
            feedback.className = 'memory-step-feedback feedback-correct';
            nextButton.disabled = false;
          } else {
            feedback.textContent = `Try again. Correct words: ${exercise.answers.join(', ')}`;
            feedback.className = 'memory-step-feedback feedback-wrong';
            nextButton.disabled = true;
          }
        });

        nextButton.addEventListener('click', () => {
          Router.showRevelationMemory(sectionIndex, stepIndex + 1);
        });
      },
    },
    {
      title: 'Type It From Memory',
      helper: 'Type the full verse from memory and check whether it matches the verse exactly.',
      renderContent() {
        return `
          <div class="memory-step-panel">
            <textarea class="textarea-field memory-step-textarea" placeholder="Type the verse here from memory."></textarea>
            <div class="memory-step-actions">
              <button class="button-secondary" type="button" data-action="check-memory">Check memory</button>
              <button class="button-primary" type="button" data-action="complete-verse" disabled>Next Verse</button>
            </div>
            <p class="memory-step-feedback" data-feedback="memory" aria-live="polite"></p>
          </div>
        `;
      },
      attachEvents(container, section, sectionIndex, stepIndex, studyData) {
        const completeButton = container.querySelector('[data-action="complete-verse"]');
        const feedback = container.querySelector('[data-feedback="memory"]');
        const textarea = container.querySelector('.memory-step-textarea');
        const isLastVerse = sectionIndex === studyData.sections.length - 1;

        container.querySelector('[data-action="check-memory"]').addEventListener('click', () => {
          const entered = RevelationMemoryScreen.normalizeText(textarea.value);
          const expected = RevelationMemoryScreen.normalizeText(section.verseText);

          if (entered === expected) {
            feedback.textContent = 'Excellent. You remembered the verse accurately.';
            feedback.className = 'memory-step-feedback feedback-correct';
            completeButton.disabled = false;
            completeButton.textContent = isLastVerse ? 'Finish Memorisation' : 'Next Verse';
          } else {
            feedback.textContent = 'Close, but not exact yet. Read it again and try once more from memory.';
            feedback.className = 'memory-step-feedback feedback-wrong';
            completeButton.disabled = true;
          }
        });

        completeButton.addEventListener('click', () => {
          if (isLastVerse) {
            Router.showRevelationSealing();
            return;
          }

          Router.showRevelationStudy(sectionIndex + 1);
        });
      },
    },
  ],

  normalizeText(value) {
    return value
      .toLowerCase()
      .replace(/[.,":;!?']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  getWordsForBlankPrompt(verseText) {
    return verseText
      .replace(/[,:;.!?]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  },

  buildBlankPrompt(verseText) {
    const words = this.getWordsForBlankPrompt(verseText);
    const blankIndexes = words
      .map((_, index) => index)
      .filter((index) => index % 4 === 1)
      .slice(0, 4);

    const promptWords = words.map((word, index) => (
      blankIndexes.includes(index) ? '________' : word
    ));

    return {
      prompt: promptWords.join(' '),
      answers: blankIndexes.map((index) => words[index]),
    };
  },

  render(container, studyData, sectionIndex = 0, stepIndex = 0) {
    const safeSectionIndex = Math.max(0, Math.min(sectionIndex, studyData.sections.length - 1));
    const safeStepIndex = Math.max(0, Math.min(stepIndex, this.steps.length - 1));
    const section = studyData.sections[safeSectionIndex];
    const step = this.steps[safeStepIndex];
    const totalSections = studyData.sections.length;
    const verseProgressPercent = Math.round(((safeSectionIndex + 1) / totalSections) * 100);
    const stepProgressPercent = Math.round(((safeStepIndex + 1) / this.steps.length) * 100);

    container.innerHTML = `
      <section class="study-shell">
        <section class="study-hero memory-hero">
          <div class="study-hero-inner">
            <div class="study-hero-copy">
              <div class="study-kicker">Memorise ${section.verseLabel}</div>
              <h1 class="heading-md">${step.title}</h1>
              <p class="memory-step-helper">${step.helper}</p>
            </div>
            <aside class="study-progress-card">
              <div class="study-progress-head">
                <strong>Memorisation Progress</strong>
                <span>${safeSectionIndex + 1} of ${totalSections}</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width: ${verseProgressPercent}%"></div></div>
              <p>Step ${safeStepIndex + 1} of ${this.steps.length}</p>
              <div class="progress-bar progress-bar-thin"><div class="progress-fill" style="width: ${stepProgressPercent}%"></div></div>
            </aside>
            <div class="study-hero-art">
              <img src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot for Revelation memorisation." />
            </div>
          </div>
        </section>

        <section class="study-content">
          <article class="memory-shell card">
            <div class="memory-shell-head">
              <span class="study-section-kicker">${section.verseLabel}</span>
              <div class="memory-step-progress">Step ${safeStepIndex + 1} of ${this.steps.length}</div>
            </div>
            ${step.renderContent(section)}
          </article>

          <div class="study-actions">
            <button class="button-secondary" type="button" data-action="back-study">Back to Study</button>
            <button class="button-secondary" type="button" data-action="back-revelation">Back to Revelation Sealing</button>
          </div>
        </section>
      </section>
    `;

    container.querySelector('[data-action="back-study"]').addEventListener('click', () => {
      Router.showRevelationStudy(safeSectionIndex);
    });

    container.querySelector('[data-action="back-revelation"]').addEventListener('click', () => {
      Router.showRevelationSealing();
    });

    step.attachEvents(container, section, safeSectionIndex, safeStepIndex, studyData);
  },
};
