/*
  Storage utilities for saving and restoring user progress.
*/

const STORAGE_KEY = 'genesisLightProgress';

const StorageHelper = {
  getInitialProgress() {
    const initial = {
      selectedVerseId: null,
      verses: {},
    };

    APP_DATA.verses.forEach((verse) => {
      initial.verses[verse.id] = {
        completedSteps: [],
        reflection: '',
        memoryCheckAttempts: [],
      };
    });

    return initial;
  },

  loadProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const initial = this.getInitialProgress();
        this.saveProgress(initial);
        return initial;
      }
      const parsed = JSON.parse(stored);
      const progress = Object.assign(this.getInitialProgress(), parsed);
      progress.verses = Object.assign(this.getInitialProgress().verses, progress.verses);
      return progress;
    } catch (error) {
      console.warn('Could not parse saved progress', error);
      const initial = this.getInitialProgress();
      this.saveProgress(initial);
      return initial;
    }
  },

  saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  resetProgress() {
    const initial = this.getInitialProgress();
    this.saveProgress(initial);
    return initial;
  },

  getVerseProgress(verseId) {
    const progress = this.loadProgress();
    return progress.verses[verseId] || { completedSteps: [], reflection: '', memoryCheckAttempts: [] };
  },

  markStepComplete(verseId, stepKey) {
    const progress = this.loadProgress();
    const verseProgress = progress.verses[verseId];
    if (!verseProgress.completedSteps.includes(stepKey)) {
      verseProgress.completedSteps.push(stepKey);
    }
    this.saveProgress(progress);
    return verseProgress;
  },

  saveReflection(verseId, reflection) {
    const progress = this.loadProgress();
    progress.verses[verseId].reflection = reflection;
    this.saveProgress(progress);
  },

  saveMemoryCheckAttempt(verseId, attempt) {
    const progress = this.loadProgress();
    progress.verses[verseId].memoryCheckAttempts.push({ entered: attempt, time: new Date().toISOString() });
    this.saveProgress(progress);
  },

  completeVerse(verseId) {
    const progress = this.loadProgress();
    const allSteps = ['read', 'understand', 'fill', 'meaning', 'wrongTeaching', 'ownWords', 'memoryCheck', 'mastered'];
    progress.verses[verseId].completedSteps = Array.from(new Set([...progress.verses[verseId].completedSteps, ...allSteps]));
    this.saveProgress(progress);
  },
};
