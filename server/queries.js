const { response } = require('express')

//create new pool instance for database connection
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})


const getRecipes = (request, response) => {
    pool.query('SELECT * FROM recipes ORDER BY title ASC', (error, results) => {
        if (error) {
            throw error
        }
        // console.log(response.status(200).json(results.rows)) 
        response.status(200).json(results.rows)
    })
}
const getRecipeById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM recipes WHERE recipe_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        else {

            response.status(200).json(results.rows)
        }
    })
}


// Create a new recipe
const createRecipe = (request, response) => {
    const recipeData = request.body;
    // Data is valid, so insert a new row into the database
    const {
        title,
        instructions,
        ingredients,
        prep_time,
        cook_time,
        total_time,
        servings,
        difficulty,
        cuisine,
        category,
    } = recipeData;

    pool.query(
        'INSERT INTO recipes (title, instructions, ingredients, prep_time, cook_time, total_time, servings, difficulty, cuisine, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING recipe_id',
        [
            title,
            instructions,
            ingredients,
            prep_time,
            cook_time,
            total_time,
            servings,
            difficulty,
            cuisine,
            category,
        ],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: 'Internal server error' });
            } else {
                const newRecipeId = results.rows[0].recipe_id;
                response.status(201).json({ message: 'Recipe created', recipe_id: newRecipeId });
            }
        }
    );
};

const updateRecipe = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, instructions, ingredients, prep_time, cook_time, total_time, servings, difficulty, cuisine, category } = request.body

    pool.query(
        'UPDATE recipes SET title = $1, instructions = $2, ingredients = $3, prep_time = $4, cook_time = $5, total_time = $6, servings = $7, difficulty = $8, cuisine = $9, category = $10 WHERE recipe_id = $11',
        [title, instructions, ingredients, prep_time, cook_time, total_time, servings, difficulty, cuisine, category, id],
        (error, results) => {
            if (error) {
                throw error
            }
            if (results.rowCount === 0) {
                response.status(404).send(`Recipe not found with ID: ${id}`)
            }
            else {
                response.status(200).send(`Recipe sucessfuly modified with ID: ${id}`)
            }
        }
    )
}
const deleteRecipe = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM recipes WHERE recipe_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount === 0) {
            response.status(404).send(`Recipe not found with ID: ${id}`)
        }
        else {
            response.status(200).send(`Recipe sucessfuly deleted with ID: ${id}`)
        }
    })
}


//Export all the functions we want visible
module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}