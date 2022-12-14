import React, { useState, useRef, useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const loginEl = useRef(null);

    //create state to know if user made error logging in
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        const executeScroll = () => {
            loginEl.current.scrollIntoView();
        };
        executeScroll();
    }, []);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userName", auth.currentUser.displayName);
                localStorage.setItem("userId", auth.currentUser.uid);
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
        <section className="loginSection">
            <div className="wrapper">
                <div className="loginPage">
                    <div className="loginHeadingContainer">
                        <h1 ref={loginEl}>Sign in to Continue</h1>
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
        </section>
    );
}
export default Login;
