import { useState } from 'react';
import {
  RecipeContainer,
  IngredientForm,
  DishForm,
  Loading,
  Header,
  Modal,
} from '../../components';
import {
  DishType,
  Recipe,
  Favorite,
  Ingredient,
  ModalState,
  User,
} from '../../types';
import { generateRecipe } from '../../utils/apiUtils';

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
    user_id: '',
    firebase_uid: '',
  });

  // adds or removes favorited recipes from state
  const favoriteRecipe = (isFavorite: boolean, recipe: Favorite) => {
    deleteRecipe(recipe.id);
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
  const saveFavorites = async () => {
    const favoritesUrl = 'http://localhost:3000/favorites';
    if (isLoggedIn.loggedIn) {
      try {
        const result = await fetch(favoritesUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            favorites: favoriteRecipes,
            user_id: isLoggedIn.user_id,
          }),
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please log in to save favorites');
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

  // sends ingredients to server
  const sendIngredientsToServer = async (ingredients: string[]) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    setIsLoading(true);
    try {
      const result = await generateRecipe(ingredients);
      setRecipeList([result, ...recipeList]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // deletes recipe from state and favorite from db
  const deleteRecipe = async (id: string) => {
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      try {
        const favoritesUrl = 'http://localhost:3000/favorites';
        const result = await fetch(favoritesUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        });
        setFavoriteRecipes((currentFavorites) => {
          return currentFavorites.filter((recipe) => recipe.id !== id);
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      setRecipeList((currentRecipes) => {
        return currentRecipes.filter((recipe) => recipe.id !== id);
      });
    }
  };

  return (
    <>
      <Header
        setModalState={setModalState}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        saveFavorites={saveFavorites}
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
              setFavoriteRecipes={setFavoriteRecipes}
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
          favoriteRecipes={favoriteRecipes}
          setFavoriteRecipes={setFavoriteRecipes}
        />
      </section>
    </>
  );
};

export default MainContainer;
