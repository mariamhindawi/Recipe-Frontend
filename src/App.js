import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailedRecipe from './components/DetailedRecipe';
import AddRecipe from './components/AddRecipe';
import Home from './components/Home';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/add-recipe" element={<AddRecipe />}/>
      <Route path="/:recipe_title" element={<DetailedRecipe />} />
      <Route path="/:recipe_title/edit" element={<EditRecipe />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
