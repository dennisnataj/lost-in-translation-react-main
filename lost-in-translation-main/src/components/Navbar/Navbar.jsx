import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import "../../App.css";

const Navbar = () => {
    const { user } = useUser()
    return (
        <nav>
            <ul>
                <li className="navText">Lost In Translation</li>
            </ul>
            {/* If user is logged in, show these links */}
            { user !== null &&
                <ul className="ul-nav">
                    <li>
                        <NavLink to="/profile">Profile: {user.username}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/translation">Translation</NavLink>
                    </li>
                </ul>
            }
        </nav>
    )
}
export default Navbar