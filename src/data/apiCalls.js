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
      console.log(data)
      return data.results;
    });
};
