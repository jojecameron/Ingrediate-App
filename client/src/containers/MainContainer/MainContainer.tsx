import { useState } from 'react';
import RecipeContainer from '../RecipeContainer/RecipeContainer';
import IngredientForm from '../../components/IngredientForm/IngredientForm';
import DishForm from '../../components/DishForm/DishForm';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import {
  DishType,
  Recipe,
  Favorite,
  Ingredient,
  ModalState,
  User,
} from '../../types';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

const MainContainer = (): JSX.Element => {
  const [ingredientChoices, setIngredientChoices] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState<DishType>('breakfast');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    modalType: 'Log in',
  });
  const [isLoggedIn, setIsLoggedIn] = useState<User>({
    loggedIn: false,
    display_name: '',
    email: '',
    firebase_uid: '',
  });

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

  return (
    <>
      <Header
        setModalState={setModalState}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <section className="MainContainer">
        {modalState.isOpen && (
          <div
            className="overlay"
            onClick={() =>
              setModalState({ isOpen: false, modalType: 'Log in' })
            }
          />
        )}
        {!modalState.isOpen ? (
          <></>
        ) : (
          <>
            <Modal
              modalState={modalState}
              setModalState={setModalState}
              setIsLoggedIn={setIsLoggedIn}
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
