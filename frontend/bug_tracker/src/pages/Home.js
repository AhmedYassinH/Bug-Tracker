
import ProjectForm from "../components/ProjectsComponents/ProjectForm";
import Projects from "../components/ProjectsComponents/Projects";
import { useEffect, useState } from "react";

import { useAuthContext } from '../hooks/useAuthContext';
import { useStateContext } from "../context/ContextProvider";

import { Button, Modal, Form } from "react-bootstrap";
const Home = () => {



    const [projects , setProjects] = useState(null);

    const { user } = useAuthContext()

    useEffect(()=>{
        // console.log("token",user.token)
        const fetchProjects = async ()=>{
            const response = await fetch('/api/projects', {
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json = await response.json();

            if(response.ok){
                setProjects(json.projects);
                
            }}

            if (user?.token) {
                fetchProjects()
              }
    },[user])


    console.log("Home.js projects",projects)



            
    // The Modal
    const {showModal:show,dispatch} = useStateContext()
    
    const handleShow = () => dispatch({type:'show_modal'});

    


    








    
    return ( 
        
        <div className="projects" >
            

            <h3 className='title'>Projects:</h3>
            <div className="project-details">
                <p><strong>Name</strong></p>
                <p><strong>Description</strong></p>
                <p><strong>Status</strong></p>
                <Button  variant="dark" onClick={handleShow}>Add Project</Button>
            </div>

            <hr style={{margin:"0px"}}/>
            {projects && projects.map((project)=>(
                <Projects key={project.project_id} project={project}/>
                
            ))}




        </div>


     );
}
 
export default Home;