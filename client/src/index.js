import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import HomeScreen from './screens/HomeScreen';
import AddRecipe from './screens/AddRecipe';
import EditRecipe from './screens/EditRecipe';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {

    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/recipe_detail/:id",
        element: <RecipeDetailScreen />,
      },
      {
        path: "/add_recipe",
        element: <AddRecipe />,
      },
      {
        path: "/edit_recipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
