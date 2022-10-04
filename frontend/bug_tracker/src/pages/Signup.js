import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password,role)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>User Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

    <br />

    <div className="checkrole">
      <div className="role">
        <input type="checkbox"
        value="USER"
        onChange={(e)=> setRole(e.target.value)}
        checked = {role==='USER'? true:false }
        />
        <label> USER </label>
      </div>
      

      <div className="role">
        <input type="checkbox"
        value="ADMIN"
        onChange={(e)=> setRole(e.target.value)}
        checked = {role==='ADMIN'? true:false }
        
        />
        <label> ADMIN </label>
      </div>

    </div>
     
        
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup