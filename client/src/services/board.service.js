import axios from "axios";
import qs from "qs"

const API_URL = "http://127.0.0.1:8080/board/";


const getProjectsByList = (projects) => {
  return axios
    .get(API_URL+'/bylist', {
      params:{projects:projects.reduce((f, s) => `${f},${s}`)},
      
    })
    .then((response) => {
        return response.data;
    });
};

const getBoardsById = (userId) => {
  return axios
    .get(API_URL+`/boards/${userId}`,)
    .then((response) => {
        return response.data;
    });
};
const getListsById = (boardId) => {
  return axios
    .get(API_URL+`/lists/${boardId}`,)
    .then((response) => {
        return response.data;
    });
};
const getCardsById = (listId) => {
  return axios
    .get(API_URL+`/cards/${listId}`,)
    .then((response) => {
        return response.data;
    });
};

const updateCard = (id,updateData) => {
  return axios
    .put(API_URL+`/cards/${id}`, updateData, {})
    .then((response) => {
        return response.data;
    });
};


const addCard = (newCard) => {
  return axios
    .post(API_URL+'/cards', newCard, {
      
      
    })
    .then((response) => {
        return response.data;
    });
};

export default {
  getCardsById,getListsById,getBoardsById,updateCard,addCard
  };