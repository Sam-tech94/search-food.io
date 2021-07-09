import React, {useState} from 'react';
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import Recipe from './components/Recipe';
import Alert from './components/Alert';


const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "f9e07178";

  const APP_KEY = "5cc66f1b23dfcd3384f6cdc498a4c35c";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await axios(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setQuery("");
    } else {
      return setAlert("Please fill the form");
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert  alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete='off'
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search"  />  
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => (
          <Recipe  
             key={uuidv4()}
             recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
};


export default App;
