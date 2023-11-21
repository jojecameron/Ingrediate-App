import { Request, Response, NextFunction } from 'express';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { UserController } from '../types';
import { auth } from '../firebase/firebaseConfig';
import { query } from '../models/postgres';

const UserController: UserController = {
  userSignUp: async (req: Request, res: Response, next: NextFunction) => {
    console.log('HERE in userSignUp');
    try {
      const { email, password } = req.body;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user.uid;

      await query({
        text: 'INSERT INTO users (firebase_uid, email) VALUES ($1, $2)',
        params: [user, email],
      });

      res.locals.user = { email: email, firebase_uid: user };
      next();
    } catch (error) {
      console.error('An error occurred:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }
    
  },

  userLogin: async (req: Request, res: Response, next: NextFunction) => {
    console.log('HERE in userLogin');
    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user.uid;

      // Find user in the database matching UID
      const dbResponse = await query({
        text: 'SELECT * FROM users WHERE firebase_uid = $1',
        params: [user],
      });

      if (dbResponse.rows.length > 0) {
        res.locals.user = { email: email, firebase_uid: user };
        return next();
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }
    
  },

  userSignOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      next();
    } catch (error) {
      console.error('An error occurred:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }    
  },
};

export default UserController;
