import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Sidebar from './components/Sidebar';

import Wrapper from './pages/Wrapper'
import { useEffect } from 'react';




function App() {

  const { user } = useAuthContext()
  
  if (user === undefined) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/signup" element={ <Signup /> } />
            <Route path="/*" element={ <Login />}/>
          </Routes>
        </BrowserRouter>
      </div>
    ); // or loading indicator, etc...
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/*" element={ <Wrapper/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
