import React from 'react';
import PopupThemeDark from './PopupThemeDark';

function Login (props) {


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateLogin(
      email,
      password
    );
  }

  return (
    <PopupThemeDark name="theme-dark" title="Login" buttonText="Log in" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>


    </PopupThemeDark>
  )
}

export default Login;
