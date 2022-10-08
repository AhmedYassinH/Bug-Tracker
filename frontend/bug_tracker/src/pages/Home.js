
import ProjectForm from "../components/ProjectsComponents/ProjectForm";
import Projects from "../components/ProjectsComponents/Projects";
import { useEffect, useState } from "react";

import { useAuthContext } from '../hooks/useAuthContext';
import { useStateContext } from "../context/ContextProvider";

import { Button } from "react-bootstrap";
const Home = () => {


    
    // The Modal
    const {setShowModal,projects,setProjects} = useStateContext()

    const handleShow = () => setShowModal(true);

    
    

    

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
    },[user,setProjects])


    console.log("Home.js projects",projects)



            


    








    
    return ( 
        
        <div className="projects" >
            
            <div className='projects-title'>
            <h3 >Projects:</h3>
            <Button  variant="dark" onClick={handleShow}>Add Project</Button>
            </div>
            <div className="projects-header">
                <p><strong>Name</strong></p>
                <p><strong>Description</strong></p>
                <p><strong>Status</strong></p>
                <p><strong>Actions</strong></p>
            </div>
            <div className="projects-body">
            <hr style={{margin:"0px"}}/>
            {projects && projects.map((project)=>(
                <Projects key={project.project_id} project={project}/>
                
            ))}
            </div>
            <ProjectForm/>



        </div>


     );
}
 
export default Home;