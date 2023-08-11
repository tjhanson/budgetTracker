import React,{Fragment, useState} from 'react';
import {Draggable } from "react-beautiful-dnd";
import Window from './window';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
    });





function Task({item,index}) {
    const [editMode, setEditMode] = useState(false);
    const [show, setShow] = useState(false);

    const onOpen = () => {
        setEditMode(true);
        setShow(true);
    };

    const onClose = () => {
        setEditMode(false);
        setShow(false);
    };

    return(
        <div>
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
                    className='m-1 p-1 rounded'
                >
                    <div
                    onClick={onOpen}
                    style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                    >
                        {item.name}:{item.position}
                    </div>
                    </div>
                    
                
            )}
        </Draggable>
        <Window item={item} onClose={onClose} show={show} />
        </div>
    )
}

export default Task;