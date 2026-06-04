/*
  Genesis Light scripture content and learning prompts.
  This file contains the verse metadata and learning items for Genesis 1:1-5.
*/

const APP_DATA = {
  verses: [
    {
      id: 1,
      reference: 'Genesis 1:1',
      title: 'Creator of All',
      verseText: 'In the beginning God created the heavens and the earth.',
      explanation: 'Before anything existed—before people, animals, trees, stars, or even the sky—God was already there. God made everything from nothing.',
      simpleMeaning: 'God is the Creator of everything.',
      fillBlank: {
        prompt: 'In the ______ God created the heavens and the ______.',
        answers: ['beginning', 'earth'],
      },
      meaningQuestion: {
        prompt: 'Which answer best explains this verse?',
        options: [
          'God created everything that exists.',
          'God created only the earth.',
          'God created the world after people existed.',
        ],
        correct: 0,
      },
      wrongTeachingQuestion: {
        prompt: 'Which statement is NOT supported by this verse?',
        options: [
          'God existed before creation.',
          'God created everything.',
          'The universe created itself.',
        ],
        correct: 2,
      },
      ownWordsPrompt: 'Explain Genesis 1:1 in your own words.',
      memoryText: 'In the beginning God created the heavens and the earth.',
    },
    {
      id: 2,
      reference: 'Genesis 1:2',
      title: 'God in the Chaos',
      verseText: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
      explanation: 'The earth was not finished yet. It was empty, dark, and unorganized. But God was there, preparing to create something beautiful.',
      simpleMeaning: 'The world was unfinished, but God was preparing it.',
      fillBlank: {
        prompt: 'Now the earth was ______ and ______.',
        answers: ['formless', 'empty'],
      },
      meaningQuestion: {
        prompt: 'Which answer best explains this verse?',
        options: [
          'The world was unfinished and God was preparing it.',
          'The world was already complete.',
          'People were already living on earth.',
        ],
        correct: 0,
      },
      wrongTeachingQuestion: {
        prompt: 'Which statement is NOT supported by this verse?',
        options: [
          'God was present.',
          'The earth was unfinished.',
          'The earth was already perfect.',
        ],
        correct: 2,
      },
      ownWordsPrompt: 'Explain Genesis 1:2 in your own words.',
      memoryText: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
    },
    {
      id: 3,
      reference: 'Genesis 1:3',
      title: 'Let There Be Light',
      verseText: 'And God said, "Let there be light," and there was light.',
      explanation: 'God did not need tools or materials. He simply spoke, and light appeared.',
      simpleMeaning: 'God\'s words have power.',
      fillBlank: {
        prompt: 'Let there be ______.',
        answers: ['light'],
      },
      meaningQuestion: {
        prompt: 'Which answer best explains this verse?',
        options: [
          'God\'s words have power.',
          'God needed help to create light.',
          'Light already existed before God spoke.',
        ],
        correct: 0,
      },
      wrongTeachingQuestion: {
        prompt: 'Which statement is NOT supported by this verse?',
        options: [
          'God\'s words have power.',
          'God created light.',
          'God needed tools to create light.',
        ],
        correct: 2,
      },
      ownWordsPrompt: 'Explain Genesis 1:3 in your own words.',
      memoryText: 'And God said, "Let there be light," and there was light.',
    },
    {
      id: 4,
      reference: 'Genesis 1:4',
      title: 'Order from Chaos',
      verseText: 'God saw that the light was good, and he separated the light from the darkness.',
      explanation: 'God brought order by separating light from darkness.',
      simpleMeaning: 'God brings order where there is confusion.',
      fillBlank: {
        prompt: 'God saw that the light was ______.',
        answers: ['good'],
      },
      meaningQuestion: {
        prompt: 'Which answer best explains this verse?',
        options: [
          'God brings order where there is confusion.',
          'God prefers light over darkness.',
          'God created light before people.',
        ],
        correct: 0,
      },
      wrongTeachingQuestion: {
        prompt: 'Which statement is NOT supported by this verse?',
        options: [
          'God brings order.',
          'God separated light and darkness.',
          'Darkness controlled the light.',
        ],
        correct: 2,
      },
      ownWordsPrompt: 'Explain Genesis 1:4 in your own words.',
      memoryText: 'God saw that the light was good, and he separated the light from the darkness.',
    },
    {
      id: 5,
      reference: 'Genesis 1:5',
      title: 'Purpose & Identity',
      verseText: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
      explanation: 'God gave names and purpose to what He created.',
      simpleMeaning: 'God gives purpose and identity.',
      fillBlank: {
        prompt: 'God called the light ______ and the darkness ______.',
        answers: ['day', 'night'],
      },
      meaningQuestion: {
        prompt: 'Which answer best explains this verse?',
        options: [
          'God gives purpose and identity.',
          'God likes naming things.',
          'Day and night existed before God.',
        ],
        correct: 0,
      },
      wrongTeachingQuestion: {
        prompt: 'Which statement is NOT supported by this verse?',
        options: [
          'God named day and night.',
          'God gives purpose.',
          'Time existed outside God\'s authority.',
        ],
        correct: 2,
      },
      ownWordsPrompt: 'Explain Genesis 1:5 in your own words.',
      memoryText: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
    },
  ],
};
