import { useEffect, useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

const AddTeam = ({project_id}) => {

  
  const [error, setError] = useState(null)
    
  const { user } = useAuthContext()
  const [users, setUsers] = useState('')
  const [user_id, setUserId] = useState('')
  const [isLoading , setIsLoading] = useState('')

  useEffect(()=>{

      const fetchUsers = async()=>{
          const response = await fetch('/api/projects/users/',{
              headers: {'Authorization': `Bearer ${user.token}`},
            });

          const json = await response.json();

          if(response.ok){
              setUsers(json.users);
          }
      }

      if (user) {
          fetchUsers()
        }

  },[user])


  const handleSubmit = async(e)=>{
    setIsLoading(true)
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const response = await fetch('/api/projects/add-user/' + project_id,{

      method: 'POST',
      body: JSON.stringify({user_id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      
    }
    if (response.ok) {
      // setUserId('')
      setError(null)
    }
    setIsLoading(false)

  }
  console.log(users)
  console.log(user_id)
  return (
    <form className="create"  onSubmit={handleSubmit} >

      <br />
      <label><h5>Users to add:</h5></label>
      <select defaultValue={'DEFAULT'} onChange={(e) => setUserId(e.target.value)}>
      <option value="DEFAULT" disabled>Choose a user to add to the team ...</option>
     
       {users && users.map((user)=> (
          <option key={user.user_id}
           value={user.user_id} >{user.name} </option>
      ))} 

      </select>


      <button disabled = {isLoading}>Add To the Team</button>
      {error && <div className="error">{error}</div>}
      


    </form>
  )
}

export default AddTeam ;