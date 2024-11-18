import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        description,
      });
      setIngredients(response.data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Ingredient Generator</h1>
      <h2>By: 21BCE2081, 21BCE2080, 21BCE3979, 21BCE0324</h2>
      <h3>
        A tool that generates a list of probable ingredients from dish names.
        Users can input the name of a dish like spicy tomato<br></br>pasta, and
        the model predicts ingredients like tomatoes, pasta, chili flakes, etc.,
        acting as a helper for recipe creators.
      </h3>
      <textarea
        value={description}
        onChange={handleInputChange}
        placeholder="Enter the name of a dish"
      ></textarea>
      <button onClick={fetchIngredients}>Get Ingredients</button>
      {ingredients.length > 0 && (
        <div>
          <h2>Required Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
