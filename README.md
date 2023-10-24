# Recipes App - React

client side of was created using create-react-app
Server side was created using node init and adding express

## starting app
```
cd client
npm run start
```
```
cd server
npm run dev
```


## Available Scripts

Client:
```
npm run start - runs the app in the development mode.
npm run test - runs the react-scripts tests
npm run build - builds the app for production.
```

Server:
```
npm run dev - runs nodemon server
npm run test - runs mocha tests
npm run test:watch - runs mocha tests in watch mode
```

# initial setup

### initialize client(react)
```
cd client
npm install
npm run start
```
### initialize server(node)
```
cd server
npm install
npm run dev
```

### initialize database
```
brew install postgresql
brew services start postgresql
psql postgres
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
exit 
psql -d postgres -U me
CREATE DATABASE api;
\c api
```

#### create table 
```
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    prep_time INTERVAL,
    cook_time INTERVAL,
    total_time INTERVAL,
    servings INT,
    difficulty VARCHAR(50),
    cuisine VARCHAR(50),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);
```

#### insert data(optional)
```
INSERT INTO recipes (title, instructions, ingredients, prep_time, cook_time, total_time, servings, difficulty, cuisine, category)
VALUES (
    'Quick Scrambled Eggs',
    '1. Beat the eggs in a bowl.\n2. Heat a non-stick skillet over medium heat.\n3. Add butter to the skillet and let it melt.\n4. Pour the beaten eggs into the skillet.\n5. Stir gently until the eggs are set but still slightly runny.\n6. Season with salt and pepper to taste.\n7. Serve hot.',
    ARRAY['2 large eggs', '1 tbsp butter', 'Salt and pepper to taste'],
    'PT5M',  -- Prep Time: 5 minutes
    'PT5M',  -- Cook Time: 5 minutes
    'PT10M', -- Total Time: 10 minutes
    2,       -- Servings: 2
    'Easy',
    'Breakfast',
    'Quick Meals'
);
```

#### view port whitch db is running on
```
SELECT current_setting('listen_addresses') AS listen_addresses, current_setting('port') AS port;
```





