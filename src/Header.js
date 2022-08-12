import logo from "./assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";
import headerText from "./assets/headerText.png";
import video from "./assets/magicTheGatheringHeader.mp4";
import poster from "./assets/headerImg.jpg";

const Header = ({ isAuth, signOut, setIsAuth }) => {
    const [showNav, setShowNav] = useState(false);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/";
        });
    };

    const showMenu = () => {
        setShowNav(!showNav);
    };

    return (
        <header>
            <div className="wrapper">
                <div className="navContainer">
                    <a href="./">
                        <img
                            src={logo}
                            alt="a wizard in a blue cap"
                            className="logo"
                        />
                    </a>
                    <nav className="navContainer">
                        <ul className={showNav ? "navList show" : "navList"}>
                            <li
                                onClick={() => {
                                    showMenu();
                                }}
                            >
                                {" "}
                                <Link to="/" className="navLink">
                                    {" "}
                                    Home{" "}
                                </Link>
                            </li>

                            {!isAuth ? (
                                <li
                                    onClick={() => {
                                        showMenu();
                                    }}
                                >
                                    <Link to="/login" className="navLink">
                                        {" "}
                                        Login{" "}
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li
                                        onClick={() => {
                                            showMenu();
                                        }}
                                    >
                                        <Link
                                            to="/createpost"
                                            className="navLink"
                                        >
                                            {" "}
                                            Create Post{" "}
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => {
                                            showMenu();
                                        }}
                                    >
                                        <button
                                            onClick={signUserOut}
                                            className="logOutBtn"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        <button
                            class="hamburger-menu desktop-hidden"
                            onClick={() => {
                                showMenu();
                            }}
                        >
                            <span class="sr-only">hamburger menu</span>
                            <i class="fa fa-bars"></i>
                        </button>
                    </nav>
                </div>
            </div>
            <div className="headerImgContainer">
                <video
                    src={video}
                    autoPlay="autoplay"
                    muted="muted"
                    loop="loop"
                    poster={poster}
                    className="headerVideo"
                ></video>
                <img
                    src={headerText}
                    alt="build gallery text"
                    className="headerText"
                />
            </div>
        </header>
    );
};

export default Header;
