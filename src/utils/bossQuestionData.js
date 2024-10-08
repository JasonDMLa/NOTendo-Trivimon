import {getBossData } from "../data/apiCalls";

export const bossQuestionData = async (amount, difficulty) => {
  const results = await getBossData(amount, difficulty);
  console.log(results, "<--- results")
  const questions = results.map((currentQuestion) => ({
    question: currentQuestion.question
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&reg/g, "©")
      .replace(/&amp;/g, "&")
      .replace(/&ouml;/g, "ö")
      .replace(/&deg;/g, "°")
      .replace(/&eacute;/g, "é"),
    correctAnswer: currentQuestion.correct_answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&reg/g, "©")
      .replace(/&amp;/g, "&")
      .replace(/&ouml;/g, "ö")
      .replace(/&deg;/g, "°")
      .replace(/&eacute;/g, "é"),
    incorrectAnswers: currentQuestion.incorrect_answers.map((answer) =>
      answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&reg/g, "©")
        .replace(/&amp;/g, "&")
        .replace(/&ouml;/g, "ö")
        .replace(/&deg;/g, "°")
        .replace(/&eacute;/g, "é")
    ),
  }));
  return questions;
};
