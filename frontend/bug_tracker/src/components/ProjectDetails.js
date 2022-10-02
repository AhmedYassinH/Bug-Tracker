
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "./Ticket";
import TicketForm from "./TicketForm"


const ProjectDetails = () => {

    const {id} = useParams();
    const [team, setTeam] = useState(null);
    const [tickets, setTickets] = useState(null);

    useEffect(()=>{

        const fetchTickets = async()=>{
            const response = await fetch('/api/projects/'+ id);
            const json    = await response.json();

            if(response.ok){
                setTickets(json.tickets);
                
            }


        }
        fetchTickets();

    },[])

    useEffect(()=>{

        const fetchTeam = async()=>{
            const response = await fetch('/api/projects/team/'+ id);
            const json    = await response.json();

            if(response.ok){
                setTeam(json.team);
                
                
            }


        }
        fetchTeam();

    },[])

    console.log(tickets);
    console.log(team);

    return ( 
        <div className="home">
        <div className="Projects">
            <h3> Project Tickets:</h3>
            {tickets && tickets.map((ticket)=>(
                <Ticket key={ticket.ticket_id} ticket={ticket}/>
                
            ))}


        </div>
        <div>
        <h3 > Project Team:</h3>
        <div className="team">
        {team && team.map((member)=>(
            <p key={member.name}> {member.name}</p>
            ))}
        </div>
        <br/><br/>
        <TicketForm id={id}/>

        </div>
      </div>
     );
}
 
export default ProjectDetails;