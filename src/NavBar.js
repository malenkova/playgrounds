import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul className="flex flex-row text-xl mx-6">
                <li className="mr-6">
                    <Link to="/">Home</Link>
                </li>
                <li className="mr-6">
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contacts">Contacts</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
