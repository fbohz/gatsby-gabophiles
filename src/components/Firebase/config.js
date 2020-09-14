// On development these must be saved to env.development! not on just .env! On production ensure to save to appropriate app.

// also read: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public

const firebaseConfig = {
    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    databaseURL: process.env.FIREBASE_databaseURL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_storageBucket,
    messagingSenderId: process.env.FIREBASE_messagingSenderId,
    appId: process.env.FIREBASE_appId,
    measurementId: process.env.FIREBASE_measurementId
  };

  export default firebaseConfig