/*
  Render the app welcome experience and route users into the current or upcoming journey.
*/

const WelcomeScreen = {
  render(container) {
    container.innerHTML = `
      <section class="welcome-shell">
        <section class="welcome-hero">
          <div class="welcome-inner">
            <div class="welcome-copy">
              <div class="welcome-copy-main">
                <div class="welcome-kicker">Choose your journey</div>
                <h1 class="heading-xl">Welcome</h1>
                <blockquote class="welcome-verse">"Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel."</blockquote>
                <p class="welcome-verse-reference">Revelation 7:4</p>
              </div>
            </div>
            <div class="welcome-visual">
              <img src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot welcoming the learner." />
            </div>
          </div>
        </section>

        <section class="welcome-options">
          <article class="welcome-card card">
            <h2>Sealing Exam</h2>
            <p>This is our weekly sealing exam, so you can practice, memorize your sealing exam.</p>
            <button class="button-primary welcome-action" type="button" data-action="sealing-exam">Enter Sealing Exam</button>
          </article>

          <article class="welcome-card welcome-card-muted card">
            <h2>Revelation Sealing</h2>
            <p>This is the Revelation Sealing in chronological order, starting from Revelation 1 and going forward on the weeks that we will not be writing the weekly sealing exams.</p>
            <button class="button-secondary welcome-action" type="button" data-action="revelation-sealing">View Revelation Sealing</button>
          </article>
        </section>
      </section>
    `;

    container.querySelector('[data-action="sealing-exam"]').addEventListener('click', () => {
      Router.startSealingExam();
    });

    container.querySelector('[data-action="revelation-sealing"]').addEventListener('click', () => {
      Router.showRevelationSealing();
    });
  },

  renderRevelationPreview(container) {
    container.innerHTML = `
      <section class="welcome-shell">
        <section class="welcome-preview card">
          <div class="welcome-preview-copy">
            <div class="welcome-kicker">Revelation 7:4</div>
            <h1 class="heading-md">Revelation Sealing</h1>
            <p>Choose how you want to begin this journey. You can first study the sealing material, or go on to write the sealing test.</p>
          </div>
          <div class="welcome-preview-art">
            <img src="assets/images/Hero Bunny.png" alt="The Scroll and the Lamb bunny mascot." />
          </div>
        </section>

        <section class="welcome-options welcome-options-revelation">
          <article class="welcome-card card">
            <span class="welcome-card-tag">Part one</span>
            <h2>Study the Sealing Material</h2>
            <p>Read and learn the teaching content that prepares the learner for the sealing test.</p>
            <button class="button-primary welcome-action" type="button" data-action="study-sealing-material">Open Study Material</button>
          </article>

          <article class="welcome-card welcome-card-muted card">
            <span class="welcome-card-tag">Part two</span>
            <h2>Write the Sealing Test</h2>
            <p>Move into the test section for Revelation Sealing once the study material is complete.</p>
            <button class="button-secondary welcome-action" type="button" data-action="write-sealing-test">Open Sealing Test</button>
          </article>
        </section>

        <div class="welcome-preview-actions welcome-preview-actions-centered">
          <button class="button-secondary" type="button" data-action="sealing-exam">Go to Sealing Exam</button>
          <button class="button-secondary" type="button" data-action="back-welcome">Back to welcome</button>
        </div>
      </section>
    `;

    container.querySelector('[data-action="study-sealing-material"]').addEventListener('click', () => {
      Router.showRevelationStudy();
    });

    container.querySelector('[data-action="write-sealing-test"]').addEventListener('click', () => {
      Router.showRevelationTest();
    });

    container.querySelector('[data-action="sealing-exam"]').addEventListener('click', () => {
      Router.startSealingExam();
    });

    container.querySelector('[data-action="back-welcome"]').addEventListener('click', () => {
      Router.showWelcome();
    });
  },
};
