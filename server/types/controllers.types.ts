import { Request, Response, NextFunction } from 'express';

export interface APIController {
  getGPTResult: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
  generatePrompt: (ingredients: string[]) => string;
}

export interface FavoritesController {
  getFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IngredientController {
  processRequest: (req: Request, res: Response, next: NextFunction) => void;
}

export interface UserController {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
    createUser: (req: Request, res: Response, next: NextFunction) => void;
    verifyUser: (req: Request, res: Response, next: NextFunction) => void;
}