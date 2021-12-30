import { useReducer } from "react";

const INITIAL_STATE = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "changed") {
    return { value: action.value, isTouched: state.isTouched };
  } else if (action.type === "touched") {
    return { isTouched: true, value: state.value };
  } else if (action.type === "reset") {
    return INITIAL_STATE;
  }

  return INITIAL_STATE;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, INITIAL_STATE);

  const valueIsValid = validateValue(inputState.value);
  const hasError = inputState.isTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    dispatch({ type: "changed", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "touched" });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
