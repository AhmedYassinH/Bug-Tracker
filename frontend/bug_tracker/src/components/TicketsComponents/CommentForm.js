import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from '../../hooks/useAuthContext'
import { useStateContext } from "../../context/ContextProvider";



const CommentForm = () => {

  const {id} = useParams();
  const {comments,setComments} = useStateContext()
  const [comment,setComment] = useState('');
  console.log('here is past comments',comments)

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
      setComments(json.comments);

    }
  }

    
    return ( 
        <form className="create-comment" onSubmit={handleSubmit}>
        <h3>Create a New Comment:</h3>
  
        <label>Comment:</label>
        <br />
        <textarea 
        value={comment}
         onChange={(e)=> setComment(e.target.value)}
           rows="5"
           required
           style={{width:'800px', minWidth:'200px',justifySelf:'center'}}
           ></textarea>
        <br />
        <button>Add Comment</button>
        {error && <div className="error">{error}</div>}
  
      </form>
     );
}
 
export default CommentForm;