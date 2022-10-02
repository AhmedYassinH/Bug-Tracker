import { useState } from "react"


const ProjectForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async(e)=>{
      e.preventDefault();

      const project = {name,description} ;

      const response = await fetch('/api/projects',{
        method: 'POST',
        body: JSON.stringify(project),
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
      <h3>Add a New Project:</h3>

      <label>Project Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}

      />

      <label>Description:</label>
      <textarea 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Status:</label>
      <select name="drop-down" id="drop-down">
      <option value={status} onChange={(e) => setStatus(e.target.value)}>OPEN</option>
      <option value={status} onChange={(e) => setStatus(e.target.value)}>CLOSED</option>
      </select>

      <button>Add Project</button>

    </form>
  )
}

export default ProjectForm ;