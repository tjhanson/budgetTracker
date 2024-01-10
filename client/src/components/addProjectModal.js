import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Form,Modal,Button } from 'react-bootstrap';
import { addNewBoard } from '../slices/boardSlice';

function AddProjectModal() {
  const dispatch = useDispatch()
    const [toggled,setToggled] = useState(false)
    const [name, setName] = useState("");
    
    const toggle = () => setToggled(!toggled)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name)
        dispatch(addNewBoard({
          'name':'project_'+name}))
        toggle()
            
      };


    return(

        <>
      <Button variant="primary" onClick={toggle}>
        Add Project
      </Button>

      <Modal show={toggled} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Control type="text" placeholder={'Project Name'}
                    onChange={(event) => setName(event.target.value)} />
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>
                Close
                </Button>
                <Button variant="primary" type='submit'>
                Add
                </Button>
            </Modal.Footer>
            </Form>
      </Modal>
    </>

    )
}

export default AddProjectModal;