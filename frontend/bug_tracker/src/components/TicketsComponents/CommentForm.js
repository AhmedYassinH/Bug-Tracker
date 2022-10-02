import { useState } from "react";
import { useParams } from "react-router-dom";



const CommentForm = () => {

  const {id} = useParams();
  const [comment,setComment] = useState('');

  const handleSubmit= async(e)=>{

    e.preventDefault();

    const req_body = {comment} ;

    const response = await fetch('/api/tickets/comment/'+id,{
      method: 'POST',
      body: JSON.stringify(req_body),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    const json = await response.json();

    if(response.ok){
      console.log(json);
    }
  }

    
    return ( 
        <form className="create" onSubmit={handleSubmit}>
        <h3>Create a New Comment:</h3>
  
        <label>Comment:</label>
        <textarea value={comment} onChange={(e)=> setComment(e.target.value)}  cols="30" rows="10"></textarea>
        
        <button>Add Comment</button>
  
      </form>
     );
}
 
export default CommentForm;