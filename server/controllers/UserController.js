const User = require('../models/userModel');
const bcrypt = require('bcrypt.js');

const userController = {};

userController.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
      
      // store retrieved users into res.locals and move on to next middleware
      res.locals.users = users;
      return next();
    });
  };

userController.createUser = async (req, res, next) => {
    // console.log('----WE HAVE ENTERED createUser-----');
    const { body } = req;
    // console.log('this is req.body', body);
    try {
      const result = await User.create(body);
      res.locals.user = result;
      // console.log('this should have id property', result);
      return next();
    } catch (error) {
      return next({log: `userController.createUser: MESSAGE : ${error}`});
    }
  };



userController.verifyUser = async (req, res, next) => {
    // console.log('----THIS IS VERIFY USER----');
    // console.log(req.body.username, req.body.password);
    const { username, password } = req.body;
    if (!username || !password) {
      return next('Error: username and password are required');
    }
    try {
      const user = await User.findOne({ username });
      const hashedMatch = await bcrypt.compare(password, user.password);
      if(user && hashedMatch){
        // await bcrypt.compare passing in the req.body.password and user.password
        res.locals.user = user;
        // console.log('this is res.locals.user', res.locals.user);
        res.locals.userExist = true;
        return next();
      } else {
        res.locals.userExist = false;
        return next();
      }
    } catch (error){
      return next({log: `userController.verifyUser: MESSAGE : ${error}`});
    }
  };
  
  module.exports = userController;