
  
  
  import { useAuthContext } from '../hooks/useAuthContext'
  import { Routes, Route, useNavigate} from 'react-router-dom'
  
  import ProjectDetails from '../components/ProjectsComponents/ProjectDetails'
  import TicketDetails from '../components/TicketsComponents/TicketDetails'
  import Sidebar from '../components/Sidebar';
  


import Home from './Home';
import { useEffect } from 'react';
import MyTickets from './MyTickets';
  
  
  
  const Wrapper = () => {
  
  const { user,dispatch } = useAuthContext();
  const navigate = useNavigate();



  useEffect(()=>{
    console.log("Here is the user",user)


    if(!user){
      navigate('/login')
    }
    

  },[])




  

  
  
  
  
  
    return ( 
      <div className='wrapper' >
        <Sidebar/>
  
  
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="project/:id" element={<ProjectDetails/>}/>
          <Route path="ticket/:id"  element={<TicketDetails/>}/>
          <Route path="mytickets"  element={<MyTickets/>}/>
          
        </Routes>
  
      </div>
     );
  }
  
  export default Wrapper;