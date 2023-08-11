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
    background: isDraggingOver ? "lightblue" : "white",
    padding: grid,
    //width: 250,


});

function TaskList({el,ind}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(el.name);
    const cards = useSelector((state) => state.userData.cards)
    const { user } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(setCards(el._id))
        console.log('reloaded')
    },[])

    const addCard = (name) =>{
        var filteredCards = cards.filter(card => card.listId == el._id)
        var lastPos = filteredCards.length == 0 ? 0 : filteredCards.toSorted((a, b) => (a.position > b.position) ? 1 : -1)[cards.length-1].position
        const newCard = {
            name: name,
            listId: el._id,
            position: lastPos+1024,
            members: [user.username],
            description: "",
            dueDate: ""
          }
          console.log(newCard)
          dispatch(addNewCard(newCard))
          .then(() => {
            console.log('changed')
            //dispatch(switchChange())
            //navigate('/projects')
        })
        .catch((error) => {
            console.log(error)
        })
    }



    return(
        <div className='bg-secondary rounded border m-2 mt-4 col-md-2'>
            <Row className='m-0'>
                <h4 className='text-center col-md-10'>{title}</h4>
                <AddTaskModal />
            </Row>
            
            <CustomScroller className='ListHeight'>
                <Droppable droppableId={el._id}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    className='m-2 rounded'
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    >
                        {cards.filter(card => card.listId == el._id).sort((a, b) => (a.position > b.position) ? 1 : -1).map((item, index) => (
                            <Task key={item._id} item={item} index={index}/>
                        ))}
                        
                    {   provided.placeholder}
                    </div>
                )}
                </Droppable>
                <AddCardInList addNewCard={addCard} />
            </CustomScroller>
        </div>
    )
}

export default TaskList;