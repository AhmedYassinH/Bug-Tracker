import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useStateContext } from "../../context/ContextProvider";
const TicketDetails = () => {

    const {id} = useParams();

    const [ticket , setTicket] = useState(null);
    

    const { user } = useAuthContext()
    const {comments,setComments} = useStateContext()

    const handleDelete = async()=>{}
    
    useEffect(()=>{

        const fetchTicket = async()=>{
            const response = await fetch('/api/tickets/'+ id, {
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json    = await response.json();

            if(response.ok){
                setTicket(json.ticket[0]);
                
            }


        }
        const fetchComments = async()=>{
            const response = await fetch('/api/tickets/comments/'+ id, {
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json    = await response.json();

            if(response.ok){
                setComments(json.comments);
                
            }

        }
        if (user?.token) {
            fetchTicket();
            fetchComments();
        }

    },[user,id])


    console.log(comments);

    return ( 
        
        <div className="ticket-comments">
        <div className="ticket">
        <h3> Ticket:</h3>
        <div className="ticket-body">
        {ticket && (
        <div>
        <h4>{ticket.name}  </h4>
        <p><strong>Status: </strong>{ticket.status} </p>
        <p><strong>Type: </strong> {ticket.type} </p>

        </div>
        )}

        </div>
        </div>
        <div className="comments">
        <h3 className='comments-header'> Comments:</h3>
        <div className="comments-body">
        {comments && comments.map((comment)=>(
        <div key={comment.comment_id} className='comment' >
            <p style={{width:'60%'}}>{comment.comment}</p>
            {comment.name && <p><strong>By: </strong> {comment.name}</p>}
        </div>))}
        </div>
        
                <CommentForm className='comments-form'/>
        
        </div>


        </div>




     );
}
 
export default TicketDetails;