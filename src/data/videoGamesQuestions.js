import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

const getAllVideoGameQuestions = () => {
  return Promise.all([
    // questionData(7, 15, "easy"),
    questionData(15, 15, "medium"),
    // questionData(3, 15, "hard"),
  ]).then((data) => {
    return data;
  });
};

export const allVideoGameQuestions = await getAllVideoGameQuestions().then(
  (data) => {
    return shuffleArray(data.flat(Infinity));
  }
);

