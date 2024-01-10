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

const getAllBoards = () => {
  return axios
    .get(API_URL+`/boards/`,)
    .then((response) => {
        return response.data;
    });
};

const getBoardsByName = (name) => {
  return axios
    .get(API_URL+`/boards/${name}`,)
    .then((response) => {
        return response.data;
    });
};

const getBoardsByYear = (year) => {
  return axios
    .get(API_URL+`/boards/byYear/${year}`,)
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

const updateList = (id,updateData) => {
  return axios
    .put(API_URL+`/lists/${id}`, updateData, {})
    .then((response) => {
        return response.data;
    });
};

const updateBoard = (id,updateData) => {
  return axios
    .put(API_URL+`/boards/${id}`, updateData, {})
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

const removeCard = (id) => {
  return axios
    .delete(API_URL+`/cards/${id}`)
    .then((response) => {
        return response.data;
    });
};

const addList = (newList) => {
  return axios
  .post(API_URL+'/lists', newList, {
    
    
  })
  .then((response) => {
      return response.data;
  });
}

const addBoard = (newBoard) => {
  console.log(newBoard)
  return axios
  .post(API_URL+'/boards', newBoard, {
    
    
  })
  .then((response) => {
      return response.data;
  });
}

export default {
  getAllBoards,addBoard,addList,getCardsById,getListsById,getBoardsByName,getBoardsByYear,updateCard,addCard,removeCard,updateList,updateBoard
  };