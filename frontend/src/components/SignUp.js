import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import DarkForm from './DarkForm';
import * as aroundAuth from '../aroundAuth';

function SignUp (props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  function handleSubmit(e) {
    e.preventDefault();


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

  // useEffect(() => {
  //   if(localStorage.getItem('jwt')) {
  //     history.push('/main');
  //   }
  // }, [])

  return (
    <DarkForm name="theme-dark" title="signup" buttonText="Sign up" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="login-name" name="username" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Email" required />
      <input className="login-password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Email" required />

    </DarkForm>
  )
}

export default SignUp;
