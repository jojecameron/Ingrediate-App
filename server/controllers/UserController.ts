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
  userSignUp: (req: Request, res: Response, next: NextFunction) => {
    console.log('HERE in userSignUp');
    const { email, password } = req.body;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // query('INSERT INTO users (uid) VALUES ($1, $2)', [uid])
        // .then(() => {
        //   res.status(201).json({ message: 'User signed up successfully!' });
        // })
        // .catch((dbError) => {
        //   // Handle database error
        //   // Notify user sign-up succeeded, but data storage failed
        //   res.status(500).json({ error: 'User signed up, but data storage failed' });
        // });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // send to global error handler
      });
  },

  userLogin: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // send user credentials to database to retrieve favorites
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // send to global error handler
      });
  },

  userSignOut: (req: Request, res: Response, next: NextFunction) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        // send to global error handler
      });
  },
};

export default UserController;
