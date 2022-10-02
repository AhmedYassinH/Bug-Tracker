import { useState } from "react";
import { useParams } from "react-router-dom";



const CommentForm = () => {

  const {id} = useParams();
  const [comment,setComments] = useState('');


    
    return ( 
        <form className="create" >
        <h3>Create a New Comment:</h3>
  
        <label>Comment:</label>
        <textarea value={comment} onChange={(e)=> e.target.value} id="" cols="30" rows="10"></textarea>
        
        <button>Add Comment</button>
  
      </form>
     );
}
 
export default CommentForm;