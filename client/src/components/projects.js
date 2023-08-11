import React, {useState, useEffect} from 'react';
import { Row } from 'react-bootstrap';
import { useSelector,useDispatch  } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { setProjects,setProjectsbyList } from '../slices/projectsSlice';
import AddProjectModal from './addProjectModal';


function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }
const images = importAll(require.context('../assets/projectImages', false, /\.(jpg|jpe?g|svg)$/));

function Projects() {
    const dispatch = useDispatch();
    const [searchText,setSearch] = useState("");
    const projects = useSelector((state) => state.projects.data)
    const change = useSelector((state) => state.projects.changeMade)
    const user = useSelector((state) => state.users.user)
    
    useEffect(() => {
        if (user){
            if (user.roles.includes('ROLE_ADMIN')){
                console.log('admin')
                dispatch(setProjects())
            }
            else{
            dispatch(setProjectsbyList(user.projects))
            }
        }
    },[user,change])

    if (!user){
        console.log('not logged in')
        return <Navigate to="/" />;
    }

    return(
        <div>
            <Row>
                <AddProjectModal />
                <input className='col-3 mt-2 mb-1 ms-2' placeholder='Search For Projects' onChange={event => setSearch(event.target.value)}></input>
            </Row>
            <Row sm={1} md={3}>

            </Row>
        </div>
    )
}

export default Projects;