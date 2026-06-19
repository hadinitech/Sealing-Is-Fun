/*
  Router manages screen switching and navigation state.
*/

const Router = {
  appElement: null,
  currentVerse: null,

  init() {
    this.appElement = document.getElementById('app');
    this.showWelcome();
  },

  showWelcome() {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    WelcomeScreen.render(this.appElement);
  },

  startSealingExam() {
    const progress = StorageHelper.loadProgress();
    const completedCount = Object.values(progress.verses).filter((verse) => verse.completedSteps.length >= 8).length;

    if (completedCount >= APP_DATA.verses.length) {
      this.showCompletion();
      return;
    }

    this.showHome();
  },

  showRevelationSealing() {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    WelcomeScreen.renderRevelationPreview(this.appElement);
  },

  showRevelationStudy(sectionIndex = 0) {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    RevelationStudyScreen.render(this.appElement, APP_DATA.revelationStudy, sectionIndex);
  },

  showRevelationMemory(sectionIndex = 0, stepIndex = 0) {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    RevelationMemoryScreen.render(this.appElement, APP_DATA.revelationStudy, sectionIndex, stepIndex);
  },

  showRevelationTest() {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    RevelationTestScreen.render(this.appElement, APP_DATA.revelationTest);
  },

  showHome() {
    const progress = StorageHelper.loadProgress();
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    HomeScreen.render(this.appElement, progress);
  },

  showVerse(verseId) {
    const verseData = APP_DATA.verses.find((verse) => verse.id === verseId);
    if (!verseData) {
      this.showHome();
      return;
    }

    this.currentVerse = verseId;
    this.appElement.innerHTML = '';
    VerseScreen.render(this.appElement, verseData);
  },

  showCompletion() {
    this.currentVerse = null;
    this.appElement.innerHTML = '';
    CompletionScreen.render(this.appElement);
  },

  navigateBackHome() {
    this.showHome();
  },
};
