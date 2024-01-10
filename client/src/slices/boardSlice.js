import { createSlice } from '@reduxjs/toolkit'
import boardService from '../services/board.service';
import { isEqual } from './helperFunctions';

const boardSlice = createSlice({
    name: 'tasks',
    initialState: {
        board:{'name':''},
        lists:[],
        cards:[],
        projects:[],
        Overview: '',
    },
    reducers:{
        setBoardState: (state,{payload}) => {
            state.board = payload
            state.cards = []
        },
        setListsState: (state,{payload}) => {
            state.lists = payload
        },
        addToCardsState: (state,{payload}) => {
            state.cards = [...state.cards,...payload]
        },
        addToListsState: (state,{payload}) => {
            state.lists = [...state.lists,...payload]
        },
        addToProjectsState: (state,{payload}) => {
            state.projects = [...state.projects,...payload]
        },
        updateCardPosition: (state,{payload}) => {
            state.cards = state.cards.map(
                card => card._id == payload._id ? {...card, position:payload.position} : card
            )
            
        },
        updateCardList: (state,{payload}) => {
            state.cards = state.cards.map(
                card => card._id == payload._id ? {...card, ...payload} : card
            )
        },
        updateListState: (state,{payload}) => {
            state.lists = state.lists.map(
                list => list._id == payload._id ? {...list, ...payload} : list
            )
            console.log(state.lists)
        },
        removeFromCardList: (state,{payload}) => {
            state.cards = state.cards.filter(card => card._id !== payload)
        },
        setOverview: (state,val) => {
            console.log(val)
            state.Overview = val.payload
        }
        

    },
})




export default boardSlice.reducer

export const { addToProjectsState,addToListsState,addToCardsState,updateCardPosition,updateCardList,setBoardState,setListsState,setOverview,removeFromCardList,updateListState } = boardSlice.actions

//export const currentSite = (state) => state.site.currentSite

const calcNewPos = (items,result) => {
    const destPos = result.destination.index
    var itemLen = result.destination.droppableId === result.source.droppableId ? items.length-1 :items.length
    //destination is first in list
    if (items.length == 0){
        return 1024
    }
    else if (destPos == 0){
        return items[0].position/2
    }
    //destination is last in list
    else if(destPos == itemLen){
        return items.pop().position + 1024
    }
    //destination is in middle of two cards
    if (result.destination.droppableId !== result.source.droppableId){
        return (items[destPos].position+items[destPos-1].position)/2
    }
    else{
        if(result.destination.index > result.source.index){
            return (items[destPos].position+items[destPos+1].position)/2
        }
        return (items[destPos].position+items[destPos-1].position)/2
    }
    
}

export const reorderCards = (cards,result) => (dispatch) =>{
    let cardsSorted = cards.filter(card => card.listId == result.destination.droppableId).sort((a, b) => (a.position > b.position) ? 1 : -1)
    var newPos = calcNewPos(cardsSorted,result)
    var updateData = {"position":newPos}
    return boardService.updateCard(result.draggableId,updateData).then(
        (response) => {
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
        dispatch(updateCardList(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    
}

export const moveList = (filteredLists,result) => (dispatch) =>{
    var newPos = calcNewPos(filteredLists,result)
    var updateData = {
        "position":newPos,
        "listId":result.destination.droppableId
    }
    return boardService.updateList(result.id,updateData).then(
        (response) => {
        dispatch(updateListState(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    
}

export const updateCardData = (id,updateData) => (dispatch) =>{
    return boardService.updateCard(id,updateData).then(
        (response) => {
        dispatch(updateCardList(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });

    
}

export const updateListData = (id,updateData) => (dispatch) =>{
    return boardService.updateList(id,updateData).then(
        (response) => {
        dispatch(updateListState(response));
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });

    
}

export const updateBoardData = (id,updateData) => (dispatch) =>{
    return boardService.updateBoard(id,updateData).then(
        (response) => {
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });

    
}

export const setProjects = () =>(dispatch) => {
    return boardService.getBoardsByYear('project').then(
        (response) => {
            console.log(response)
            if (response.length > 0)
                dispatch(addToProjectsState(response))
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
        dispatch(setListsState(response));
        response.forEach(li => {
            dispatch(setCards(li._id))
        });
        //setLists(response[0]['_id'])
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }

    export const setBoards = (name) =>(dispatch) => {
        return boardService.getBoardsByName(name).then(
            (response) => {
            dispatch(setBoardState(response[0]));
            dispatch(setLists(response[0]['_id']))
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }


    
export const updateProjectByID = (id,updateData) =>(dispatch) => {
    return boardService.updateProject(id,updateData).then(
        (response) => {
        return Promise.resolve()
        },
        (error) =>{
        console.log(error.response)
        return Promise.reject();
        });
    }

    export const addNewCard = (updateData) =>(dispatch) => {
        return boardService.addCard(updateData).then(
            (response) => {
            dispatch(addToCardsState([response]))
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }

    export const addNewList = (updateData) =>(dispatch) => {
        return boardService.addList(updateData).then(
            (response) => {
            dispatch(addToListsState([response]))
            return Promise.resolve()
            },
            (error) =>{
            console.log(error.response)
            return Promise.reject();
            });
        }

        export const addNewBoard = (updateData) =>(dispatch) => {

            return boardService.addBoard(updateData).then(
                (response) => {
                dispatch(addToProjectsState([response]))
                return Promise.resolve()
                },
                (error) =>{
                console.log(error.response)
                return Promise.reject();
                });
            }

        export const deleteCard = (draggableId) => (dispatch) =>{
            return boardService.removeCard(draggableId).then(
                (response) => {
                dispatch(removeFromCardList(draggableId));
                return Promise.resolve()
                },
                (error) =>{
                console.log(error.response)
                return Promise.reject();
                });
            
        }