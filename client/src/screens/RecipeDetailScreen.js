
import { NavLink, useParams } from "react-router-dom";
import "./../App.css";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 


function RecipeDetailScreen() {
  const [recipe, setRecipe] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch("/recipe/" + id.split("=")[1])
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data[0])
        console.log(data)
      }
      );
  }, [id]);

  const editRecipe = () => {
    const newRecipe = recipe;
    newRecipe.title = recipe.title+"changed";
    newRecipe.instructions = recipe.instructions;
    console.log(newRecipe);
    fetch("/recipe/" + id.split("=")[1], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => {
        console.log(res);
        // refresh page to get the db data,
        // can be changed to just render newRecipe 
        window.location.reload();
      });
  }
  const deleteRecipe = () => {
    fetch("/recipe/" + id.split("=")[1], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        // refresh page to get the db data,
        // can be changed to just render newRecipe 
        window.location.href = "/";
      });
  }
  
  return (
    <div className="app">
       <CustomHeader />
<div className="col p-10">

{recipe === null || typeof recipe === "undefined" ? "Loading..." : (
        <div>
          <Button variant="contained"onClick={(e) => {
            e.preventDefault();
            editRecipe();
          }}><EditIcon/> Edit by changing title</Button>
          <Button variant="contained" onClick={(e) => {
            e.preventDefault();
            deleteRecipe();
          }}><DeleteIcon/>
          </Button>
          <h2>{recipe?.title}</h2>
          difficulty: {recipe?.difficulty}
          <br />
          id: {recipe?.recipe_id}
          <br />
          recipe created_at: {recipe?.created_at}
          
          <p>{recipe?.description}</p>
          <ul>
            <h3>Ingredients:</h3>
            {recipe?.ingredients?.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <ol>
            <h3>Instructions:</h3>
            {recipe?.instructions

            }
          </ol>
        </div>)}
        </div>
    </div>
  );
}

export default RecipeDetailScreen;
