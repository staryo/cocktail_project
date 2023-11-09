import {Link} from "react-router-dom";

export default function AppNavBar({active}) {
    return (
        <nav className="navbar justify-content-center">
            <Link
                className={`btn btn-outline-success me-2 ${active === 'name'? "active": ""}`}
                to="/"
            >
                By name
            </Link>
            <Link
                className={`btn btn-outline-success me-2 ${active === 'ingredient'? "active": ""}`}
                to="/SearchByIngredient"
            >
                By ingredient
            </Link>
        </nav>
    );
}