import * as admin from 'firebase-admin';
import serviceAccount from './keys/serviceAccountKey.json';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth(); // Access the Firebase Auth service
