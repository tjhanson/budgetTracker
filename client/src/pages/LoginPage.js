import React, {useState, useRef} from 'react';
import { Container,Row,Col,Stack, Navbar,Form,Button} from 'react-bootstrap';
import SiteNavbar from '../components/navbar';
import {useNavigate } from "react-router-dom";
import { loginUser } from '../slices/userSlice';
import { useDispatch,useSelector  } from "react-redux";

function Login(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        dispatch(loginUser(username,password))
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
      };

    return(
        <div>
            <SiteNavbar />
            <Container>
                <Col md={{span:6,offset:3}} offset={3} className='mt-3'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                            onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                            onChange={(event) => setPassword(event.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                </Col>
            </Container>
        </div>
    )
}

export default Login;