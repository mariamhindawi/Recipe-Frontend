import React, { useState } from 'react';
import { FaTrash, FaEye } from "react-icons/fa";
import placeHolderImage  from '../images/placeholder.png'
import {
  Link,
} from "react-router-dom";


function RecipeCard(props){
  const [recipe, setRecipe]= useState({});
    return (

        <section id="gallery">
          <div className="container">
            <div className="row">
              <div className="mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className='card-image-container'>
                      {props.recipe.recipe_image
                      ? <img src={`${props.recipe.recipe_image}`} alt="recipe"  className="card-img-top" />
                      : <img src={placeHolderImage} alt="" className="card-img-top"></img>}
                    </div>
                    <h5 className="card-title">{props.recipe.recipe_title}</h5>
                    <hr></hr>
                    <div className='recipe-card-button-container'>
                      <Link to ={`/${props.recipe.recipe_title}`}>
                      <button className="btn btn-outline-text btn-sm recipe-card-read-button">Read More<FaEye className='read-icon'/></button>
                      </Link>
                      <button className="btn btn-outline-danger btn-sm"onClick={()=>props.onDelete(props.recipe.recipe_title)}><FaTrash/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      );
}
export default RecipeCard;