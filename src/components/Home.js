import React, {useEffect, useState} from 'react'
import {
  Link,
} from "react-router-dom";
import RecipeCard from './RecipeCard';
import axios from 'axios'
import GridSystem from './GridSystem';
import { FaPlus } from "react-icons/fa";



function Home() {
    const [recipes, setRecipes] = useState([]);
    const recipesLength = recipes.length;
    const [update, setUpdate]= useState(true);
    const [recipe, setRecipe]= useState({});

    useEffect(() => {
      async function fetchData() {
        await axios.get('https://cooking-recipe-appp.herokuapp.com/recipes/')
      .then(res=>{
        setRecipes(res.data);
      })
        // ...
      }
      fetchData();
    }, [update]);
    const onDelete=(title)=>{
       if(window.confirm(`Are you sure you want to delete ${title}`)){
        axios.delete(`https://cooking-recipe-appp.herokuapp.com/recipes/${title}`)
        .then(res=>{
          setUpdate(!update);
        }) 
       }
    }
    const onReadMore=(title)=>{
      axios.get(`https://cooking-recipe-appp.herokuapp.com/recipes/${title}`)
      .then(res=>{
        setRecipe(res.data);
      }) 
   }
    const recipeList = () => {
      if ( recipesLength === 0) {
        return <div className="no-items">No Recipes Yet</div>;
      }
      return recipes.map((recipe, index) => (
      <div className='album'>
          <RecipeCard
          key={index}
          recipe={recipe}
          onDelete = {onDelete}
          onReadMore = {onReadMore}
        />
      </div>
      ));
    };
return (
  <>
    <div class="main-title">
      <h1>LET'S START COOKING
      </h1>
      <hr className='recipe-divider'></hr>
    </div>
    <Link to={"add-recipe"} tabIndex={-1}>
        <button className="btn btn-outline-success btn-sm recipe-card-add-button mb-5">Add New Recipe<FaPlus className='read-icon'/></button>
    </Link>
    <GridSystem colCount={3} md={4}>

{recipeList()}

</GridSystem>
  </>

)}

export default Home