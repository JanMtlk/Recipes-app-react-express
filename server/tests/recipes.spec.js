const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../server'); // Replace with the actual path to your Express app file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Recipes API', () => {
  it('should return a welcome message when accessing the root route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('info', 'Node.js, Express, and Postgres API');
        done();
      });
  });

  it('should return a list of recipes when accessing /recipes', (done) => {
    chai
      .request(app)
      .get('/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more specific checks for the response data if needed
        done();
      });
  });

  it('should return a single recipe when accessing /recipe/:id', (done) => {
    const recipeId = 1; // Replace with an existing recipe ID
    chai
      .request(app)
      .get(`/recipe/${recipeId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more specific checks for the response data if needed
        done();
      });
  });

 

  it('should return a 400 Bad Request when posting an invalid recipe to /add_recipe', (done) => {
    const invalidRecipe = {
      // Invalid data, e.g., missing required fields
    };

    chai
      .request(app)
      .post('/add_recipe')
      .send(invalidRecipe)
      .end((err, res) => {
        expect(res).to.have.status(400); // Expect a 400 Bad Request status code
        // Add checks for the response data if needed
        done();
      });
  });

});
