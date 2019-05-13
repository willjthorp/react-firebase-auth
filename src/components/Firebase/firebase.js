import app from 'firebase/app';
import 'firebase/auth';

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
  }

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;