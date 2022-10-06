import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import { useUser } from "../../context/UserContext";
import { storageSave } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY_USER } from "../../const/storageKey";

const usernameConfig = {
  required: true,
  minLength: 3,
};

const LoginForm = () => {
  // Hooks
  // formState validates the form, e.g if the users doesn't fills inte the values correctly.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  //Local States
  const [apiError, setApiError] = useState(null);

  //Side Effects
  useEffect(() => {
    if (user !== null) {
      navigate("/translation");
    }
  }, [user, navigate]);

  //Event Handlers
  const onSubmit = async ({ username }) => {
    const [error, userResponse] = await loginUser(username);
    if (error !== null) {
      setApiError(error);
    }
    if (userResponse !== null) {
      //Saves user data in session storage
      storageSave(STORAGE_KEY_USER, userResponse);
      setUser(userResponse);
    }
  };

  //Render Functions
  //Gives user an error message based on username input
  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }

    if (errors.username.type === "required") {
      return <span>Username is required</span>;
    }

    if (errors.username.type === "minLength") {
      return <span>Username is too short</span>;
    }
  })();

  return (
    <>
      <div className="container">
        <h1 className="logIn">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="username">
            Username
          </label>
          <input
            type="text"
            className="usernameInput"
            placeholder="johndoe"
            {...register("username", usernameConfig)}
          />
          <br />
          {errorMessage}
          <br />
          <button type="submit" className="btnContinue">
            Continue
          </button>
          {apiError && <p>{apiError}</p>}
        </form>
      </div>
    </>
  );
};
export default LoginForm;
