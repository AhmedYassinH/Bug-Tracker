import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Sidebar from './components/Sidebar';






function App() {

  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/*" element={<Sidebar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
