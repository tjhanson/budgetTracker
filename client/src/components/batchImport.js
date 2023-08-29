import React, {useEffect, useState} from 'react';
import { Card, Row,Button, Col, ButtonGroup, Modal,Form } from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'
import { addNewCard } from '../slices/boardSlice';

function BatchImport({addList}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const [array, setArray] = useState([]);
    const [submitted,setSubmitted] = useState(false)
    const userData = useSelector((state) => state.userData)


    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
        
            fileReader.readAsText(file);
        }
      };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
        const array = csvRows.map(i => {
            const values = i.replace(/["]/g, "").split(",");
            const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
            }, {});
            return obj;
        });
    
        setArray(array);
        setSubmitted(true)
      };

    useEffect(() => {

    },[])

    const toggle = () => {
        setSubmitted(false)
        setShow(!show)
    };

    const handleAddCards = () => {
        console.log(array)
        let listId = userData.lists[userData.lists.findIndex(li => li.name === "Other")]._id
        var filteredCards = userData.cards.filter(card => card.listId == listId).toSorted((a, b) => (a.position > b.position) ? 1 : -1)
        var position = filteredCards.length > 0 ? filteredCards.pop().position : 0
        array.forEach(t => {
            const newCard = {
                name: t.Description,
                listId: listId,
                position: position+1024,
                amount: t.Amount === "" ? 0 : parseFloat(t.Amount),
            }
            if (t.Description !== undefined) dispatch(addNewCard(newCard))
            position+=1024
        })
        
        toggle()

        

        
    }


    const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div>
            <div className=''>
                <Button className='btn-lg' variant="primary" onClick={toggle}>
                Import
                </Button>
            </div>
            <Modal size='lg' show={show} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Batch Import</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {submitted === false ? 
                        <div>
                            <form>
                                <input
                                    type={"file"}
                                    id={"csvFileInput"}
                                    accept={".csv"}
                                    onChange={handleOnChange}
                                />

                                <button
                                    onClick={(e) => {
                                        handleOnSubmit(e);
                                    }}
                                >
                                    IMPORT CSV
                                </button>
                            </form>
                        </div>:
                        
                        <div>
                            <table>
                                <thead>
                                <tr key={"header"}>
                                    {headerKeys.map((key) => (
                                    <th>{key}</th>
                                    ))}
                                </tr>
                                </thead>

                                <tbody>
                                {array.map((item) => (
                                    <tr key={item.id}>
                                    {Object.values(item).map((val) => (
                                        <td>{val}</td>
                                    ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleAddCards}>
                    Save Changes
                </Button>
            </Modal.Footer>
            
            </Modal>
            
        </div>

    );
}

export default BatchImport;