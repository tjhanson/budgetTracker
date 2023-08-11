import { createSlice } from '@reduxjs/toolkit'
import boardService from '../services/board.service';

const boardSlice = createSlice({
    name: 'tasks',
    initialState: {
        boards:[],
        lists:[],
        cards:[],
        changeMade: false,
    },
    reducers:{
        setBoardState: (state,{payload}) => {
            state.boards = payload
            state.cards = []
        },
        setListsState: (state,{payload}) => {
            state.lists = payload
        },
        addToCardsState: (state,{payload}) => {
            console.log(payload)
            state.cards = [...state.cards,...payload]
        },
        updateCardPosition: (state,{payload}) => {
            console.log(payload)
            state.cards = state.cards.map(
                card => card._id == payload._id ? {...card, position:payload.position} : card
            )
            
        },
        updateCardList: (state,{payload}) => {
            console.log(payload)
            state.cards = state.cards.map(
                card => card._id == payload._id ? {...card, listId:payload.listId,position:payload.position} : card
            )
            console.log(state.cards)
        },
        switchChange: (state) => {
            state.changeMade = !state.changeMade
        }
        

    },
})




export default boardSlice.reducer

export const { addToCardsState,updateCardPosition,updateCardList,setBoardState,setListsState,switchChange } = boardSlice.actions

//export const currentSite = (state) => state.site.currentSite

const calcNewPos = (items,result) => {
    const destPos = result.destination.index
    console.log(destPos)
    var itemLen = result.destination.droppableId == result.source.droppableId ? items.length-1 :items.length
    console.log(itemLen)
    //destination is first in list
    if (items.length == 0){
        return 1024
    }
    else if (destPos == 0){
        return items[0].position/2
    }
    //destination is last in list
    else if(destPos == itemLen){
        return items[itemLen-1].position + 1024
    }
    //destination is in middle of two cards
    return (items[destPos].position+items[destPos-1].position)/2
}

export const reorderCards = (cards,result) => (dispatch) =>{
    let cardsSorted = cards.filter(card => card.listId == result.destination.droppableId).sort((a, b) => (a.position > b.position) ? 1 : -1)
    var newPos = calcNewPos(cardsSorted,result)
    var updateData = {"position":newPos}
    return boardService.updateCard(result.draggableId,updateData).then(
        (response) => {
            console.log(response)
        dispatch(updateCardPosition(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    
}

export const moveCard = (cards,result) => (dispatch) =>{
    let cardsSorted = cards.filter(card => card.listId == result.destination.droppableId).sort((a, b) => (a.position > b.position) ? 1 : -1)
    var newPos = calcNewPos(cardsSorted,result)
    var updateData = {
        "position":newPos,
        "listId":result.destination.droppableId
    }
    return boardService.updateCard(result.draggableId,updateData).then(
        (response) => {
            console.log(response)
        dispatch(updateCardList(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    
}

export const setCards = (listId) =>(dispatch) => {
    return boardService.getCardsById(listId).then(
        (response) => {
        dispatch(addToCardsState(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }


const setLists = (boardId) =>(dispatch) => {
    return boardService.getListsById(boardId).then(
        (response) => {
            console.log(response)
        dispatch(setListsState(response));
        //setLists(response[0]['_id'])
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }

    export const setBoards = (userId) =>(dispatch) => {
        return boardService.getBoardsById(userId).then(
            (response) => {
            dispatch(setBoardState(response));
            dispatch(setLists(response[0]['_id']))
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }


    
export const updateProjectByID = (id,updateData) =>(dispatch) => {
    console.log(updateData)
    return boardService.updateProject(id,updateData).then(
        (response) => {
        console.log(response)
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }

    export const addNewCard = (updateData) =>(dispatch) => {
        console.log(updateData)
        return boardService.addCard(updateData).then(
            (response) => {
            console.log(response)
            dispatch(addToCardsState([response]))
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }