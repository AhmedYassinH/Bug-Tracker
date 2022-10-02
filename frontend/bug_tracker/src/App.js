import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProjectDetails from './components/ProjectDetails';
import TicketDetails from './components/TicketDetails';

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

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
