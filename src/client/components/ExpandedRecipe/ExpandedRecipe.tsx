import { useState, useRef } from 'react';
import { ExpandedRecipeProps } from '../../types';
import { Edit } from '@mui/icons-material';

const ExpandedRecipe = (props: ExpandedRecipeProps): JSX.Element => {
  const { recipeModal, updateRecipe } = props;
  const { recipeTitle, recipeText, id } = recipeModal.recipe;
  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipeTitle);
  const [isEditHover, setIsEditHover] = useState(false);
  const [text, setText] = useState(recipeText);

  const handleClose = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (
      e &&
      (e.relatedTarget === titleInputRef.current ||
        e.relatedTarget === textInputRef.current)
    ) {
      return;
    }
    if (!isEditing) {
      return;
    }
    if (title.length) {
      setIsEditHover(false);
      setIsEditing(false);
      recipeModal.recipe.recipeText = text;
      recipeModal.recipe.recipeTitle = title;
      updateRecipe(id, title, text, true);
    }
  };

  return (
    <>
      {!isEditing ? (
        <>
          <div id="modal-recipe-header">
            <button
              id="edit"
              onClick={() => setIsEditing(true)}
              onMouseEnter={() => setIsEditHover(true)}
              onMouseLeave={() => setIsEditHover(false)}
            >
              {isEditHover ? (
                <>
                  <Edit id="edit-button" />
                  <span id="edit-memo" className="memo">
                    Edit Recipe
                  </span>
                </>
              ) : (
                <Edit id="edit-button" />
              )}
            </button>
            <h3 id="modal-recipe-title">{recipeTitle}</h3>
          </div>
          <p id="modal-recipe">{recipeText}</p>
        </>
      ) : (
        <>
          <input
            ref={titleInputRef}
            id="modal-recipe-title-edit"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleClose}
            autoFocus
          />
          <textarea
            ref={textInputRef}
            id="modal-recipe-text-edit"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleClose}
          />
        </>
      )}
    </>
  );
};

export default ExpandedRecipe;
