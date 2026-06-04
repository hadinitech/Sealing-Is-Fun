/*
  Router manages screen switching and navigation state.
*/

const Router = {
  appElement: null,
  currentVerse: null,

  init() {
    this.appElement = document.getElementById('app');
    this.showHome();
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
