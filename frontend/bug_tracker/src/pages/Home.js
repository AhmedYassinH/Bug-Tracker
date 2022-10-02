
import ProjectForm from "../components/ProjectForm";
import Projects from "../components/Projects";
import { useEffect, useState } from "react";


const Home = () => {

    const [projects , setProjects] = useState(null);

    useEffect(()=>{
        const fetchProjects = async ()=>{
            const response = await fetch('/api/projects');
            const json = await response.json();

            if(response.ok){
                setProjects(json.projects);
                
            }}

        fetchProjects();
    },[])


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