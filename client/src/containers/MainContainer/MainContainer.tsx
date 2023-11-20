import { useState } from 'react';
import RecipeContainer from '../RecipeContainer/RecipeContainer';
import IngredientForm from '../../components/IngredientForm/IngredientForm';
import DishForm from '../../components/DishForm/DishForm';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { DishType, Recipe, Favorite } from '../../types';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

interface Ingredient {
  label: string;
}

const MainContainer = (): JSX.Element => {
  const [ingredientChoices, setIngredientChoices] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState<DishType>('breakfast');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<string>('Log in');

  const favoriteRecipe = (isFavorite: boolean, recipe: Favorite) => {
    setFavoriteRecipes((currentFavorites) => {
      if (isFavorite) {
        return [...currentFavorites, recipe];
      } else {
        return currentFavorites.filter(
          (fav) => fav.recipeTitle !== recipe.recipeTitle,
        );
      }
    });
  };

  // stores favorited recipes in db
  const saveFavorites = async (favorites: Favorite[]) => {
    try {
      const result = await fetch(favoritesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteRecipes),
      });
      const data = await result.json();
      console.log('ADDED TO DATABASE: ', data);
    } catch (err) {
      console.log(err);
    }
  };

  // preps dishType and ingredients to be sent to server
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listOfIngredients = [];
    ingredientChoices.forEach((ingredient) => {
      listOfIngredients.push(ingredient.label);
    });
    listOfIngredients.push(dishType);
    sendIngredientsToServer(listOfIngredients);
  };

  // makes post request to server, handles loading state change, receives data and udpates state
  const sendIngredientsToServer = async (ingredients: string[]) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    setIsLoading(true);
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });
      const data = await result.json();
      setRecipeList([data, ...recipeList]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = () => {
    console.log('deleted recipe');
  };
  //make the overlay have an onclick that closes the modal
  return (
    <>
      <Header setOpenModal={setOpenModal} setModalState={setModalState} />
      <section className="MainContainer">
        {openModal && <div className="overlay" onClick={() => setOpenModal(false)} />}
        {!openModal ? (
          <></>
        ) : (
          <>
            <Modal
              setOpenModal={setOpenModal}
              modalState={modalState}
              setModalState={setModalState}
            />
          </>
        )}
        <DishForm setDishType={setDishType} dishType={dishType} />
        <IngredientForm
          handleSubmit={handleSubmit}
          ingredientChoices={ingredientChoices}
          setIngredientChoices={setIngredientChoices}
        />
        {isLoading ? <Loading /> : <br />}
        <RecipeContainer
          recipeList={recipeList}
          deleteRecipe={deleteRecipe}
          favoriteRecipe={favoriteRecipe}
        />
      </section>
    </>
  );
};

export default MainContainer;
