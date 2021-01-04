import React from 'react';
import DarkForm from './DarkForm';

function SignUp (props) {


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateLogin(

    );
  }

  return (
    <DarkForm name="theme-dark" title="signup" buttonText="Sign up" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>


    </DarkForm>
  )
}

export default SignUp;
