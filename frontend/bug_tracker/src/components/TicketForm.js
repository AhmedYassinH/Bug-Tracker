import { useState } from "react"


const ProjectForm = (id) => {
    
    const project_id = id.id

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async(e)=>{
      e.preventDefault();
      
      const ticket = {name,project_id,type,status} ;

      const response = await fetch('/api/tickets',{
        method: 'POST',
        body: JSON.stringify(ticket),
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
      <h3>Create a New Ticket:</h3>

      <label>Ticket Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}

      />

     <label>Status:</label>
      <select name="drop-down" id="drop-down">
      <option value={status} onChange={(e) => setStatus(e.target.value)}>OPEN</option>
      <option value={status} onChange={(e) => setStatus(e.target.value)}>In Progress</option>
      <option value={status} onChange={(e) => setStatus(e.target.value)}>Resolved</option>
      <option value={status} onChange={(e) => setStatus(e.target.value)}>CLOSED</option>
      </select>

      <label>Type:</label>
      <select name="drop-down" id="drop-down">
      <option value={type} onChange={(e) => setType(e.target.value)}>Task</option>
      <option value={type} onChange={(e) => setType(e.target.value)}>Issue</option>
      </select>



      <button>Add Ticket</button>

    </form>
  )
}

export default ProjectForm ;