import React from 'react';

function DarkForm(props) {

  return (


    <form action="#" className={`popup__form`} noValidate name={props.name} onSubmit={props.onSubmit}>
      <h3 className="Form__title">{props.title}</h3>
      {props.children}
      <button type="submit" className={`form__button popup__submit-button`}>{props.buttonText} </button>
      <p className="form__note">{props.note}</p>
    </form>

  )
}

export default DarkForm;
