/*
  Render the completion screen once all verses are mastered.
*/

const CompletionScreen = {
  render(container) {
    const totalVerses = APP_DATA.verses.length;
    const totalSteps = totalVerses * 8;

    container.innerHTML = `
      <section class="completion-shell">
        <section class="completion-hero card">
          <div class="completion-hero-copy">
            <div class="completion-badge">Genesis 1:1-5 Mastered</div>
            <h1 class="heading-xl">Learned. Understood. Remembered.</h1>
            <p>You have completed the full Genesis Light Scripture journey and carried Genesis 1:1-5 all the way from reading to remembrance.</p>
            <div class="completion-divider" aria-hidden="true"></div>
          </div>
          <div class="completion-hero-art">
            <img src="assets/images/Hero Bunny.png" alt="Genesis Light bunny celebrating completion." />
          </div>
        </section>

        <section class="completion-summary">
          <article class="completion-panel card">
            <span class="completion-panel-label">Journey Complete</span>
            <p><strong>Well done.</strong> Your progress is saved, and every verse in this collection has been mastered. Return home any time to revisit a verse and enjoy the experience again.</p>
          </article>

          <div class="completion-stats">
            <article class="completion-stat card">
              <span>Verses Mastered</span>
              <strong>${totalVerses}</strong>
            </article>
            <article class="completion-stat card">
              <span>Steps Completed</span>
              <strong>${totalSteps}</strong>
            </article>
            <article class="completion-stat card">
              <span>Scripture Focus</span>
              <strong>Genesis 1</strong>
            </article>
          </div>

          <article class="completion-quote card">
            <blockquote>"Your word is a lamp to my feet and a light to my path."</blockquote>
            <p>Psalm 119:105</p>
          </article>
        </section>

        <div class="completion-actions">
          <button class="button-primary back-home" type="button">Back to home</button>
          <button class="button-secondary reset-progress" type="button">Reset all progress</button>
        </div>
      </section>
    `;

    container.querySelector('.back-home').addEventListener('click', () => Router.showHome());
    container.querySelector('.reset-progress').addEventListener('click', () => {
      const confirmed = window.confirm('Reset all progress and return to the beginning?');
      if (confirmed) {
        StorageHelper.resetProgress();
        Router.showHome();
      }
    });
  },
};
