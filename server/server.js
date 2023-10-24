const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const db = require('./queries')
const port = 5001


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
app.get('/recipes', db.getRecipes);
app.get('/recipe/:id', db.getRecipeById)
app.post('/add_recipe', (request, response) => {
  const recipeData = request.body;
  
  const validation = validateRecipeData(recipeData);

  if (!validation.isValid) {
    return response.status(400).json({ error: 'Bad input', validationErrors: validation.errors });
  }  
  db.createRecipe(request, response);
});

app.put('/recipe/:id', (request, response) => {
  const recipeData = request.body;
  const validation = validateRecipeData(recipeData);

  if (!validation.isValid) {
    return response.status(400).json({ error: 'Bad input', validationErrors: validation.errors });
  }  
  db.updateRecipe(request, response)
})
app.delete('/recipe/:id', db.deleteRecipe) 

// Function to validate the recipe data
const validateRecipeData = (data) => {
  //validate all fields that are reqired
  const errors = [];
  if (!data.title) {
    errors.push('Title is required.');
  }
  if (!data.instructions) {
    errors.push('Instructions are required.');
  }

  //return it with is valid for convenience
  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};


app.listen(port, () => {
    console.log('Server started on port 5001');
});

module.exports = app;