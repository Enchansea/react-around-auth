import React, { useState, useEffect } from 'react';
import {  useHistory, Link } from 'react-router-dom';
import * as aroundAuth from '../utils/aroundAuth';

function Register (props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  function handleSubmit(e) {
    e.preventDefault();

      if (!username || password) {
        return;
      }

    aroundAuth.register(username, password)
    .then((res) => {
      if (!res || res.statusCode === 400)
        throw new Error('Error!!!');
      return res;
    })
    .then(resetForm)
    .then(() => {
      history.push('/login');
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      history.push('/');
    }
  }, [history])

  return (
    <div>
    <form action="#" className="login" onSubmit={handleSubmit}>
      <h3 className="login__title">Sign Up</h3>
      <input className="login__input" name="username" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Email" required />
      <input className="login__input" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" className="login__button">Sign Up</button>
      <div>
        <Link to="signin" className="login__note">Already a member? Sign in here!</Link>
      </div>
    </form>
  </div>
  )
}

export default Register;
