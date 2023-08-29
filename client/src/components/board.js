import React, {useState, useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { DragDropContext } from "react-beautiful-dnd";
import { Col,Container,Row,Button } from 'react-bootstrap';

import { setBoards,reorderCards,moveCard,addNewList,deleteCard,moveList } from '../slices/boardSlice';
import TaskList from './list';
import AddNewList from './addNewList';
import DeleteArea from './deleteTask';
import BatchImport from './batchImport';




function Board() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData)
    const [editBaskets,setEditBaskets] = useState(false)
    const [title,setTitle] = useState("")
    const [lists,setLists] = useState([])
    const [total,setTotal] = useState([0,0,0,0])

    var titleArray = ['Monthly','Food','Hobbies','Other']

    useEffect(() => {
        setTitle(userData.board.name)
    },[userData.board])

    useEffect(() => {
        //console.log('changed')
        setLists(userData.lists)
    },[userData.lists])

    useEffect(() => {
        var tempTotals = [0,0,0,0]
        for (let index = 0; index < titleArray.length; index++) {
            let colLists = lists.map(
                li => li._colNum === index ? li._id : null
            )
            var total = 0
            userData.cards.filter(card => colLists.includes(card.listId)).forEach(item => {
                total+=parseFloat(item.amount)})
            tempTotals[index] = total
                
        }
        setTotal(tempTotals)
        
        
    },[userData.cards])

    const toggleEditBaskets = () => {
        setEditBaskets(!editBaskets)
    }



    function onDragEnd(result) {
        const { source, destination } = result;
      // dropped outside the list
        if (!destination) {
            return;
        }
        if(destination.droppableId == 'delete'){
            dispatch(deleteCard(result.draggableId))
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        if (sInd === dInd && source.index !== destination.index) {
            dispatch(reorderCards(userData.cards,result))
        } else if (sInd !== dInd) {
            let destListData = userData.lists[userData.lists.findIndex(li => li._id === dInd)]
            if (destListData.hideChildren){
                result.destination.index = userData.cards.filter(c => c.listId === destListData._id).length
            }
            dispatch(moveCard(userData.cards,result))
        }
    }

    const moveListPosition = (dir,data,destColNum) => {
        let filteredLists = userData.lists.filter(li => li.colNum === destColNum).sort((a, b) => (a.position > b.position) ? 1 : -1)
        console.log(filteredLists)
        let listInd = data.colNum === destColNum ? filteredLists.findIndex(li => li._id === data._id) : filteredLists.length
        console.log(listInd)
        if (filteredLists.length === 1) return
        let result = {id: data._id, destination:{droppableId:destColNum,index:dir === 'up' ? listInd+1 : listInd-1},source:{droppableId:data.colNum,index:listInd}}
        if (dir === 'up'){
            if (listInd === (filteredLists.length-1)) return
            
            console.log('up')
            dispatch(moveList(filteredLists,result))
            

        }
        else if (dir ==='down'){

            if (listInd === 0) return
            console.log('down')
            dispatch(moveList(filteredLists,result))
        }
        else{

        }
    }


    function addList(name,bin,hide){
        let filteredLists = userData.lists.filter(li => li.colNum === bin).sort((a, b) => (a.position > b.position) ? 1 : -1)
        let lastPos = filteredLists.length === 0 ? 0 : filteredLists.pop().position
        console.log(userData)
        const newList = {
            boardId: userData.board._id,
            name:name,
            hideChildren:hide,
            colNum: bin,
            position: lastPos+1024
        }
        dispatch(addNewList(newList))
        
    }
    const formatMoney = (a) => {
        return 'Total: $'+a.toFixed(2).toString()    
    }


    

    return(
            <DragDropContext onDragEnd={onDragEnd}>
                <Container fluid className='flex-fill flex-column d-flex min-vh-100'>
                <Row className='flex-shrink-0'>
                    <Col md={3} style={{'display':'flex'}}>
                        <AddNewList newList={addList} />
                        <div className='m-2'>
                            <Button className='btn-lg' variant="primary" onClick={() => toggleEditBaskets()}>
                            Edit Baskets
                            </Button>
                        </div>
                    </Col>
                    <Col className='text-center'><h1>{title.replace('_'," ")}</h1></Col>
                    <Col md={3} className='d-flex flex-row-reverse'>
                        <DeleteArea />
                        <div className='m-2'>
                            <BatchImport addList={addList}/>
                        </div>
                    </Col>
                </Row>
                <div className='flex-grow-1 flex-column d-flex'>
                    <Row className='flex-fill m-0 pb-2'>
                    {titleArray.map((name, idx) => (
                                <Col md={3} key={idx} className='overflow-auto flex-shrink-1 position-relative border border-dark p-0'>
                                    <div className='position-absolute w-100'>
                                        <h3 className='border-bottom border-dark text-center pb-1'>{name}</h3>
                                        <h4 className='border-bottom border-dark text-center'>Total:{total[idx]}</h4>
                                    {lists.filter(li => li.colNum === idx).sort((a, b) => (a.position > b.position) ? 1 : -1).map((el, ind) => (
                                        
                                        <TaskList el={el} ind={ind} key={ind} editMode={editBaskets} moveList={moveListPosition}/>
                                        
                                    ))}
                                    </div>
                                </Col>
                                ))}            
                    </Row>
                </div>
                </Container>
                
                
            </DragDropContext>
  );
    
}

export default Board;