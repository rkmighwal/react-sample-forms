import React from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameIsInvalid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: mail,
    isValid: mailIsValid,
    hasError: mailIsInvalid,
    valueChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMail,
  } = useInput(
    (value) =>
      !!value && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  );

  let formIsValid = false;

  if (nameIsValid && mailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(name);
    console.log(mail);

    resetName();
    resetMail();
  };

  const nameInputClasses = nameIsInvalid
    ? "form-control invalid"
    : "form-control";

  const mailInputClasses = mailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={mailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={mailInputChangeHandler}
          onBlur={mailInputBlurHandler}
        />
        {mailIsInvalid && (
          <p className="error-text">Email must be valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
