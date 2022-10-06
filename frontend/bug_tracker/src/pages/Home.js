
import ProjectForm from "../components/ProjectsComponents/ProjectForm";
import Projects from "../components/ProjectsComponents/Projects";
import { useEffect, useState } from "react";

import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {

    const [projects , setProjects] = useState(null);

    const { user } = useAuthContext()

    useEffect(()=>{
        console.log(user?.token)
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


    console.log(projects)
    
    return ( 
        <div className="home">
        <div className="Projects">
            {projects && projects.map((project)=>(
                <Projects key={project.project_id} project={project}/>
            ))}
        </div>
        <ProjectForm />
      </div>
     );
}
 
export default Home;