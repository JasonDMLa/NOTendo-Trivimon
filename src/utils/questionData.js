import { getData } from "../data/apiCalls";

export const questionData = async (amount, category, difficulty) => {
 
    const results = await getData(amount, category, difficulty);
    const questions = results.map((currentQuestion) => ({
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correct_answer,
      incorrectAnswers: currentQuestion.incorrect_answers,
    }));
    return questions;
  };