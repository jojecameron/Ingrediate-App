import { Request, Response, NextFunction } from "express";
import { IngredientController } from "../types";


const IngredientController: IngredientController = {
  processRequest : (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    res.locals.ingredients = body;
    return next();
  }
};

export default IngredientController;
