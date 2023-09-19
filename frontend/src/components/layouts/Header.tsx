import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { signOut } from "lib/api/auth";
import { AuthContext } from "App";

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return <button onClick={handleSignOut}>Sign out</button>;
      } else {
        return (
          <>
            <Link to="/signin">
              <button>Sign in</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className="appBar">
      <div className="toolbar">
        <button className="menuButton">Menu</button>
        <Link to="/" className="titleLink">
          Sample
        </Link>
        <AuthButtons />
      </div>
    </div>
  );
};

export default Header;
