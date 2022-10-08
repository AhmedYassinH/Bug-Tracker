

import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStateContext } from "../../context/ContextProvider";


const ListProjectTeam = ({member }) => {

    // The team context
    const {setTeam} = useStateContext()
    
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
            setTeam(json.team);
            console.log('Team',json.team)
          }
    }

    return ( 
        <div className='team-members' >
            <p > <strong>{member.name}</strong></p>
            <Button  variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
     );
}
 
export default ListProjectTeam;