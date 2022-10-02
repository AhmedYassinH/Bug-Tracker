


import { Link } from "react-router-dom";


const Ticket = ({ticket}) => {

    const handleUpdate = (async()=> {
        const response = await fetch('/api/tickets/'+ ticket.ticket_id,{
            method: 'PATCH',
        })

        const json = await response.json();
        if (response.ok) {
            console.log(json);
          }
    })

    const handleDelete = (async()=> {
        const response = await fetch('/api/tickets/'+ ticket.ticket_id,{
            method: 'DELETE',
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

        <span className="update"  >Closed</span>
        <span className = "delete" onClick={handleDelete}>Delete</span>

    </div>
     );
}
 
export default Ticket;