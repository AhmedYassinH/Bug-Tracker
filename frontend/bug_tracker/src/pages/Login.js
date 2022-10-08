import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

import { Link } from "react-router-dom"


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div><img className='background' src="/background.jpg" alt="background" />
    <form className="login" onSubmit={handleSubmit} >
      
    <div className="container" style={{ display: 'flex', alignItems: 'start',marginBottom:"20px", }}>
      <img
        src={'/bug.png'}
        alt=""
        style={{ width: '30px', marginRight:'12px' }}
      />
      <h6 className="ml-2">Bug Tracker ™</h6>
    </div>
      <h3>Log In</h3>
      
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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <p className='account-check'>Already have an account? <Link to="/signup">Signup</Link></p>
    </form>
    </div>
  )
}

export default Login