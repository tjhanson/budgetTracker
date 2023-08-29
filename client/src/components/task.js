import React,{Fragment, useState} from 'react';
import {Draggable } from "react-beautiful-dnd";
import Window from './window';
import { useSelector,useDispatch  } from 'react-redux'
import {Row,Col} from 'react-bootstrap';

import AutoSizeTextArea from './autoSizeTextArea';
import { updateCardData } from '../slices/boardSlice';
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "red" : "rgb(241, 242, 244)",

    // styles we need to apply on draggables
    ...draggableStyle
    });





function Task({item,index}) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editModeAmount, setEditModeAmount] = useState(false);
    const [show, setShow] = useState(false);

    const contentClick = () => {
        setEditMode(true);
      };

      const contentClickAmount = () => {
        setEditModeAmount(true);
      };

    const onSave = (i,t) => {
        
        if (t === 'name'){
            setEditMode(false);
            if (i !== item.name){
                dispatch(updateCardData(item._id,{'name':i}))
                console.log('changedName')
            }
        } 
        else {
            setEditModeAmount(false);
            if (i !== item.amount){
                dispatch(updateCardData(item._id,{'amount':i}))
                console.log('changedAmount')
            }
        }
        
    };


    return(
        <Draggable
            draggableId={item._id}
            index={index}
            disableInteractiveElementBlocking={!editMode}
        >
            {(provided, snapshot) => (
                <div
                
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                    className='m-0'
                >
                    <Row
                    
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        background: "white",
                    }}
                    className='rounded border p-1'
                    >
                        <Col md={8} onClick={contentClick} className='p-0'>
                            <AutoSizeTextArea
                                onSave={onSave}
                                updateValue={item.name}
                                // should i cancel???
                                onBlur={onSave}
                                editMode={editMode}
                                t='name'
                            ></AutoSizeTextArea>
                        </Col>
                        $
                        <Col onClick={contentClickAmount} className='p-0'>
                            <AutoSizeTextArea
                                onSave={onSave}
                                updateValue={item.amount}
                                // should i cancel???
                                onBlur={onSave}
                                editMode={editModeAmount}
                                t='amount'
                            ></AutoSizeTextArea>
                        </Col>
                    </Row>
                    </div>
                    
                
            )}
        </Draggable>
    )
}

export default Task;
