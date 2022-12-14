import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProjectDetails from './components/ProjectsComponents/ProjectDetails';
import TicketDetails from './components/TicketsComponents/TicketDetails';
import Login from './pages/Login'
import Signup from './pages/Signup'

import { useAuthContext } from './hooks/useAuthContext'




function App() {

  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
              <Route 
              path="/project/:id" 
              element={<ProjectDetails/>} 
            />
            <Route
            path="/ticket/:id"
            element={<TicketDetails/>}
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
