import React, { useState, useContext } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginInMode, setIsLoginInMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log("LOGIN");
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }

    setIsLoginInMode(prevMode => !prevMode);
    console.log("SIGNIN");
  };

  return (
    <>
      <Card className="authentication">
        <h2> Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginInMode && (
            <Input
              element="input"
              id="name"
              text="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            label="Email"
            element="input"
            placeholder="Email"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Write correct email address."
            onInput={inputHandler}
          />

          <Input
            id="password"
            label="Password"
            element="input"
            placeholder="Password"
            type="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Min length of password is 5 letters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginInMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <Button inverse onClick={switchModeHandler}>
            Switch to {isLoginInMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Auth;
