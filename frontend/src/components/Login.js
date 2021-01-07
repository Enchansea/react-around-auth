import React, { useState } from 'react';
import DarkForm from './DarkForm';

function Login (props) {

  const [ username, setUsername] = useState();
  const [ password, setPassword ] = useState();


  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <DarkForm name="theme-dark" title="Login" buttonText="Log in" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="login-name" name="username" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Email" required />
      <input className="login-password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Email" required />

    </DarkForm>
  )
}

export default Login;
