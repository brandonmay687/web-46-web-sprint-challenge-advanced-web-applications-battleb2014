import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';

const Login = () => {
  const { push } = useHistory();

  const initialState = {
    username: '',
    password: ''
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ state, setState ] = useState( initialState );
  const [ error, setError ] = useState('');
  //replace with error state
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();

    return axios.post('http://localhost:5000/api/login', state)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username);
      console.log(res.data.data.token);

      setError('');

      push('/bubble');
    })
    .catch(() => setError('Incorrect username or password'))
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit = { handleSubmit }>
            <input
                type = 'text'
                name = 'username'
                id = 'username'
                value = { state.username }
                onChange = { handleChange }
                placeholder = 'Username...'
            />
            <input
                type = 'password'
                name = 'password'
                id = 'password'
                value = { state.password }
                onChange = { handleChange }
                placeholder = 'Password...'
            />
          <button id = 'submit'>Login</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"