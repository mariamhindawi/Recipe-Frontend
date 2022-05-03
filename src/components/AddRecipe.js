import React, {useState} from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import {FaPlus , FaEye} from "react-icons/fa";
import axios from 'axios' 
import {
  useNavigate ,Link,
} from "react-router-dom";

function AddRecipe() {
  let navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage]= useState("");
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState([]);

    
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
                const submitPost = {
                recipe_image: data.url,
                recipe_ingredients:ingredients,
                recipe_title:title,
                recipe_steps:steps
              };
               axios.post("https://cooking-recipe-appp.herokuapp.com/recipes/", submitPost)
      .then(response=>{
      return navigate("/");
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
            <h1>ADD YOUR OWN RECIPE
            </h1>
            <hr className='recipe-divider'></hr>
          </div>
          <form className='recipe-form w-50 mt-5' onSubmit={onSubmitHandler} encType="multipart/form-data">
            <div className="form-group row mb-4">
              <label htmlFor="title" className="col-sm-3 col-form-label">Recipe Title</label>
              <div className="col-sm-9">
                <input name="title" type="text" className="form-control" id="form_recipe_title" onChange={e => setTitle(e.target.value)}/>
              </div>
            </div>
            <div className="form-group row mb-4">
              <label htmlFor="file" className="col-sm-3 col-form-label">Choose Image</label>
              <div className="col-sm-9">
                <input name="file" type="file"  accept="image/*" className="form-control" onChange={(e) => setImage(e.target.files[0])}/>
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
                <input name="steps" type="text" className="form-control" id="form-recipe-steps" onChange={e => setSteps(e.target.value)}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10 d-flex">
                <button type="submit" className="btn btn-outline-success btn-sm recipe-form-button" >Add Recipe <FaPlus/></button>
                <span className='error-message'>{message}</span>

              </div>
            </div>
          </form>
        </>
      );
}

export default AddRecipe