import firebaseConfig from "./config";
// import axios from 'axios';


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
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })
  }

  // getUserProfile({userId}) {
  //   // .where where userId matches userId in db. And we don't want to subscribe to changes only call once with .get()
  //   return this.db.collection('publicProfiles').where('userId', '==', userId).get()
  // }

  // attempt at  with server side

  getUserProfile({userId, onSnapshot}){
    return this.db.collection('publicProfiles')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  async createAuthor({authorName}){
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    return createAuthorCallable({
      authorName
    });
  }

  async getAuthors(){
    return this.db.collection('authors').get();
  }

  async createBook({bookName, authorId, imageUrl, description, year}){
    const createBookCallable = this.functions.httpsCallable('createBook');
    return createBookCallable({
      imageUrl,
      bookName,
      authorId,
      description,
      year: parseInt(year)
    })
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
