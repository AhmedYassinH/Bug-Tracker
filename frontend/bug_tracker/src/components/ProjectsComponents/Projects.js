

import { Link } from 'react-router-dom';

const Project = ({project}) => {



    const handleUpdate = (async()=> {
        const response = await fetch('/api/projects/'+ project.project_id,{
            method: 'PATCH',
        })

        const json = await response.json();
        if (response.ok) {
            console.log(json);
          }
    })

    const handleDelete = (async()=> {
        const response = await fetch('/api/projects/'+ project.project_id,{
            method: 'DELETE',
        })

        const json = await response.json();
        if (response.ok) {
            console.log(json);
          }
    })



    return  ( 
    <div className="project-details">

        <h4><Link to={'/project/'+project.project_id}> {project.name}</Link></h4>
        <p><strong>Description: </strong>{project.description} </p>
        <p><strong>Status: </strong> {project.status} </p>

        <span className="update" onClick={handleUpdate} >Closed</span>
        <span className = "delete" onClick={handleDelete}>Delete</span>

    </div>
     );
}
 
export default Project;
