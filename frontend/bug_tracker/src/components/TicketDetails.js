import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const TicketDetails = () => {

    const {id} = useParams();

    const [ticket , setTicket] = useState(null);
    const [comments , setComments] = useState(null);

    const handleDelete = async()=>{}
    
    useEffect(()=>{

        const fetchTicket = async()=>{
            const response = await fetch('/api/tickets/'+ id);
            const json    = await response.json();

            if(response.ok){
                setTicket(json.ticket[0]);
                
            }


        }
        const fetchComments = async()=>{
            const response = await fetch('/api/tickets/comments/'+ id);
            const json    = await response.json();

            if(response.ok){
                setComments(json.comments);
                
            }

        }
        fetchTicket();
        fetchComments();

    },[])


    console.log(comments);

    return ( 
        
        <div className="home">
        <div className="Projects">
        <h3> Ticket:</h3>
        <div className="project-details">
        {ticket && (
        <div>
        <h4>{ticket.name}  </h4>
        <p><strong>Status: </strong>{ticket.status} </p>
        <p><strong>Type: </strong> {ticket.type} </p>

        </div>
        )}

        </div>
        <br /> <br />
        <h3> Comments:</h3>
        {comments && comments.map((comment)=>(
        <div key={comment.comment_id} className="project-details">
            <p><strong>Comment: </strong></p>
            <p>{comment.comment}</p>
            <p><strong>By: </strong> {comment.name}</p>
        </div>))}
        </div>

        <div>
            <CommentForm/>
        </div>



        </div>




     );
}
 
export default TicketDetails;