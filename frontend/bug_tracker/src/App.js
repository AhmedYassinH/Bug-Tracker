import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProjectDetails from './components/ProjectsComponents/ProjectDetails';
import TicketDetails from './components/TicketsComponents/TicketDetails';
import Login from './pages/Login'
import Signup from './pages/Signup'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home/>} 
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
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup /> } 
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
