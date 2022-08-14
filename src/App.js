import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Header from "./Header";
// import Footer from "./Footer";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    return (
        <>
            <Header isAuth={isAuth} signOut={signOut} setIsAuth={setIsAuth} />
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route
                    path="/createpost"
                    element={<CreatePost isAuth={isAuth} />}
                />
                <Route
                    path="/login"
                    element={<Login setIsAuth={setIsAuth} />}
                />
            </Routes>
            {/* <Footer /> */}
        </>
    );
}

export default App;
