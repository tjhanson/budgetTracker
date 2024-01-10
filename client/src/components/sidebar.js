import React,{useState,useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setBoards, setOverview } from '../slices/boardSlice';
import { Button } from 'react-bootstrap';
import AddProjectModal from './addProjectModal';

function TaskSidebar({currentYear}) {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userData = useSelector((state) => state.userData)


    const changeOverview = (y) => {
        dispatch(setOverview(y))
        navigate('/overview')
        
    }

    const changeNetWorth= (y) => {
        dispatch(setOverview(y))
        navigate('/networth')
        
    }

    const addNewProject= (y) => {
        
        
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
                    <MenuItem onClick={() =>changeNetWorth(y)}>Net Worth</MenuItem>
                    {months.map((m,idx) => (
                        <MenuItem key={idx} onClick={() =>changeBoard(m+'_'+y)}> {m}</MenuItem>
                    ))}
                </SubMenu>
            ))}
            <SubMenu label='Projects'>
                {userData.projects.map((p,idx)=>(
                    <MenuItem key={idx} onClick={() =>changeBoard(p.name)}> {p?.name.split('_')[1]}</MenuItem>
                ))}
            <MenuItem ><AddProjectModal /></MenuItem>
            </SubMenu>
            
        </Menu>
    </Sidebar>
    )
}

export default TaskSidebar;