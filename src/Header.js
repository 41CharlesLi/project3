import logo from "./logo2.png";

const Header = () => {
    return (
        <header>
            <div className="headerWrapper wrapper">
                <a href="./">
                    <img
                        src={logo}
                        alt="a wizard in a blue cap"
                        className="logo"
                    />
                </a>
                <nav className="navLinks">
                    <ul>
                        <li>Home</li>
                        <li>Login</li>
                        <li>Create Post</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
