import React from 'react';
import { Button, Col } from 'react-bootstrap';

function AddNewList({newList}) {

    function createNewList(){
        newList('asdf')
    }

    return(
        <Col md={2} className='m-2 mt-4'>
                <Button 
                className='ps-4 pe-4'
                onClick={() => {
                    createNewList()
                }}>add new list</Button>
            </Col> 
    )
}

export default AddNewList;