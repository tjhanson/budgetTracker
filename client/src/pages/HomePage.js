import React,{useEffect} from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'

import TaskSidebar from '../components/sidebar';
import Board from '../components/board';
import { setProjects } from '../slices/boardSlice';


function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setProjects())
    },[])

    function calcCurrentYear(){
        var d = new Date()
        return d.getFullYear().toString()
    }

    return(
        <div className='h-100'>
                    

            <Container fluid className='p-0 h-100 d-flex flex-column '>
                <Row className='flex-grow-1'>
                    <Col md={2} className='p-0'>
                        <TaskSidebar currentYear={calcCurrentYear}/>
                    </Col>
                    <Col md={10}>
                        <Board />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;