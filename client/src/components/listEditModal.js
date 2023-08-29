import React, {useEffect, useState} from 'react';
import { Card, Row,Button, Col, ButtonGroup, Modal,Form } from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'

function ListEditModal({data,update}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [bin, setBin] = useState(0);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (show === true){
            setName(data.name)
            setBin(data.colNum)
            setHide(data.hideChildren)
        }
    },[show])

    const toggle = () => {
        setShow(!show)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let d = {
            name:name,
            colNum:parseInt(bin),
            hideChildren:hide
        }
        update(d)
        
        toggle()
    }



    return (
        <div>
            <div className=''>
                <Button className='btn-sm' variant="danger" onClick={toggle}>
                Edit
                </Button>
            </div>
            <Modal show={show} onHide={toggle}>
            <Modal.Header>
                <Modal.Title>Edit Basket</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Basket Name</Form.Label>
                <Form.Control type="text" defaultValue={name}
                onChange={(event) => setName(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Column Number</Form.Label>
                <Form.Control type="number" defaultValue={bin}
                onChange={(event) => setBin(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <input type="checkbox" checked={hide}
                onChange={(event) => setHide(!hide)} />
                <label className='ps-2'> Hide Cards</label>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>
            
        </div>

    );
}

export default ListEditModal;