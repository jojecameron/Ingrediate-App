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
    try {
      const { email, password } = req.body;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user.uid;
      const displayName = email.split('@')[0];
      const dbUser = await query({
        text: `INSERT INTO users ("firebaseUid", email, "displayName") VALUES ($1, $2, $3) RETURNING *`,
        params: [user, email, displayName],
      });
      const { userId } = dbUser.rows[0];
      res.locals.user = {
        email: email,
        userId: userId,
        displayName: displayName,
      };
      next();
    } catch (error) {
      console.error('An error occurred:', error);
      return next({
        code: 'INTERNAL_ERROR',
        message: 'An internal error occurred',
      });
    }
  },

  userLogin: async (req: Request, res: Response, next: NextFunction) => {
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
        text: `SELECT * FROM users WHERE "firebaseUid" = $1`,
        params: [user],
      });
      if (dbResponse.rows.length > 0) {
        res.locals.user = {
          email: email,
          firebaseUid: user,
          userId: dbResponse.rows[0].userId,
          displayName: dbResponse.rows[0].displayName,
        };
        return next();
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return next({
        code: 'INTERNAL_ERROR',
        message: 'An internal error occurred',
      });
    }
  },

  userSignOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await signOut(auth);
      next();
    } catch (error) {
      console.error('An error occurred:', error);
      return next({
        code: 'INTERNAL_ERROR',
        message: 'An internal error occurred',
      });
    }
  },
};

export default UserController;
