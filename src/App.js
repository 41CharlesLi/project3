import "./App.css";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import { signOut } from "firebase/auth";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Header from "./Header";
import Form from "./Form";
import BlogSection from "./BlogSection";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <Router>
            <Header isAuth={isAuth} signOut={signOut} setIsAuth={setIsAuth} />
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route
                    path="/createpost"
                    element={
                        <CreatePost isAuth={isAuth} navigate={useNavigate} />
                    }
                />
                <Route
                    path="/login"
                    element={<Login setIsAuth={setIsAuth} />}
                />
            </Routes>
            <section className="main">
                <div className="wrapper">
                    <div className="mainSection">
                        {/* <BlogSection /> */}
                        {/* <Form /> */}
                    </div>
                </div>
            </section>
        </Router>
    );
}

export default App;
