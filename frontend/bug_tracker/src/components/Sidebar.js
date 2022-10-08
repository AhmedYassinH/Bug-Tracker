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


import {  Link} from 'react-router-dom'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'




const Sidebar = () => {

const { logout } = useLogout()
const { user } = useAuthContext()

const handleClick = () => {
  logout()
}







  return ( 

      <div style={{display:'flex',height:'100vh'}}>
        <CDBSidebar textColor="white" backgroundColor="#354052" style={{ flex:'1 1 auto' ,height:'100%'}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" style={{ paddingBottom: '15px' }}/>} >
          <div className="container" style={{ display: 'flex', alignItems: 'start' }}>
            <img
              src={'/bug.png'}
              alt="bug"
              style={{ width: '30px', marginRight:'12px' }}
            />
            <h6 className="ml-2">Bug Tracker ™</h6>
          </div>
        <p style={{display:'inline-block',fontSize:'12px', marginTop:'20px',fontWeight:'400' }}> Logged in as <strong>{user?.name}</strong></p>
        </CDBSidebarHeader>
        
        <CDBSidebarContent>
          <CDBSidebarMenu >
          <CDBSidebarMenuItem icon="th-large"><Link to="/">Dashboard</Link></CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note"><Link to="/mytickets">My Tickets</Link></CDBSidebarMenuItem>
            
          <CDBSidebarMenuItem style={{marginLeft:'2em' , marginTop:'4em'}}>
            <Button variant="outline-danger" size="lg" onClick={handleClick}>Logout</Button>
          </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      </div>


   );
}

export default Sidebar;