import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();

    //create state to know if user made error logging in
    const [loginError, setLoginError] = useState(false);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                localStorage.setItem("isAuth", true);
                setLoginError(false);
                setIsAuth(true);
                navigate("/");
            })
            .catch((error) => {
                setLoginError(true);
            });
    };

    const signInAnon = () => {
        signInAnonymously(auth)
            .then(() => {
                localStorage.setItem("isAuth", true);
                setLoginError(false);
                setIsAuth(true);
                navigate("/");
            })
            .catch((error) => setLoginError(true));
    };

    return (
        <main>
            <div className="wrapper">
                <div className="loginPage">
                    <div className="loginHeadingContainer">
                        <h1>Sign in to Continue</h1>
                    </div>
                    <div className="loginContainer">
                        <button
                            className="login-with-google-btn loginBtn"
                            onClick={signInWithGoogle}
                        >
                            Sign in With Google
                        </button>
                        <button
                            onClick={signInAnon}
                            className="loginBtn anonLogin"
                        >
                            Sign in Anonymously
                        </button>
                        {loginError && (
                            <p className="errorMessage">
                                Login failed. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Login;
