import { useState } from "react";

const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const valueBlurHandler = (event) => {
    setWasTouched(true);
  };

  const reset = () => {
    setValue("");
    setWasTouched(false);
  };

  return {
    value,
    wasTouched,
    valueIsValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
