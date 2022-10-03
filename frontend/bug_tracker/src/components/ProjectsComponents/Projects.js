

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';



const Project = ({project}) => {

  const { user } = useAuthContext()


    const handleUpdate = (async()=> {
        if (!user) {
            return
          }
        const response = await fetch('/api/projects/'+ project.project_id,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            
        })

        const json = await response.json();
        if (response.ok) {
            console.log(json);
          }
    })

    const handleDelete = (async()=> {
        if (!user) {
            return
          }
        const response = await fetch('/api/projects/'+ project.project_id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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

        <span className="update" onClick={handleUpdate} >CLOSE</span>
        <span className = "delete" onClick={handleDelete}>DELETE</span>

    </div>
     );
}
 
export default Project;
