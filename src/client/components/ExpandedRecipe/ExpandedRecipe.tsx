import { useState } from 'react';
import { ExpandedRecipeProps } from '../../types';
import { Edit } from '@mui/icons-material';

const ExpandedRecipe = (props: ExpandedRecipeProps): JSX.Element => {
  const { recipeModal, updateRecipeTitle } = props;
  const { recipeTitle, recipeText, id } = recipeModal.recipe;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(recipeTitle);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEnter = () => {
    if (title.length) {
      setIsEditingTitle(false);
      recipeModal.recipe.recipeTitle = title;
      updateRecipeTitle(id, title, true);
    }
  };

  return (
    <>
      {!isEditingTitle ? (
        <>
          <Edit onClick={handleTitleClick} />
          <h3 id="modal-recipe-title">{recipeTitle}</h3>
        </>
      ) : (
        <input
          id="modal-recipe-title-edit"
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={() => handleEnter()}
          onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
          autoFocus
        />
      )}
      <p id="modal-recipe">{recipeText}</p>
    </>
  );
};

export default ExpandedRecipe;
