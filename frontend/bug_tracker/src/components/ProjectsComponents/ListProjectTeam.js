

import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';

const ListProjectTeam = ({member }) => {
    
    const {id} = useParams()
    const user_id = member.user_id
    const body = {user_id,project_id :id}
    const { user } = useAuthContext()
    const handleDelete = async()=>{

        const response = await fetch('/api/projects/del-member',{
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();
        if (response.ok) {
            console.log(json);
          }
    }

    return ( 
        <div className="project-details" >
            <p > {member.name}</p>
            <span className = "delete" onClick={handleDelete}>Delete</span>
        </div>
     );
}
 
export default ListProjectTeam;