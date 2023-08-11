import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Form,Modal,Button } from 'react-bootstrap';

function AddCardInList({addNewCard}) {
    const [toggled,setToggled] = useState(false)
    const [name, setName] = useState("");
    
    const toggle = () => setToggled(!toggled)

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewCard(name)
        toggle()
            
      };

    return(
        <div className='m-1 p-4 rounded bg-success'>
            {toggled ? 
                <div>
                    <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control type="text" placeholder={'Task Name'}
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
                </div> :
                <Button
                style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
                onClick={toggle}
                >
                    type new task
                </Button>
            }
        </div>
            
    )
}

export default AddCardInList;