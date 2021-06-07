import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    const activeStyle = {
        color: "White",
        bg: "Black"
    };
    return (
        <nav className="navbar navbar-dark bg-dark">
            <NavLink exact activeStyle={activeStyle} to="/">
                Home
            </NavLink>
            <NavLink activeStyle={activeStyle} to="/placeHolder">
                Placeholder
            </NavLink>
        </nav>
    );
}

export default NavBar;