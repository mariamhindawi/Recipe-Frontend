import React , {useEffect, useState}from 'react'
import placeHolderImage  from '../images/placeholder.png'
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import {
  Link   , useParams, useNavigate
} from "react-router-dom";
import axios from 'axios';
import {Tabs, Tab } from "react-bootstrap";

function DetailedRecipe() {
  let navigate = useNavigate();

  const {recipe_title} = useParams();
  const [recipe, setRecipe] = useState({});

  const onDelete=(recipe_title)=>{
    if(window.confirm(`Are you sure you want to delete ${recipe_title}`)){
     axios.delete(`https://cooking-recipe-appp.herokuapp.com/recipes/${recipe_title}`)
     .then(res=>{
      return navigate("/");
    }) 
    }
 }
  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://cooking-recipe-appp.herokuapp.com/recipes/${recipe_title}`)
    .then(res=>{
      setRecipe(res.data);
    })
    }
    fetchData();
  });

  const ingredientsList = () => {
    if ( !recipe.recipe_ingredients || recipe.recipe_ingredients.length === 0 || recipe.recipe_ingredients[0]==="") {
      return <li className="no-items">No Ingredients Yet</li>;
    }
    return recipe.recipe_ingredients.map((ingredient,index) => (
      <li  key={index}>
          {ingredient}
      </li>
    ));
  };

  return (
    <>
    <Link to={"/"} tabIndex={-1}>
      <button className="btn btn-outline-secondary btn-sm recipe-card-add-button ">View All Recipes<FaEye className='read-icon'/></button>
    </Link>
      <div className='recipe-card'>
        <div className="recipe-card__body">
          <h1 className="recipe-card__heading">{recipe.recipe_title}</h1>
          <div className='image-container'>
                  {recipe.recipe_image
                  ? <img src={`${recipe.recipe_image}`} alt="recipe"  className="card-img" />
                  : <img src={placeHolderImage} alt="" className="card-img"></img>}
          </div>
          <Tabs className="view-tabs" defaultActiveKey="Ingredients">
            <Tab className="view-tab" eventKey="Ingredients" title="Ingredients">
              <ul className="recipe-card__ingredients mt-4">
              {ingredientsList()}
              </ul>
            </Tab>
            <Tab className="view-tab" eventKey="Recipe" title="Recipe">
              <div className='mt-4'>
              {recipe.recipe_steps
                  ? <>{recipe.recipe_steps}</>
                  : <>{'No Recipe Yet'}</>}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className='detailed-recipe-button-container mb-2'>
          <Link to={`/${recipe.recipe_title}/edit`}>
            <button className="btn btn-outline-secondary btn-sm recipe-card-edit-button">
              <FaEdit className='edit-icon'/>
            </button>
          </Link>
          <button className="btn btn-outline-danger btn-sm detailed-trash"onClick={()=>onDelete(recipe.recipe_title)}><FaTrash/></button>
        </div>
      </div>
    </>
    
  );
}

export default DetailedRecipe