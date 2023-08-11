import React, {} from 'react';
import { Container, Navbar,Button} from 'react-bootstrap';
import { userLogout } from '../slices/userSlice';
import {useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';

function SiteNavbar() {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    const logoutUser = () => {
        dispatch(userLogout());
        navigate("/", { replace: true });
                   
      };

      const adminBoard = () => {
        //dispatch(userLogout());
        navigate("/admin", { replace: true });            
      };
      const projectBoard = () => {
        //dispatch(userLogout());
        navigate("/projects", { replace: true });            
      };
      const projectMap = () => {
        //dispatch(userLogout());
        navigate("/map", { replace: true });            
      };

    return(
        <Navbar bg='light'>        
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="/fuscoe.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Fuscoe Tasks
                </Navbar.Brand>
                <div className='d-flex'>
                {user && user.username === "admin" ? <Button className='me-2 btn-secondary' onClick={adminBoard}>Admin</Button> : <></>}
                {user ? <Button className='me-2 btn-secondary' onClick={projectMap}>Map</Button> : <></>}
                {user ? <Button className='me-2 btn-secondary' onClick={projectBoard}>Projects</Button> : <></>}
                {user ? <Button className='me-2' onClick={logoutUser}>Logout</Button> : <></>}
                </div>
            </Container>
        </Navbar>
    )
}

export default SiteNavbar;