import React,{useState,useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setBoards, setOverview } from '../slices/boardSlice';

function TaskSidebar({currentYear}) {
    const dispatch = useDispatch()
    let navigate = useNavigate();


    const changeOverview = (y) => {
        console.log(y)
        dispatch(setOverview(y))
        navigate('/overview')
        
    }

    const changeBoard = (my) => {
        
        console.log(my)
        dispatch(setBoards(my)).then(() =>{
            navigate('/')
        })
    }

    var years = ['2022','2023','2024']
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return(
    <Sidebar width='100%' className='vh-100 bg-success p-0'>
        <Menu
        >
            {years.map((y,idx) =>(
                <SubMenu defaultOpen={currentYear() === y} label={y} key={idx}>
                    <MenuItem onClick={() =>changeOverview(y)}>Overview</MenuItem>
                    {months.map((m,idx) => (
                        <MenuItem key={idx} onClick={() =>changeBoard(m+'_'+y)}> {m}</MenuItem>
                    ))}
                </SubMenu>
            ))}
            
        </Menu>
    </Sidebar>
    )
}

export default TaskSidebar;