import Axios from "axios";

export default Axios.create({
  baseURL: "https://cooking-recipe-appp.herokuapp.com/",
  withCredentials: true,
});
