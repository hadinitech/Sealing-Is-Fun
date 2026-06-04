/*
  Main application entry point. Initializes the app and refreshes UI state.
*/

document.addEventListener('DOMContentLoaded', () => {
  const progress = StorageHelper.loadProgress();
  const completedCount = Object.values(progress.verses).filter((verse) => verse.completedSteps.length >= 8).length;

  if (completedCount >= APP_DATA.verses.length) {
    Router.showCompletion();
  } else {
    Router.init();
  }
});
