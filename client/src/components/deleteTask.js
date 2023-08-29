import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { Droppable } from "react-beautiful-dnd";
import CustomScroller from 'react-custom-scroller';
import Task from './task';
import { Button, Row } from 'react-bootstrap';
import AddTaskModal from './addTaskModal';
import { setCards,addNewCard } from '../slices/boardSlice';
import AddCardInList from './addCardInList';

const grid = 8;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "rgb(220, 53, 69)",
    padding: grid,
    //width: 250,


});

function DeleteArea() {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.userData.cards)
    const { user } = useSelector(state => state.users);




    return(
         <Droppable droppableId={'delete'}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    className='m-2 rounded bg-danger '
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    >

                        <Row className='m-0'>
                        <h4 className='text-center'>Delete</h4>
                    </Row>                        
                    {   provided.placeholder}
                    </div>
                )}
                    
                </Droppable>

    )
}

export default DeleteArea;