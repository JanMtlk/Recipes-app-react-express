import "./../App.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
    NavLink,
} from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

import Button from '@mui/material/Button';
import { Card, CardHeader, TextField } from "@mui/material";

function HomeScreen() {
    const [fetchedRecipes, setFetchedRecipes] = useState(null);
    // filters
    const [titleQuery, setTitleQuery] = useState("");
    const [ingredientsField, setIngredientsField] = useState("");
    const [ingredientsFilter, setIngredientsFilter] = useState([]);

    useEffect(() => {
        fetch("/recipes")
            .then((res) => res.json())
            .then((data) => {
                setFetchedRecipes(data)
                console.log(data)
            }
            );
    }, []);
    const filterRecipes = useCallback((recipes) => {
        var newFilteredRecipes = recipes

        if (recipes !== null && typeof recipes !== "undefined") {
            newFilteredRecipes = recipes.filter((recipe) => {
                var titleMatch = true;
                var ingredientsMatch = true;
                if (titleQuery !== "") {
                    titleMatch = recipe.title.toLowerCase().includes(titleQuery.toLowerCase());
                }
                if (ingredientsFilter.length > 0) {
                    // is every ingredientFilter somewhere in the ingredients array of the recipe check it with contains on each ingredient
                    ingredientsMatch = ingredientsFilter.every((ingredientFilter) => recipe.ingredients.some((ingredient) => {
                        // if ingredient is null or undefined return false
                        if (ingredient === null || typeof ingredient === "undefined") {
                            return false;
                        }
                        return ingredient.toLowerCase().includes(ingredientFilter.toLowerCase())
                    }));
                }
                return titleMatch && ingredientsMatch;
            });
        }
        return newFilteredRecipes;
    }
        , [titleQuery, ingredientsFilter]);
    const filteredRecipes = useMemo(() => {
        return filterRecipes(fetchedRecipes);
    }
        , [fetchedRecipes, filterRecipes]);



    return (
        <div className="app">
            <CustomHeader />
            <section className="col">
                <div className="row">

                    <TextField id="filled-basic" label="Search by title..." variant="filled" value={titleQuery} onChange={(e) => setTitleQuery(e.target.value)} />
                    <TextField id="filled-basic" label="search by ingredients..." variant="filled" value={ingredientsField} onChange={(e) => setIngredientsField(e.target.value)} />
                    <Button variant="contained" onClick={(e) => {
                        e.preventDefault();
                        //add new ingredient to filter and because it is more intuitive then search it right away
                        setIngredientsFilter([...ingredientsFilter, ingredientsField]);
                        setIngredientsField("");
                    }}>add ingredient</Button>
                </div>
                {ingredientsFilter.length === 0 ? "" :   <div className="row">
                    Included ingredients:
                        {ingredientsFilter.map((ingredient) => (
                            <Card className="ingredient_filter_card">
                               
                                <div>{ingredient}</div>
                                <Button variant="text" onClick={(e) => {
                                    e.preventDefault();
                                    setIngredientsFilter(ingredientsFilter.filter((item) => item !== ingredient))
                                }}>x</Button>

                            </Card>
                        ))}
                    </div>}
                
                <div className="row">

                    
                  
                </div>

            </section>
            <div className="app_recipes_list">
                {(filteredRecipes === null || typeof filteredRecipes === "undefined") ? "Loading..." : filteredRecipes.map(
                    (user) => (

                        <Card className="app__recipe">
                            <NavLink
                                to={`/recipe_detail/:id=${user.recipe_id}`}
                             
                                key={user.title}
                                className="app__recipe__link"
                            >

                                <h2 >{user.title}</h2>
                                <div className="row"><p className="p-1">{user.difficulty}</p></div>
                            </NavLink>
                        </Card>


                    )

                )}
            </div>
        </div>
    );
}

export default HomeScreen;
