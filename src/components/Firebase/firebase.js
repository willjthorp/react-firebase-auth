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
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.emailAuthProvider = app.auth.EmailAuthProvider;
  }

  // *** AUTH API ***

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  signOut = () => {
    return this.auth.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });;
  };

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => {
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid).get()
          .then(doc => {
            const dbUser = doc.data();

            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser)
          });
      } else {
        fallback();
      }
    })
  }

  // *** USER API ***

  user = uid => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');
}

export default Firebase;