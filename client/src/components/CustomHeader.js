
import { NavLink, useLocation, useParams } from "react-router-dom";
import "./../App.css";
import React, { useEffect, useState } from "react";

function CustomHeader() {
    const location = useLocation();

    const [locationString, setLocationString] = useState("Recipes app");
    useEffect(() => {
        var path = location.pathname.toString();
        var newHeaderTitle = "Recipes app";
        if (path.includes("recipe_detail")) {
            newHeaderTitle += "-Detail";
        } else if (path.includes("/add_recipe")) {
            newHeaderTitle += "-Create Recipe";
        }
        setLocationString(newHeaderTitle);
    }
        , [location]);


return (
    <header className="app__header">
       
        <h1>{locationString}</h1>
        <div className="app__header__links">
       <NavLink
            to={`/`}
        >home
        </NavLink>
        <NavLink
            to={`/add_recipe`}
        >add recipe
        </NavLink>
        </div>
    </header>

);
}

export default CustomHeader;
