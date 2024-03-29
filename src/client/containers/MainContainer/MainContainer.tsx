import { useState } from 'react';
import {
  RecipeContainer,
  IngredientForm,
  DishForm,
  Loading,
  Header,
  Modal,
  DropDown,
  LoginForm,
  SignupForm,
  ExpandedRecipe,
} from '../../components';

import {
  DishType,
  Recipe,
  Favorite,
  Ingredient,
  AccountModal,
  User,
  Model,
  RecipeModal,
} from '../../types';
import { generateRecipe, saveFavorites } from '../../utils/apiUtils';

const MainContainer = (): JSX.Element => {
  const [model, setModel] = useState<Model>('mistral:7b');
  const [ingredientChoices, setIngredientChoices] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState<DishType>('breakfast');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);
  const [recipeModal, setRecipeModal] = useState<RecipeModal>({
    isOpen: false,
    recipe: { recipeTitle: '', recipeText: '', id: '' },
  });
  const [accountModal, setAccountModal] = useState<AccountModal>({
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

  // preps dishType and ingredients and sends model to server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listOfIngredients: string[] = [];
    ingredientChoices.forEach((ingredient) => {
      listOfIngredients.push(String(ingredient.label));
    });
    listOfIngredients.push(dishType);
    setIsLoading(true);
    try {
      const result = await generateRecipe(listOfIngredients, model);
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
        await fetch(favoritesUrl, {
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
  const updateRecipe = async (
    id: string,
    newTitle: string,
    newText: string,
    isFavorite: boolean,
  ) => {
    // for favorited recipes
    if (isFavorite) {
      // only favorites that are associated with a user
      if (isLoggedIn.loggedIn) {
        try {
          const favoritesUrl = 'http://localhost:3000/favorites';
          await fetch(favoritesUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              newTitle: newTitle,
              newText: newText,
            }),
          });
        } catch (err) {
          console.error(err);
        }
      }
      setFavoriteRecipes((currentFavorites) => {
        return currentFavorites.map((recipe) => {
          if (recipe.id === id) {
            return { ...recipe, recipeTitle: newTitle, recipeText: newText};
          }
          return recipe;
        });
      });
    } else {
      // for non-favorited recipes
      setRecipeList((currentRecipes) => {
        return currentRecipes.map((recipe) => {
          if (recipe.id === id) {
            return { ...recipe, recipeTitle: newTitle, recipeText: newText};
          }
          return recipe;
        });
      });
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value as Model);
  };

  return (
    <>
      <Header
        setModalState={setAccountModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        saveFavorites={saveFavorites}
        setFavoriteRecipes={setFavoriteRecipes}
        favoriteRecipes={favoriteRecipes}
      />
      <section className="MainContainer">
        {accountModal.isOpen && (
          <div
            className="overlay"
            onClick={() =>
              setAccountModal({ isOpen: false, modalType: 'Log in' })
            }
          />
        )}
        {accountModal.isOpen && (
          <Modal
            isOpen={accountModal.isOpen}
            onClose={() =>
              setAccountModal({
                isOpen: false,
                modalType: accountModal.modalType,
              })
            }
          >
            {accountModal.modalType === 'Log in' ? (
              <LoginForm
                setFavoriteRecipes={setFavoriteRecipes}
                setIsLoggedIn={setIsLoggedIn}
                setAccountModal={setAccountModal}
              />
            ) : (
              <SignupForm
                setIsLoggedIn={setIsLoggedIn}
                setAccountModal={setAccountModal}
              />
            )}
          </Modal>
        )}
        {recipeModal.isOpen && (
          <div
            className="overlay"
            onClick={() =>
              setRecipeModal({
                isOpen: false,
                recipe: { recipeTitle: '', recipeText: '', id: '' },
              })
            }
          />
        )}
        {recipeModal.isOpen && (
          <Modal
            isOpen={recipeModal.isOpen}
            onClose={() =>
              setRecipeModal({
                isOpen: false,
                recipe: { recipeTitle: '', recipeText: '', id: '' },
              })
            }
          >
            <ExpandedRecipe
              recipeModal={recipeModal}
              updateRecipe={updateRecipe}
            />
          </Modal>
        )}
        <section className="generatorConfiguration">
          <DishForm setDishType={setDishType} dishType={dishType} />
          <DropDown
            onChange={handleModelChange}
            label={'Active Model:'}
            options={['mistral:7b', 'text-davinci-003', 'llama2']}
            value={model}
          />
        </section>
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
          favoriteMode={favoriteMode}
          setFavoriteMode={setFavoriteMode}
          setRecipeModal={setRecipeModal}
        />
      </section>
    </>
  );
};

export default MainContainer;
