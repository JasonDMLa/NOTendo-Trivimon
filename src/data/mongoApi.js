import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://mongodatabase-pnz0.onrender.com/",
});

export const findUser = (username, password) => {
    const response =apiCall.get(`/api/findUser`, {
      params: { username, password },
    });
    return response; // This will return the Axios response
  };

  

  export const postUser = ( username, password) => {
    return apiCall
      .post(`/api/users`,{username,password})
      .then(({ data }) => {
        return data;
      });
  };

  export const getAllUsers = () => {
    return apiCall
    .get(`/api/users`)
    .then(({data})=>{
        return data
    })
  }


  export const updateUser = (username, saveData) => {
    console.log(saveData, username)
    return apiCall.patch(`/api/users/${username}`, saveData)
    .then(({data})=>{
      console.log(data)
      return data
    })
  }


