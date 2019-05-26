import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDM9e27LycmR4fRO35VPRJ9Su_G97qcZcU",
  authDomain: "mamut-app.firebaseapp.com",
  databaseURL: "https://mamut-app.firebaseio.com",
  projectId: "mamut-app",
  storageBucket: "mamut-app.appspot.com",
  messagingSenderId: "68461145091",
  appId: "1:68461145091:web:2d215114baed6ae9"
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** AUTH API ***

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => {
    console.log(this.auth.signOut)
    return this.auth.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });;
  };

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  // *** USER API ***

  user = uid => this.db.ref(`users${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;