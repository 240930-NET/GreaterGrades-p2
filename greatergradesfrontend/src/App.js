import './App.css';
import './styles/student.css';
import './styles/sidebar.css';
import './styles/header.css';
import './styles/profile.css';
import './styles/tiles.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useLogin, useGetUserById, useGetUserByUsername } from './greatergradesapi/Auth';
import { checkExpired, setStorageItem } from './functions/functions';
import { useEffect } from 'react';

function App() {
  
  const token = useLogin('admin', 'admin');
  const user = useGetUserByUsername("admin");

  useEffect(() => {
    if (token) setStorageItem('authToken', token);

    if (user) setStorageItem('currentUser', user);
  }, [token, user])

  if (checkExpired('authToken')) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;