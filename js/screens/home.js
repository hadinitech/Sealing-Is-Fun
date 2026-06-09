/*
  Render the home screen with verse cards and progress summary.
*/

const HomeScreen = {
  render(container, progress) {
    const completedCount = Object.values(progress.verses).filter((verseState) => verseState.completedSteps.length >= 8).length;
    const completeText = `${completedCount}/${APP_DATA.verses.length} completed`;
    const progressPercent = Math.round((completedCount / APP_DATA.verses.length) * 100);

    const cards = APP_DATA.verses.map((verse) => {
      const state = progress.verses[verse.id];
      const stepCount = state.completedSteps.length;
      const status = stepCount === 0 ? 'Not Started' : stepCount >= 8 ? 'Completed' : 'In Progress';
      const progressValue = Math.round((stepCount / 8) * 100);
      const buttonLabel = stepCount > 0 && stepCount < 8 ? 'Continue' : 'Start Journey';

      return `
        <article class="card verse-card" data-verse-id="${verse.id}" data-status="${status.toLowerCase().replace(' ', '-')}">
          <div class="verse-card-head">
            <div class="card-reference">
              <strong>${verse.reference}</strong>
              <div class="status-label">
                <span class="status-dot"></span>
                <span>${status}</span>
              </div>
            </div>
            <span class="card-paw" aria-hidden="true"></span>
          </div>
          <div class="card-content">
            <h2>${verse.title}</h2>
            <p>${verse.explanation}</p>
          </div>
          <div class="verse-card-meta">
            <div class="progress-summary">
              <div class="progress-bar"><div class="progress-fill" style="width: ${progressValue}%"></div></div>
              <div class="progress-counter"><strong>${stepCount}/8 steps complete</strong></div>
            </div>
            <div class="card-actions">
              <button class="button-primary verse-start" type="button" aria-label="${buttonLabel} ${verse.reference}">${buttonLabel}</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = `
      <section class="home-shell">
        <section class="home-hero">
          <div class="home-hero-inner home-section">
            <div class="hero-copy">
              <div class="hero-brand">
                <img src="assets/images/Logo.png" alt="" />
                <span>The Scroll and the Lamb</span>
              </div>
              <div class="hero-copy-main">
                <h1 class="heading-xl">The Scroll and the Lamb</h1>
                <p class="hero-subtitle">Learn Scripture.<br />Understand Scripture.<br />Remember Scripture.</p>
                <div class="hero-gold-line" aria-hidden="true"></div>
              </div>
            </div>
            <div class="hero-visual">
              <img class="hero-bunny" src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot holding Scripture." />
            </div>
            <aside class="home-status">
              <div class="home-status-header">
                <strong>Revelation 5:1 to 8 Progress</strong>
                <span class="progress-counter">${completeText}</span>
              </div>
              <div class="progress-ring" style="--progress: ${progressPercent};">
                <div class="progress-ring-value">${progressPercent}%</div>
              </div>
              <div class="progress-summary">
                <div class="progress-bar"><div class="progress-fill" style="width: ${progressPercent}%"></div></div>
                <div class="progress-counter">${completeText}</div>
              </div>
              <button class="button-secondary reset-progress" type="button">Reset Progress</button>
            </aside>
          </div>
          <div class="hero-wave" aria-hidden="true"></div>
        </section>
        <section class="home-cards-section home-section">
          <div class="section-intro">
            <div class="section-kicker">Scripture Journey</div>
            <h2 class="heading-md">Choose a Verse to Begin</h2>
            <p>Each verse has a step by step journey to help you learn, understand, and remember.</p>
          </div>
          <div class="home-cards">${cards}</div>
        </section>
        <section class="quote-section home-section">
          <div class="quote-card">
            <img class="quote-bunny" src="assets/images/Hero Bunny.png" alt="" />
            <div class="quote-content">
              <blockquote>"Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel."</blockquote>
              <p>Revelation 7:4</p>
            </div>
            <div class="quote-paw" aria-hidden="true"></div>
          </div>
        </section>
      </section>
    `;

    container.querySelectorAll('.verse-card').forEach((card) => {
      const verseId = Number(card.dataset.verseId);
      card.addEventListener('click', (event) => {
        if (event.target.closest('.verse-start')) {
          return;
        }
        Router.showVerse(verseId);
      });
    });

    container.querySelectorAll('.verse-start').forEach((button) => {
      button.addEventListener('click', (event) => {
        const verseId = Number(event.currentTarget.closest('.verse-card').dataset.verseId);
        Router.showVerse(verseId);
      });
    });

    const resetButton = container.querySelector('.reset-progress');
    resetButton.addEventListener('click', () => {
      const confirmed = window.confirm('Reset all progress and begin again?');
      if (confirmed) {
        StorageHelper.resetProgress();
        Router.showHome();
      }
    });
  },
};
