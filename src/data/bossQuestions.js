import { bossQuestionData } from "../utils/bossQuestionData.js";

import { shuffleArray } from "../utils/shuffleArray.js";


export const getAllBossQuestions = () => {
  return Promise.all([
    // questionData(7, 23, "easy"),
    bossQuestionData(18, "medium"),
    // questionData(3, 23, "hard"),
  ])
    .then((data) => {
      return data;
    })
    .then((data) => {
      return shuffleArray(data.flat(Infinity));
    });
};