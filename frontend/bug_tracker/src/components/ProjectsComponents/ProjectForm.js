import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

const ProjectForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')


    const [error, setError] = useState(null)
    
    const { user } = useAuthContext()

    const handleSubmit = async(e)=>{
      e.preventDefault();

      if (!user) {
        setError('You must be logged in')
        return
      }

      const project = {name,description} ;

      const response = await fetch('/api/projects',{
        method: 'POST',
        body: JSON.stringify(project),
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
        setName('')
        setDescription('')
        setStatus('')
        setError(null)
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
        required

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
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default ProjectForm ;