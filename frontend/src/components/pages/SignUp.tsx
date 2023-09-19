import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <div>
          <h2>Sign Up</h2>
          <div>
            <label>
              Name:
              <input
                required
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                required
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
            </label>
            <label>
              Password Confirmation:
              <input
                required
                type="password"
                value={passwordConfirmation}
                autoComplete="current-password"
                onChange={event => setPasswordConfirmation(event.target.value)}
              />
            </label>
            <button
              type="submit"
              disabled={
                !name || !email || !password || !passwordConfirmation ? true : false
              }
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </>
  );
};

export default SignUp;
