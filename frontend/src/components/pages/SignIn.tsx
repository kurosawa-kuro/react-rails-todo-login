import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signIn } from "lib/api/auth";
import { SignInParams } from "interfaces/index";

const formStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  padding: '1rem',
  margin: '3rem auto',
  border: '1px solid #ddd',
  borderRadius: '5px'
};

const buttonStyles: React.CSSProperties = {
  marginTop: '1rem'
};

// サインイン用ページ
const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password
    };

    try {
      const res = await signIn(params);
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
      <form noValidate autoComplete="off" style={formStyles}>
        <h2>Sign In</h2>
        <input
          required
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          required
          placeholder="Password (At least 6 characters)"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button
          type="submit"
          disabled={!email || !password}
          style={buttonStyles}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          Don't have an account? &nbsp;
          <Link to="/signup">Sign Up now!</Link>
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
}

export default SignIn;
