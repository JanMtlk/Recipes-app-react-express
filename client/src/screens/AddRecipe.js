import { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import "./../App.css";

import Button from '@mui/material/Button';
import { Card, TextField } from "@mui/material";

function AddRecipe() {
    const [newRecipe, setNewRecipe] = useState({
        title: "",
        ingredients: [],
        instructions: "",
        difficulty: "eazy",

    });

    const [inputValues, setInputValues] = useState([{ ingredientInput: "" }]);
    const createRecipe = (recipe) => {
        fetch("/add_recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    console.log(data.validationErrors);
                }
                if (data.recipe_id !== null && typeof data.recipe_id !== "undefined") {
                    window.location.href = "/recipe_detail/:id=" + data.recipe_id;
                    // http://localhost:3000/recipe_detail/:id=8
                }
                console.log(data);
                // window.location.href = "/";
            });
    }
    return (
        <div >
            <CustomHeader />
            <div className="p-10">
                


            <div className="col">
                {/* show fields that are connected to newrecipe title and instructions string and that change the new recipe */}
                <TextField id="filled-basic" label="Title" variant="filled" value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} />


            <div className="row">

                {newRecipe.ingredients.map((ingredient) => (


                    <Card className="ingredient_filter_card m-1">

                        <div>{ingredient}</div>
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            console.log(newRecipe);
                            // remove ingredient from new recipe
                            setNewRecipe({ ...newRecipe, ingredients: newRecipe.ingredients.filter((item) => item !== ingredient) })
                        }}>x</Button>

                    </Card>
                ))}
                </div>
                <div className="row p-1">
                <TextField id="filled-basic"  label="New Ingredient" variant="filled" value={inputValues.ingredientInput} onChange={(e) => setInputValues({ ...inputValues, ingredientInput: e.target.value })}
                />
                <Button variant="contained" onClick={(e) => {
                    e.preventDefault();
                    if (inputValues.ingredientInput === "") {
                        return;
                    }
                    console.log(newRecipe);
                    // add ingredient to new recipe
                    setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, inputValues.ingredientInput] })
                    setInputValues({ ...inputValues, ingredientInput: "" })
                }} >add</Button>
                </div>

                <TextField id="filled-basic"  classes="m-1" label="Instructions" variant="filled" value={inputValues?.instructionsInput} onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })} />
                {/* textfield for difficulty */}
                <TextField id="filled-basic"  label="Difficulty" variant="filled" value={newRecipe.difficulty} onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })} />
                {/* button that sends the new recipe to the backend */}
                <Button variant="contained" className="m-1" onClick={(e) => {
                    e.preventDefault();
                    createRecipe(newRecipe);
                }}>add recipe
                </Button>
            </div>
            </div>

        </div>
    )
}
export default AddRecipe;