import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://opentdb.com/",
});

export const getData = (amount, category, difficulty) => {
  return apiCall
    .get(
      `/api.php?amount=${amount.toString()}&category=${category.toString()}&difficulty=${difficulty}&type=multiple`
    )
    .then(({ data }) => {
      return data.results;
    });
};


export const getBossData = (amount, difficulty) => {
  return apiCall
    .get(
      `/api.php?amount=${amount.toString()}&difficulty=${difficulty}&type=multiple`
    )
    .then(({ data }) => {
      console.log(data, "<--- bossdata")
      return data.results;
    });
};
