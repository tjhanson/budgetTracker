import React, {useState, useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { DragDropContext } from "react-beautiful-dnd";

import { setBoards,reorderCards,moveCard } from '../slices/boardSlice';
import TaskList from './list';
import AddNewList from './addNewList';


const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};



function Board() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const userData = useSelector((state) => state.userData)
    const [state, setState] = useState();

    useEffect(() => {
        dispatch(setBoards(user._id))
    },[])



    function onDragEnd(result) {
        console.log(result)
        const { source, destination } = result;

      // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        if (sInd === dInd && source.index != destination.index) {
            dispatch(reorderCards(userData.cards,result))
        } else {
            dispatch(moveCard(userData.cards,result))
            // const result = move(state[sInd], state[dInd], source, destination);
            // const newState = [...state];
            // newState[sInd] = result[sInd];
            // newState[dInd] = result[dInd];
            // console.log(newState)
            // setState(newState);
        }
    }


    function addNewList(name){
        setState([...state, []]);
    }

    return(
        <div className="overflowPlsWork" style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {userData.lists.toSorted((a, b) => (a.position > b.position) ? 1 : -1).map((el, ind) => (
                    <TaskList el={el} ind={ind} key={ind}/>
                ))}
            </DragDropContext>
            <AddNewList newList={addNewList} />
                
        </div>
  );
    
}

export default Board;