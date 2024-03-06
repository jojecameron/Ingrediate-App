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
  const [model, setModel] = useState<string>('text-davinci-003');
  const [ingredientChoices, setIngredientChoices] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState<DishType>('breakfast');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    modalType: 'Log in',
  });
  const [isLoggedIn, setIsLoggedIn] = useState<User>({
    loggedIn: false,
    displayName: '',
    email: '',
    userId: '',
    firebaseUid: '',
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
            userId: isLoggedIn.userId,
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

  // sends ingredients to recipe generator service
  const sendIngredientsToServer = async (ingredients: string[]) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    setIsLoading(true);
    try {
      const result = await generateRecipe(ingredients, model);
      setRecipeList([result, ...recipeList]);
      setIsLoading(false);
      setFavoriteMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  // deletes recipe from state and favorite from db if logged in
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

  // updates recipe title in state and db if logged in
  const updateRecipeTitle = async (
    id: string,
    newTitle: string,
    isFavorite: boolean,
  ) => {
    // for favorited recipes
    if (isFavorite) {
      // only favorites that are associated with a user
      if (isLoggedIn.loggedIn) {
        try {
          const favoritesUrl = 'http://localhost:3000/favorites';
          const result = await fetch(favoritesUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              newTitle: newTitle,
            }),
          });
        } catch (err) {
          console.error(err);
        }
      }
      setFavoriteRecipes((currentFavorites) => {
        return currentFavorites.map((recipe) => {
          if (recipe.id === id) {
            return { ...recipe, recipeTitle: newTitle };
          }
          return recipe;
        });
      });
    } else {
      // for non-favorited recipes
      setRecipeList((currentRecipes) => {
        return currentRecipes.map((recipe) => {
          if (recipe.id === id) {
            return { ...recipe, recipeTitle: newTitle };
          }
          return recipe;
        });
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
        setFavoriteRecipes={setFavoriteRecipes}
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
          updateRecipeTitle={updateRecipeTitle}
          favoriteMode={favoriteMode}
          setFavoriteMode={setFavoriteMode}
        />
      </section>
    </>
  );
};

export default MainContainer;
