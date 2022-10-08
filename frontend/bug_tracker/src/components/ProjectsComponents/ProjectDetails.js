
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "../TicketsComponents/Ticket";
import TicketForm from "../TicketsComponents/TicketForm";
import { useAuthContext } from '../../hooks/useAuthContext';
import AddTeamMember from "./AddTeamMember";
import ListProjectTeam from "./ListProjectTeam";
import { Button } from "react-bootstrap";

import { useStateContext } from "../../context/ContextProvider";


const ProjectDetails = () => {

    // The ModalmTeam,Tickets Context
    const {setShowModal,tickets,setTickets,team,setTeam} = useStateContext()

    const handleShow = () => setShowModal(true);



    const {id} = useParams();
    
    

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
        <div className="tickets-team-comments">
        <div className="tickets">
            <div className="tickets-header">
                <div style={{display:'flex',justifyContent:'space-between',padding:'0 10px'}}>
                    <h3> Project Tickets:</h3>
                    <Button  variant="dark" onClick={handleShow}>Add Ticket</Button>
                </div>
                <div className='tickets-title'>
                    <p><strong>Name</strong></p>
                    <p><strong>Type</strong></p>
                    <p><strong>Status</strong></p>
                    <div></div>

                </div>
            
            </div>
            
            <div className="tickets-body">
            {tickets && tickets.map((ticket)=>(
                <Ticket key={ticket.ticket_id} ticket={ticket}/>
                
            ))}
            </div>


        </div>
        <div className="team">
        <h3 className="team-header"> Project Team:</h3>
        <div className="team-body">
        {team && team.map((member)=>(
            <ListProjectTeam key={member.user_id} member={member} />
            ))}

        </div>
        <div className="team-footer">
            <AddTeamMember project_id={id}/>
        </div>
        <TicketForm id={id}/>

        </div>
      </div>
     );
}
 
export default ProjectDetails;