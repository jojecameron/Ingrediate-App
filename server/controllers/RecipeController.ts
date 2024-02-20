import { Request, Response, NextFunction } from "express";
import { RecipeController } from "../types";

const RecipeController: RecipeController = {
  processRequest : (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      res.locals.ingredients = body;
      return next();
    } catch (error) {
      console.error('An error occurred in RecipeController.processRequest:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }
  },

  parseRecipe : (req: Request, res: Response, next: NextFunction) => {
    try {
      const { recipe } = res.locals;
      const splitRecipe = recipe.split('|');
      res.locals.recipeTitle = splitRecipe[0];
      res.locals.recipeText = splitRecipe[1];
      res.locals.recipeLinkTitle = splitRecipe[2];
      res.locals.recipeLink = splitRecipe[3]; 
      return next();
    } catch (error) {
      console.error('An error occurred in RecipeController.parseRecipe:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }
  }
};

export default RecipeController;
