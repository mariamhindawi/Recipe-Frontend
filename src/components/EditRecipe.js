import React, {useState, useEffect} from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import {FaEye, FaSave } from "react-icons/fa";
import axios from 'axios' 
import {
  useNavigate, useParams , Link, Navigate,
} from "react-router-dom";
import placeHolderImage  from '../images/placeholder.png'


function EditRecipe() {
  let navigate = useNavigate();
  const {recipe_title} = useParams();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [recipe, setRecipe] = useState({});
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage]= useState("");



  useEffect(() => {
      async function fetchData() {
        await axios.get(`https://cooking-recipe-appp.herokuapp.com/recipes/${recipe_title}`)
      .then(res=>{
        setRecipe(res.data);
        setTitle(res.data.recipe_title);
      })
      }
      fetchData();
      
    },[]);

    
  const KeyCodes = {
      comma: 188,
      enter: 13
    };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
    setIngredients([...ingredients, tag.text]);

  };
  
  const handleDrag = (tag, currPos, newPos) => {
  const newTags = tags.slice();
  
  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);
  
    // re-render
    setTags(newTags);
  };
  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  async function onSubmitHandler (e) {
    e.preventDefault();
    setMessage("");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mariamrecipeapp");
    formData.append("cloud_name", "dsfaiodcl");

    await fetch(
      "https://api.cloudinary.com/v1_1/dsfaiodcl/image/upload",{
      method:"post",
      body:formData
      }).then(res=>res.json())
      .then(data=>{
        var submitPost;
        if(!data.url){
          submitPost = {
            recipe_image: recipe.recipe_image,
            recipe_ingredients:ingredients,
            recipe_title:title,
            recipe_steps:steps
          };
        }
        else{
          submitPost = {
            recipe_image: data.url,
            recipe_ingredients:ingredients,
            recipe_title:title,
            recipe_steps:steps
          };
        }

        axios.post (`https://cooking-recipe-appp.herokuapp.com/recipes/${recipe._id}`, submitPost)
    .then(response=>{
    setMessage(response.data);
  })
  .catch(error => {

    if (error.response) {
      setMessage(error.response.data);
    }
    else if (error.request) {
      console.log(error.request);
    }
    else {
      console.log(error.message);
    }
  });
      })
      .catch(err=> {
        console.log(err);
      })
  }

  return (
        <>
          <Link to={"/"} tabIndex={-1}>
            <button className="btn btn-outline-secondary btn-sm recipe-card-add-button ">View All Recipes<FaEye className='read-icon'/></button>
          </Link>
          <div className="main-title">
            <h1>EDIT RECIPE
            </h1>
            <hr className='recipe-divider'></hr>
          </div>
          <form className='recipe-form w-50 mt-5' onSubmit={onSubmitHandler} encType="multipart/form-data">
            <div className="form-group row mb-4">
              <label htmlFor="title" className="col-sm-3 col-form-label">Recipe Title</label>
              <div className="col-sm-9">
                <input name="title" type="text" className="form-control" id="form_recipe_title" onChange={e => setTitle(e.target.value)} defaultValue={recipe.recipe_title}/>
              </div>
            </div>
            <div className="form-group row mb-4">
              <label htmlFor="file" className="col-sm-3 col-form-label">Change Image</label>
              <div className="col-sm-9">
                <input name="file" type="file" filename="recipe_image" className="form-control"onChange={(e) => setImage(e.target.files[0])}/>
              </div>
              <div className='image-container'>
              {recipe.recipe_image
                  ? <img src={`${recipe.recipe_image}`} alt="recipe"  className="card-img" />
                  : <img src={placeHolderImage} alt="" className="card-img"></img>}
          </div>
            </div>
            <div className="form-group row  mb-4">
              <label htmlFor="tags" className="col-sm-3 col-form-label">Type Ingredients</label>
              <div className="col-sm-9">
              <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="top"
                    name='tags'
            />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="steps" className="col-sm-3 col-form-label">Recipe Steps</label>
              <div className="col-sm-9">
                <input name="steps" type="text" className="form-control" id="form-recipe-steps" onChange={e => setSteps(e.target.value)} defaultValue={recipe.recipe_steps}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10 d-flex">
                <button type="submit" className="btn btn-outline-secondary btn-sm recipe-form-button" >Edit Recipe <FaSave/></button>
                <span className='error-message'>{message}</span>
              
              </div>
            </div>
          </form>
        </>
      );
}

export default EditRecipe