import { Request, Response, NextFunction } from 'express';
import { UserController } from '../types';

const UserController: UserController = {
  getAllUsers: (req: Request, res: Response, next: NextFunction) => {
    // User.find({}, (err, users) => {
    //   res.locals.users = users;
    //   return next();
    // });
  },
  
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      // const result = await User.create(body);
      // res.locals.user = result;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return next('Error: username and password are required');
    }
    try {
      // const user = await User.findOne({ username });
      // const hashedMatch = await bcrypt.compare(password, user.password);
      // if (user && hashedMatch) {
      //   res.locals.user = user;
      //   res.locals.userExist = true;
      //   return next();
      // } else {
        // res.locals.userExist = false;
        // return next();
      // }
    } catch (err) {
      return next(err);
    }
  },
};

export default UserController;
