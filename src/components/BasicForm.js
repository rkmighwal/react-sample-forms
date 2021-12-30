import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) =>
  !!value && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: firstNameIsInvalid,
    inputBlurHandler: firstNameInputBlurHandler,
    isValid: firstNameIsValid,
    reset: resetFirstName,
    valueChangeHandler: firstNameInputChangeHandler,
  } = useInput(isNotEmpty);
  const {
    value: lastName,
    hasError: lastNameIsInvalid,
    inputBlurHandler: lastNameInputBlurHandler,
    isValid: lastNameIsValid,
    reset: resetLastName,
    valueChangeHandler: lastNameInputChangeHandler,
  } = useInput(isNotEmpty);
  const {
    value: mail,
    isValid: mailIsValid,
    hasError: mailIsInvalid,
    valueChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMail,
  } = useInput(isEmail);

  const formIsValid = firstNameIsValid && mailIsValid && lastNameIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if(!formIsValid) {
      return;
    }

    console.log('Submitted');
    console.log(firstName, lastName, mail);
    resetMail();
    resetFirstName();
    resetLastName();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={`form-control ${firstNameIsInvalid ? "invalid" : ""}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {firstNameIsInvalid && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={`form-control ${lastNameIsInvalid ? "invalid" : ""}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameIsInvalid && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={`form-control ${mailIsInvalid ? "invalid" : ""}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={mail}
          onChange={mailInputChangeHandler}
          onBlur={mailInputBlurHandler}
        />
        {mailIsInvalid && <p className="error-text">Please enter a valid mail.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
