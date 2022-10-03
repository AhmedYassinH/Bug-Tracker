


import { Link } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';


const Ticket = ({ticket}) => {

    const { user } = useAuthContext()

    const handleUpdate = (async()=> {
        if (!user) {
            return
          }
        const response = await fetch('/api/tickets/'+ ticket.ticket_id,{
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

        const response = await fetch('/api/tickets/'+ ticket.ticket_id,{
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






    return ( 
        <div className="project-details">

        <h4><Link to={"/ticket/"+ticket.ticket_id}>{ticket.name} </Link> </h4>
        <p><strong>Status: </strong>{ticket.status} </p>
        <p><strong>Type: </strong> {ticket.type} </p>

        <span className="update"  >CLOSE</span>
        <span className = "delete" onClick={handleDelete}>Delete</span>

    </div>
     );
}
 
export default Ticket;