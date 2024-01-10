import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { Droppable } from "react-beautiful-dnd";
import CustomScroller from 'react-custom-scroller';
import Task from './task';
import { Button, Row,Col } from 'react-bootstrap';
import AddTaskModal from './addTaskModal';
import { setCards,addNewCard,updateListData } from '../slices/boardSlice';
import ListEditModal from './listEditModal';
import { formatMoneyUS } from './formatMoney';

const grid = 8;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "rgb(241, 242, 244)",
    padding: grid,
    //width: 250,


});

function TaskList({el,ind,editMode,moveList}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [hideCards, setHideCards] = useState(false);
    const [amount, setAmount] = useState(0);
    const userData = useSelector((state) => state.userData)

    useEffect(() => {
        console.log(el)
        setTitle(el.name)
        setHideCards(el.hideChildren)
        //dispatch(setCards(el._id))
    },[])

    useEffect(() => {
        var total = 0
        userData.cards.filter(card => card.listId == el._id).forEach(item => {
            total+=parseFloat(item.amount)})
        setAmount(total)
    },[userData.cards])

    const addCard = (name) =>{
        var filteredCards = userData.cards.filter(card => card.listId == el._id)
        var lastPos = filteredCards.length == 0 ? 0 : filteredCards.toSorted((a, b) => (a.position > b.position) ? 1 : -1)[filteredCards.length-1].position
        const newCard = {
            name: name,
            listId: el._id,
            position: lastPos+1024,
            amount: 0,
          }
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

    const formatMoney = (a) => {
        return 'Total: '+formatMoneyUS(a)
    }
    const editInfo = (d) => {
        //do this next
        dispatch(updateListData(el._id,d))
        setTitle(d.name)
        setHideCards(d.hideChildren)
        if (parseInt(d.colNum) !== el.colNum){

        }
        
    }



    return(
        <Droppable  droppableId={el._id}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    className='m-1 p-0 rounded bg-light-gray border border-1 shadow'
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    >
        
            <Row className={`m-0 ${hideCards || (userData.cards.filter(card => card.listId == el._id).length === 0)? "border-bottom border-dark" : ""}`}>
                <Col md={1} className='p-0' onClick={() => setHideCards(!hideCards)}><button className={`p-0 border-0 ${hideCards ? "rotate90" : ""}`} >{"▼"}</button></Col>
                <Col md={10} className='p-0'><h4 className='text-center'>{title}</h4></Col>
                <Col md={1} className='p-0 d-flex flex-row-reverse'>{editMode ?
                 <div className='d-flex'>
                    <ListEditModal data={el} update={editInfo}/>
                    <Button onClick={() =>moveList('down',el,el.colNum)} className='btn-sm border' variant='info'>^</Button>
                    <Button onClick={() =>moveList('up',el,el.colNum)} className='btn-sm rotate180 border' variant='info'>^</Button>
                 </div> 
                 : <AddTaskModal  addCard={addCard}/>}</Col>
            </Row>
            <Row className='m-0'>    
                {hideCards ? <></> : userData.cards.filter(card => card.listId == el._id).sort((a, b) => (a.position > b.position) ? 1 : -1).map((item, index) => (
                    <Task key={item._id} item={item} index={index}/>
                ))}
            </Row>
            <Row className='m-0'> 
                <h4 className='text-center fw-bold'>{formatMoney(amount)}</h4>
            </Row>

        
        {   provided.placeholder}
                    </div>
                )}
                </Droppable>
    )
}

export default TaskList;