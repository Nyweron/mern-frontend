import React, { useState, useContext } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginInMode, setIsLoginInMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginInMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginInMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2> Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginInMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          {!isLoginInMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Min length of password is 6 letters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginInMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginInMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
