import React, { useState } from 'react';
import DarkForm from './DarkForm';

function Login (props) {

  const [ username, setUserName] = useState();
  const [ password, setPassword ] = useState();


  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
  }

  function handleNameChange(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
    <DarkForm name="theme-dark" title="Login" buttonText="Log in" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="login-name" name="username" type="email" value={username} onChange={handleNameChange} placeholder="Email" required />
      <input className="login-password" name="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Email" required />

    </DarkForm>
  )
}

export default Login;
