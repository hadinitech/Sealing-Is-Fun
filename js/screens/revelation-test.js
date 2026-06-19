/*
  Render the Revelation Sealing test screen.
*/

const RevelationTestScreen = {
  keywordChecks: {
    1: [
      { label: 'the two kinds of revelation', terms: ['prophetic vision', 'reality revelation'] },
      { label: 'the revelation to receive at fulfillment', terms: ['reality revelation'] },
      { label: 'from whom it must be received', terms: ['promised shepherd', 'one who overcomes', 'new john'] },
    ],
    2: [
      { label: 'whose appearance begins fulfillment', terms: ['jesus of the second coming'] },
      { label: 'the reference', terms: ['rv 1', 'rv 2', 'rv 3'] },
      { label: 'when it was fulfilled', terms: ['1966'] },
      { label: 'where it was fulfilled', terms: ['tabernacle temple', 'gwacheon', 'mt. cheonggye'] },
    ],
    3: [
      { label: 'the word of God', terms: ['opened book', 'rev 10', 'received and ate'] },
      { label: 'the testimony of Jesus', terms: ['fulfilled realities', 'entire book of revelation'] },
    ],
    4: [
      { label: 'the one who reads', terms: ['new john', 'rv 10', 'opened book'] },
      { label: 'those who hear', terms: ['peoples', 'nations', 'languages', 'kings', 'rv 10:11'] },
      { label: 'those who keep', terms: ['12 tribes', '144,000', 'multitude in white', 'rv 7'] },
    ],
    5: [
      { label: 'when the blood applies', terms: ['time of the fulfillment of revelation'] },
      { label: 'to whom it applies', terms: ['12 tribes', '144,000', 'great multitude in white', 'rv 7:14'] },
    ],
    6: [
      { label: 'the reference', terms: ['rv 22:18', 'rv 22:19'] },
      { label: 'the reason', terms: ['adds to', 'subtracts from', 'cannot enter heaven', 'curses', 'plagues'] },
    ],
    7: [
      { label: 'when true meaning is known', terms: ['fulfilled', 'reality appears'] },
    ],
    8: [
      { label: 'what New John testifies today', terms: ['unprecedented realities of revelation'] },
      { label: 'where he testifies', terms: ['shincheonji'] },
      { label: 'why there', terms: ['shepherd who saw and heard', 'site of fulfillment'] },
    ],
    9: [
      { label: 'God’s purpose', terms: ['12 tribes', 'sealed 144,000', 'rv 7'] },
    ],
    10: [
      { label: 'who must keep the promises', terms: ['time of fulfilment', 'book of revelation'] },
      { label: 'the blessings', terms: ['heaven', 'eternal life', 'kingdom and priests'] },
    ],
    11: [
      { label: 'identity according to the Bible', terms: ['firstfruit', 'rv 14', 'born of god’s seed', 'harvested', 'sealed', '12 tribes', 'rv 7'] },
    ],
    12: [
      { label: 'proof', terms: ['harvested', 'sealed', '12 tribes', 'rv 7'] },
    ],
    13: [
      { label: 'where Jesus was from', terms: ['nazareth'] },
      { label: 'what kind of place it was', terms: ['poor village'] },
      { label: 'what he received', terms: ['contempt', 'scorn', 'persecution'] },
    ],
    14: [
      { label: 'who gave birth', terms: ['god'] },
      { label: 'with what', terms: ['word of god'] },
    ],
    15: [
      { label: 'what it means', terms: ['intangible spirit'] },
    ],
  },

  normalizeText(value) {
    return value
      .toLowerCase()
      .replace(/[“”‘’'"(),.:;!?~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  hasTerm(text, term) {
    return text.includes(this.normalizeText(term));
  },

  getAnswerParts(questionNumber, item) {
    const checks = this.keywordChecks[questionNumber] || [];
    const partCount = Math.max(item.answer.length, checks.length, 1);
    return Array.from({ length: partCount }, (_, index) => ({
      index,
      label: partCount === 1 ? 'Your answer' : `${index + 1}. Your answer`,
    }));
  },

  formatPrompt(prompt) {
    return prompt
      .replace(/â‘ /g, '1. ')
      .replace(/â‘¡/g, '2. ')
      .replace(/â‘¢/g, '3. ')
      .replace(/â€™/g, "'")
      .replace(/â€˜/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€”/g, ' - ')
      .replace(/â€“/g, '-');
  },

  evaluateAnswer(questionNumber, responses) {
    const checks = this.keywordChecks[questionNumber] || [];
    const matched = [];
    const missing = [];

    checks.forEach((check, index) => {
      const normalizedResponse = this.normalizeText(responses[index] || '');
      const passed = check.terms.every((term) => this.hasTerm(normalizedResponse, term));
      if (passed) {
        matched.push(check.label);
      } else {
        missing.push(check.label);
      }
    });

    const total = checks.length;
    const score = total === 0 ? 0 : Math.round((matched.length / total) * 100);
    return {
      matched,
      missing,
      score,
      passed: total > 0 && matched.length === total,
    };
  },

  render(container, testData) {
    const questionCards = testData.questions.map((item) => `
      <article class="test-card card" data-question-number="${item.number}">
        <div class="test-card-head">
          <span class="study-section-kicker">Question ${item.number}</span>
        </div>
        <div class="test-card-body">
          <h2>${this.formatPrompt(item.prompt)}</h2>
          <div class="test-answer-fields">
            ${this.getAnswerParts(item.number, item).map((part) => `
              <div class="form-control">
                <label class="field-label" for="test-answer-${item.number}-${part.index}">${part.label}</label>
                <textarea
                  id="test-answer-${item.number}-${part.index}"
                  class="textarea-field test-answer-input"
                  rows="4"
                  data-answer-part="${part.index}"
                  placeholder="Type your answer here."
                ></textarea>
              </div>
            `).join('')}
          </div>
          <div class="test-card-actions">
            <button class="button-primary" type="button" data-action="mark-answer">Mark answer</button>
            <button class="button-link" type="button" data-action="toggle-model-answer">Show guide answer</button>
          </div>
          <p class="test-feedback" aria-live="polite"></p>
          <div class="test-answer-block test-answer-block-hidden">
            <span class="test-answer-label">Guide answer</span>
            ${item.answer.map((line) => `<p>${this.formatPrompt(line)}</p>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = `
      <section class="study-shell">
        <section class="study-hero test-hero">
          <div class="study-hero-inner">
            <div class="study-hero-copy">
              <div class="study-kicker">Write the Sealing Test</div>
              <h1 class="heading-xl">${testData.title}</h1>
              <p class="study-title-line">${testData.intro}</p>
            </div>
            <aside class="study-progress-card">
              <div class="study-progress-head">
                <strong>Test Questions</strong>
                <span>${testData.questions.length} total</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
              <p>Each answer is checked by key words and key ideas, not only exact sentences.</p>
            </aside>
            <div class="study-hero-art">
              <img src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot for Revelation test." />
            </div>
          </div>
        </section>

        <section class="study-content">
          <div class="test-grid">
            ${questionCards}
          </div>

          <div class="study-actions">
            <button class="button-secondary" type="button" data-action="back-revelation">Back to Revelation Sealing</button>
            <button class="button-secondary" type="button" data-action="back-welcome">Back to welcome</button>
          </div>
        </section>
      </section>
    `;

    container.querySelectorAll('.test-card').forEach((card) => {
      const questionNumber = Number(card.dataset.questionNumber);
      const textareas = Array.from(card.querySelectorAll('.test-answer-input'));
      const feedback = card.querySelector('.test-feedback');
      const answerBlock = card.querySelector('.test-answer-block');
      const toggleButton = card.querySelector('[data-action="toggle-model-answer"]');

      card.querySelector('[data-action="mark-answer"]').addEventListener('click', () => {
        const responses = textareas.map((textarea) => textarea.value.trim());
        const hasAnyResponse = responses.some((response) => response.length > 0);

        if (!hasAnyResponse) {
          feedback.textContent = 'Please type an answer before marking.';
          feedback.className = 'test-feedback feedback-wrong';
          return;
        }

        const result = this.evaluateAnswer(questionNumber, responses);
        if (result.passed) {
          feedback.textContent = `Good answer. Key points matched: ${result.matched.join(', ')}. Score: ${result.score}%.`;
          feedback.className = 'test-feedback feedback-correct';
        } else {
          feedback.textContent = `Keep going. Missing key points: ${result.missing.join(', ')}. Score: ${result.score}%.`;
          feedback.className = 'test-feedback feedback-wrong';
        }
      });

      toggleButton.addEventListener('click', () => {
        const isHidden = answerBlock.classList.contains('test-answer-block-hidden');
        answerBlock.classList.toggle('test-answer-block-hidden', !isHidden);
        toggleButton.textContent = isHidden ? 'Hide guide answer' : 'Show guide answer';
      });
    });

    container.querySelector('[data-action="back-revelation"]').addEventListener('click', () => {
      Router.showRevelationSealing();
    });

    container.querySelector('[data-action="back-welcome"]').addEventListener('click', () => {
      Router.showWelcome();
    });
  },
};
