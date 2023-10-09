import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import AdminUserDashboard from './components/AdminUserDashboard';
import './App.css'


function App() {
  return (
    <React.Fragment>
    <Router>
      <AuthProvider>
      <Routes>  
      <Route exact path='/' element={<Home />} /> 
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/dashboard/:username' element={<AdminUserDashboard />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      </Routes>
      </AuthProvider>
    </Router>
  </React.Fragment>
  );
}

export default App;
