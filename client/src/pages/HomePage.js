import React, {useEffect, useRef} from 'react';
import { Container,Row,Col,Stack, Navbar} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import SiteNavbar from '../components/navbar';
import TaskSidebar from '../components/sidebar';
import Board from '../components/board';
import { useSelector  } from 'react-redux'

function Home() {
    const user = useSelector((state) => state.users.user)
    if (!user){
        console.log('not logged in')
        return <Navigate to="/login" />;
    }
    return(
        <div id=''>
                    

            <Container fluid className='p-0 h-100'>
                <Row>
                    <Col md={2} className='p-0'>
                        <TaskSidebar />
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