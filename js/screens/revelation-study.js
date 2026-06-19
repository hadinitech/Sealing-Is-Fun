/*
  Render the Revelation Sealing study material screen.
*/

const RevelationStudyScreen = {
  render(container, studyData, sectionIndex = 0) {
    const safeIndex = Math.max(0, Math.min(sectionIndex, studyData.sections.length - 1));
    const section = studyData.sections[safeIndex];
    const totalSections = studyData.sections.length;
    const progressPercent = Math.round(((safeIndex + 1) / totalSections) * 100);

    container.innerHTML = `
      <section class="study-shell">
        <section class="study-hero">
          <div class="study-hero-inner">
            <div class="study-hero-copy">
              <div class="study-kicker">Study the Sealing Material</div>
              <h1 class="heading-xl">${studyData.title}</h1>
              <p class="study-title-line">${studyData.titleOfTitle}</p>
            </div>
            <aside class="study-progress-card">
              <div class="study-progress-head">
                <strong>Journey Progress</strong>
                <span>${safeIndex + 1} of ${totalSections}</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width: ${progressPercent}%"></div></div>
              <p>${section.verseLabel} is the current study verse.</p>
            </aside>
            <div class="study-hero-art">
              <img src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot for Revelation study." />
            </div>
          </div>
        </section>

        <section class="study-content">
          <article class="study-summary card">
            <span class="study-block-label">Summary</span>
            <p>${studyData.summary}</p>
          </article>

          <article class="study-section card">
            <div class="study-section-head">
              <span class="study-section-kicker">${section.verseLabel}</span>
              <h2>${section.verseText}</h2>
            </div>
            <div class="study-explanations">
              ${section.explanations.map((explanation) => `
                <div class="study-explanation-item">
                  <p>${explanation}</p>
                </div>
              `).join('')}
            </div>
            <div class="study-section-actions">
              <button class="button-primary" type="button" data-action="memorise-verse">Memorise Verse</button>
            </div>
          </article>

          <div class="study-actions">
            <button class="button-secondary" type="button" data-action="back-revelation">Back to Revelation Sealing</button>
            <button class="button-secondary" type="button" data-action="back-welcome">Back to welcome</button>
          </div>
        </section>
      </section>
    `;

    container.querySelector('[data-action="memorise-verse"]').addEventListener('click', () => {
      Router.showRevelationMemory(safeIndex, 0);
    });

    container.querySelector('[data-action="back-revelation"]').addEventListener('click', () => {
      Router.showRevelationSealing();
    });

    container.querySelector('[data-action="back-welcome"]').addEventListener('click', () => {
      Router.showWelcome();
    });
  },
};
