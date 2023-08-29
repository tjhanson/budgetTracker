import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Form,Modal,Button } from 'react-bootstrap';

function AddNewList({newList}) {
    const [toggled,setToggled] = useState(false)
    const [name, setName] = useState("");
    const [bin, setBin] = useState("");
    const [hideChildren, setHideChildren] = useState(false);
    
    const toggle = () => setToggled(!toggled)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name)
        newList(name,parseInt(bin),hideChildren)
        toggle()
            
      };


    return(
        <div className=''>
        {toggled ? 
            <div>
                <Form onSubmit={handleSubmit}>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Control type="text" placeholder={'Basket Name'}
                    onChange={(event) => setName(event.target.value)} />
                    <Form.Control type="text" placeholder={'Bin'}
                    onChange={(event) => setBin(event.target.value)} />
                    <input type="checkbox"
                    onClick={(event) => setHideChildren(!hideChildren)} />
                    <label>Hide Cards</label>
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
            <div className='m-2'>
            <Button className='btn-lg'
            
            onClick={toggle}
            >
                Add Basket
            </Button>
            </div>
        }
    </div>
    )
}

export default AddNewList;