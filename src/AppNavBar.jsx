import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function AppNavBar({active}) {
    return (
        <nav className="navbar justify-content-center">
            <Button
                component={Link}
                to={"/"}
                className="m-2"
                variant={`${active === "name" ? "contained" : "outlined"}`}
            >
                By name
            </Button>
            <Button
                component={Link}
                to={"/SearchByIngredient"}
                className="m-2"
                variant={`${active === "ingredient" ? "contained" : "outlined"}`}
            >
                By ingredient
            </Button>
        </nav>
    );
}