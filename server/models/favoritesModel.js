const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  favorites: [
    {
      index: { type: Number },
      recipe: { type: Object },
    },
  ],
});

module.exports = mongoose.model('Favorite', favoritesSchema);
