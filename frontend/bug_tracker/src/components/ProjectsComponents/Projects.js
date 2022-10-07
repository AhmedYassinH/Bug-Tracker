

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useStateContext } from "../../context/ContextProvider";

import { Dropdown } from 'react-bootstrap';

const Project = ({project}) => {

  const { user } = useAuthContext()
  const {setProjects} = useStateContext()

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
            setProjects(json.projects);
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
            setProjects(json.projects);
          }
    })



    return  ( 
    <div className="project-details">
        
        <h6><Link to={'/project/'+project.project_id}>{project.name}</Link></h6>
        <p className="description"> {project.description} </p>
        <p> {project.status} </p>
        


        <Dropdown >
          <Dropdown.Toggle variant="" id="dropdown-basic"  >
            <img style={{width:'30px'}} src="menu.png" alt="project-action"/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
              <Dropdown.Item onClick={handleUpdate}>CLOSE</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>DELETE</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>

    </div>
     );
}
 
export default Project;
