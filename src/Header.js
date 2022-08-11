import logo from "./assets/logo2.jpg";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";

const Header = ({ isAuth, signOut, setIsAuth }) => {
    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        });
    };

    return (
        <header>
            <div className="wrapper">
                <div className="headerContainer">
                    <a href="./">
                        <img
                            src={logo}
                            alt="a wizard in a blue cap"
                            className="logo"
                        />
                    </a>
                    <nav className="navLinks">
                        <ul className="navList">
                            <Link to="/"> Home </Link>

                            {!isAuth ? (
                                <Link to="/login"> Login </Link>
                            ) : (
                                <>
                                    <Link to="/createpost"> Create Post </Link>
                                    <button onClick={signUserOut}>
                                        Log Out
                                    </button>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
