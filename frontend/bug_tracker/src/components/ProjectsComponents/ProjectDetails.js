
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "../TicketsComponents/Ticket";
import TicketForm from "../TicketsComponents/TicketForm";
import { useAuthContext } from '../../hooks/useAuthContext';
import AddTeam from "../TicketsComponents/AddTeam";


const ProjectDetails = () => {

    const {id} = useParams();
    const [team, setTeam] = useState(null);
    const [tickets, setTickets] = useState(null);

    const { user } = useAuthContext()

    useEffect(()=>{

        const fetchTickets = async()=>{
            const response = await fetch('/api/projects/'+ id, {
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json    = await response.json();

            if(response.ok){
                setTickets(json.tickets);
                
            }


        }
        if (user) {
            fetchTickets()
          }

    },[user,id])

    useEffect(()=>{

        const fetchTeam = async()=>{
            const response = await fetch('/api/projects/team/'+ id,{
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json    = await response.json();

            if(response.ok){
                setTeam(json.team);
            }
        }


        if (user) {
            fetchTeam()
          }

    },[user,id])



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
            <p key={member.user_id}> {member.name}</p>
            ))}

        <AddTeam project_id={id}/>
        </div>
        <br/><br/>
        <TicketForm id={id}/>

        </div>
      </div>
     );
}
 
export default ProjectDetails;