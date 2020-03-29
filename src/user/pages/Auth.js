import React from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";

const Auth = () => {
  const [formState, inputHandler] = useForm(
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
    console.log(formState.inputs);
  };
  console.log(formState);
  return (
    <>
      <Card className="authentication">
        <h2> Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
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
            LogIn
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Auth;
