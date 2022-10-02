import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetails = () => {

    const {id} = useParams();

    const [ticket , setTicket] = useState(null);

    const handleDelete = async()=>{}
    
    useEffect(()=>{

        const fetchTicket = async()=>{
            const response = await fetch('/api/tickets/'+ id);
            const json    = await response.json();

            if(response.ok){
                setTicket(json.ticket[0]);
                
            }


        }
        fetchTicket();

    },[])


    console.log(ticket);

    return ( 
        


        <div className="project-details">
        {ticket && (
        <div>
        <h4>{ticket.name}  </h4>
        <p><strong>Status: </strong>{ticket.status} </p>
        <p><strong>Type: </strong> {ticket.type} </p>

        </div>
        )}

        </div>





     );
}
 
export default TicketDetails;