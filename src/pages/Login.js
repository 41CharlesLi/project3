import React from "react";
import { auth, provider, anonProvider } from "../firebase-config";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };
    const signInAnon = () => {
        signInAnonymously(auth).then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };

    return (
        <div className="loginPage">
            <h1>Sign in to Continue</h1>
            <button
                className="login-with-google-btn"
                onClick={signInWithGoogle}
            >
                Sign in With Google
            </button>
            <button onClick={signInAnon}>Sign in Anonymously</button>
        </div>
    );
}
export default Login;
