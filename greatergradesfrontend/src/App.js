/*

import './App.css';
import './styles/student.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {

  const [token, setToken] = useState(localStorage.getItem('authToken') || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchToken = async () => {
      if (!token) {
        const response = await fetch('http://localhost:5000/api/Auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              username: "admin",
              password: "admin"
          })
        });
        const data = await response.json();
        setToken(data);
        localStorage.setItem('authToken', data?.token)
      }
    };

    const fetchUser = async () => {
      const response = await fetch('http://localhost:5000/api/Auth/2', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUser(data);
      localStorage.setItem('currentUser', JSON.stringify(data));
    };

    const initialize = async () => {
      await fetchToken();
      if (localStorage.getItem('authToken')) {
        await fetchUser();
      }
      setLoading(false)
    };

    initialize();
  }, []);





  // useEffect(() => {
  //     const fetchTokenAndUser = async () => {
  //       try {
  //         if (!token){
  //           const tokenResponse = await fetch('http://localhost:5000/api/Auth/login', {
  //             method: 'POST',
  //             headers: {'Content-Type': 'application/json'},
  //             body: JSON.stringify({
  //                 username: "admin",
  //                 password: "admin"
  //             })
  //           });
  //           const tokenData = await tokenResponse.json();
  //           setToken(tokenData);
  //           localStorage.setItem('authToken', tokenData?.token)
  //         }

  //         const userResponse = await fetch('http://localhost:5000/api/Auth/2', {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  //             'Content-Type': 'application/json'
  //           }
  //         });
  //         const userData = await userResponse.json();
  //         setUser(userData);
  //         localStorage.setItem('currentUser', JSON.stringify(userData));
          
  //       } catch {

  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchTokenAndUser();
  // }, [token]);

  if (loading) {
    return <div>loading....</div>
  }
    

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;

*/











import './App.css';
import './styles/student.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {

  //// Fetch admin login and set authentication token
  const [token, setToken] = useState("");
    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch('http://localhost:5000/api/Auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: "admin",
                    password: "admin"
                })
            });
            const data = await response.json();
            setToken(data);
        }
        fetchToken();
    }, []);
    

    useEffect(() => {
      if (token) {
        localStorage.setItem('authToken', token?.token);
      }
    }, [token]);

    ///// Fetch admin by id (2) and set role
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
          try{
          const response = await fetch('http://localhost:5000/api/Auth/2', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json();
          setUser(data);
          } catch{
          }
        }
      fetchUser();
    }, [token]);

    useEffect(() => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }, [user]);




  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;

















