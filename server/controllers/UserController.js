const User = require('../models/userModel');
const bcrypt = require('bcrypt.js');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );
    res.locals.users = users;
    return next();
  });
};

userController.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await User.create(body);
    res.locals.user = result;
    return next();
  } catch (error) {
    return next({ log: `userController.createUser: MESSAGE : ${error}` });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next('Error: username and password are required');
  }
  try {
    const user = await User.findOne({ username });
    const hashedMatch = await bcrypt.compare(password, user.password);
    if (user && hashedMatch) {
      res.locals.user = user;
      res.locals.userExist = true;
      return next();
    } else {
      res.locals.userExist = false;
      return next();
    }
  } catch (error) {
    return next({ log: `userController.verifyUser: MESSAGE : ${error}` });
  }
};

module.exports = userController;
