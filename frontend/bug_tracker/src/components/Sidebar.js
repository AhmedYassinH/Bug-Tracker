import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
   
  } from 'cdbreact';

  
  import {
    Button,
 } from 'react-bootstrap';


 import { Routes, Route} from 'react-router-dom'

import ProjectDetails from './ProjectsComponents/ProjectDetails'
 import TicketDetails from './TicketsComponents/TicketDetails'


 import { useLogout } from '../hooks/useLogout'
 import { useAuthContext } from '../hooks/useAuthContext'
import Home from '../pages/Home';



const Sidebar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }







    return ( 
      <div className="sidebar" style={{display:'flex'}}>
          <CDBSidebar textColor="white" backgroundColor="#354052" style={{ height: '100vh' }}>
          <CDBSidebarHeader prefix={<i className="fa fa-bars" style={{ paddingBottom: '15px' }}/>} >
            <div className="container" style={{ display: 'flex', alignItems: 'start' }}>
              <img
                src={'/bug.png'}
                alt=""
                style={{ width: '30px', marginRight:'12px' }}
              />
              <h6 className="ml-2">Bug Tracker ™</h6>
            </div>
          <p style={{display:'inline-block',fontSize:'12px', marginTop:'20px',fontWeight:'400' }}> Logged in as <strong>Ahmed Yassin</strong></p>
          </CDBSidebarHeader>
          
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="sticky-note">My Tickets</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>
              <Button variant="outline-danger" size="lg"  style={{marginLeft:'2em' , marginTop:'4em'}} onClick={handleClick}>Logout</Button>
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>



        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="project/:id" element={<ProjectDetails/>}/>
          <Route path="ticket/:id"  element={<TicketDetails/>}/>
          
        </Routes>

      </div>
     );
}
 
export default Sidebar;