import React, {useEffect, useRef} from 'react';
import { Container,Row,Col,Stack, Navbar} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import SiteNavbar from '../components/navbar';
import TaskSidebar from '../components/sidebar';
import Board from '../components/board';
import { useSelector  } from 'react-redux'
import Overview from '../components/overview';

function OverviewPage() {

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
                        <Overview />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OverviewPage;