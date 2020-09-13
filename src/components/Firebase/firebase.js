import firebaseConfig from "./config";
import axios from 'axios';


class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async signup({email, password}){
    // from npm firebase library 
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  async getUserProfile({userId}) {
    // .where where userId matches userId in db. And we don't want to subscribe to changes only call once with .get()
    return this.db.collection('publicProfiles').where('userId', '==', userId).get()
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  // console.log(firebaseConfig)

  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
} 

export default getFirebaseInstance;
