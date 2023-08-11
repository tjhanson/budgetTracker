import React, {useEffect, useState} from 'react';
import { Card, Row,Button, Col, ButtonGroup, Modal,Form } from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'
import { addNewCard,switchChange } from '../slices/boardSlice';

function AddTaskModal(props) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [links, setLinks] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const strToArr = (s) =>{
      if (typeof(s) === 'object'){
        return s
      }
      let a = s.split(",")
      let res = []
      for (let i = 0; i < a.length; i+=2){
          res.push([a[i],a[i+1]])
        }
      return res

    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(typeof(links))
      const newProj = {
        name: name,
      }
      console.log(newProj)
      dispatch(addNewCard(newProj))
          .then(() => {
              console.log('changed')
              //dispatch(switchChange())
              //navigate('/projects')
          })
          .catch((error) => {
              console.log(error)
          })
    };


    return (
      <>
        <Button variant="primary" className='col-md-2 ' onClick={handleShow}>
          +
        </Button>
  
        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" 
                onChange={(event) => setName(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Project Description</Form.Label>
                <Form.Control type="text" 
                onChange={(event) => setDesc(event.target.value)} />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit' onClick={handleClose}>
              Add
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
}

export default AddTaskModal;