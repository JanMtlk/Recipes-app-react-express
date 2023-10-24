import { NavLink, useParams } from "react-router-dom";
import "./../App.css";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";


function EditRecipe() {

  const [recipe, setRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch("/recipe/" + id.split("=")[1])
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data)
        setNewRecipe(data)
        console.log(data)
      }
      );
  }, [id]);
    return (
        <div>
           <CustomHeader />
            a
            {/* show fields that are connected to newrecipe title and instructions string and that change the new recipe */}
          <input type="text" value={newRecipe?.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} />
            <input type="text" value={newRecipe?.description} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })} />

            <input type="text"  onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: [e.target.value] })} />
            <input type="text" value={newRecipe?.instructions} onChange={(e) => setNewRecipe({ ...newRecipe, instructions: [e.target.value] })} />

         </div>
    )
}
export default EditRecipe;