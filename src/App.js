import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axiosWithAuth from './helpers/axiosWithAuth';

import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post('/logout')
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
      })
      .catch(err => console.log(err))
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a onClick = { logout } data-testid="logoutButton" href = { window.location.href }>logout</a>

        </header>
        <Route exact path = '/' component = { Login } />
        <Route path = '/login' component = { Login } />
        <PrivateRoute path = '/bubble' component = { BubblePage } />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.