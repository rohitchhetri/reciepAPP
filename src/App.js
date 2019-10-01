import React,{useEffect,useState} from 'react';
import  './App.css';
import Recipe from "./Recipe";

const App = () => {
  
  //APP ID 
  const APP_ID = process.env.APP_ID;
  const APP_KEY = process.env.APP_KEY;

  //State
  const[recipes,setRecipes] = useState([]);
  const[search, setSearch] = useState('');
  const[query, setQuery] = useState('chicken');
  //const exampleReq = ``;
  //console.log(exampleReq);
  
  //const[counter, setCounter] = useState(0);
  //useEffect
  useEffect(() =>{
    //console.log("Effect has been run");
    getRecipes();
  },[query]);

const getRecipes = async () => {

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data)
    setRecipes(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value)
 // console.log(search)
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-input" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
} 

export default App;
