import React, {useEffect, useState} from 'react';
import { Card, Row,Button, Col, ButtonGroup, Modal,Form } from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'
import { addNewCard,switchChange } from '../slices/boardSlice';

function AddTaskModal({addCard}) {


    const insertCard = () => {
      addCard('')
    };


    return (
      <>
        <Button className='btn-sm mb-1' variant="primary" onClick={insertCard}>
          +
        </Button>
      </>
    );
}

export default AddTaskModal;