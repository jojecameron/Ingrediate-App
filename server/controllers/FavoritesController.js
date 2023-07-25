const Favorites = require('../models/favoritesModel');

const FavoritesController = {};

// need to implement user authentication for this?
FavoritesController.getFavorites = async (req, res, next) => {
  const { username } = req.body;
  try {
    const favorites = await Favorites.find({});
    res.locals.favorites = favorites;
    return next();
  } catch (err) {
    return next({ err: err });
  }
};

//adding favorite to database
FavoritesController.addFavorite = async (req, res, next) => {
  const { index, recipe } = req.body;
  try {
    const newFavorite = await Favorites.create({
      favorites: [{ index, recipe }],
    });
    res.locals.newFavorite = newFavorite;
    return next();
  } catch (err) {
    return next({ err: err });
  }
};

//deleting favorite from database
FavoritesController.deleteFavorite = async (req, res, next) => {
  const { index } = req.body;
  try {
    const deletedFavorite = await Favorites.findOneAndDelete({
      'favorites.index': index,
    });
    res.locals.deletedFavorite = deletedFavorite;
  } catch (err) {
    return next({ err: err });
  }
};

module.exports = FavoritesController;
