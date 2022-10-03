import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from '../../hooks/useAuthContext'



const CommentForm = () => {

  const {id} = useParams();
  const [comment,setComment] = useState('');

  const [error, setError] = useState(null)
    
  const { user } = useAuthContext()

  const handleSubmit= async(e)=>{

    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }
    

    const req_body = {comment} ;

    const response = await fetch('/api/tickets/comment/'+id,{
      method: 'POST',
      body: JSON.stringify(req_body),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setComment('')
      setError(null)
    }
  }

    
    return ( 
        <form className="create" onSubmit={handleSubmit}>
        <h3>Create a New Comment:</h3>
  
        <label>Comment:</label>
        <textarea 
        value={comment}
         onChange={(e)=> setComment(e.target.value)}
           cols="30" rows="10"
           required
           ></textarea>
        
        <button>Add Comment</button>
        {error && <div className="error">{error}</div>}
  
      </form>
     );
}
 
export default CommentForm;