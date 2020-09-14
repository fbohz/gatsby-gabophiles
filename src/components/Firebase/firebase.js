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

  async signup({email, password, username}){
    // createUserWithEmailAndPassword is from npm firebase library 
    this.auth.createUserWithEmailAndPassword(email, password).then(newUser => {
      // console.log(newUser.user.uid)
      return this.db.collection('publicProfiles').doc(username).set({
        userId: newUser.user.uid
      })
    })
  }

  async getUserProfile({userId}) {
    // .where where userId matches userId in db. And we don't want to subscribe to changes only call once with .get()
    return this.db.collection('publicProfiles').where('userId', '==', userId).get()
  }

  async createComment({text, bookId}){
    const postCommentCallable = this.functions.httpsCallable('postComment');
    return postCommentCallable({
      text,
      bookId
    });
  }

  subscribeToComments({bookId, onSnapshot}) {
    const bookRef = this.db.collection('books').doc(bookId)
    // book below is a reference to a particular book. onSnapshot is called any time there are changes to data
    return this.db.collection('comments')
    .where('book', '==', bookRef)
    .orderBy('dateCreated', 'desc')
    .onSnapshot(onSnapshot)
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
