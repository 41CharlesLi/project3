import logo from "./assets/logo2.jpg";

const Header = () => {
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
                            <li>Home</li>
                            <li>Login</li>
                            <li>Create Post</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
