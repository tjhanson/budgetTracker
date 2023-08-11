import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

function TaskSidebar() {
    const { user } = useSelector(state => state.users);

    return(
    <Sidebar width='100%' className='vh-100 bg-success p-0'>
        <Menu
        >
            <MenuItem component={<Link to="/documentation" />}> Hi {user.username}</MenuItem>
        </Menu>
    </Sidebar>
    )
}

export default TaskSidebar;