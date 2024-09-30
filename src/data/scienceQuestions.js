import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

const getScienceQuestions = () => {
  return Promise.all([
    // questionData(7, 17, "easy"),
    questionData(15, 17, "medium"),
    // questionData(3, 17, "hard"),
  ]).then((data) => {
    return data;
  });
};

export const allScienceQuestions = await getScienceQuestions().then((data) => {
  return shuffleArray(data.flat(Infinity));
});

