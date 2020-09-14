// On development these must be saved to env.development! not on just .env! On production ensure to save to appropriate app.

// also read: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public

const firebaseConfig = {
  apiKey: "AIzaSyCDsumr7QP-zWtRVuE3pGd6iCOBJHa6vUQ",
  authDomain: "gatsby-bookz-demo-9b592.firebaseapp.com",
  databaseURL: "https://gatsby-bookz-demo-9b592.firebaseio.com",
  projectId: "gatsby-bookz-demo-9b592",
  storageBucket: "gatsby-bookz-demo-9b592.appspot.com",
  messagingSenderId: "436488061357",
  appId: "1:436488061357:web:5e71a187050d4ed87b2124",
  measurementId: "G-TNMZVNXE6K"
};

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_apiKey,
//     authDomain: process.env.FIREBASE_authDomain,
//     databaseURL: process.env.FIREBASE_databaseURL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_storageBucket,
//     messagingSenderId: process.env.FIREBASE_messagingSenderId,
//     appId: process.env.FIREBASE_appId,
//     measurementId: process.env.FIREBASE_measurementId
//   };

  export default firebaseConfig