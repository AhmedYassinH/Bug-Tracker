


import { Link } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import { Dropdown } from 'react-bootstrap';

import { useStateContext } from "../../context/ContextProvider";
const Ticket = ({ticket}) => {

    // Tickets Context
    const {setTickets} = useStateContext()


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

    const handleDelete = async()=> {
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
          setTickets(json.tickets);
          }
    }






    return (
    
    <div className="ticket-details">
        
        <h6><Link to={"/ticket/"+ticket.ticket_id}>{ticket.name} </Link></h6>
        <p>{ticket.type} </p>
        <p>{ticket.status} </p>
        


        <Dropdown >
          <Dropdown.Toggle variant="" id="dropdown-basic"  >
            <img style={{width:'30px'}} src="/menu.png" alt="project-action"/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDelete}>DELETE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

    </div>
     );
}
 
export default Ticket;