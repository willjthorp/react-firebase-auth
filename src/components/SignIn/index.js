import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';

const SignInPage = () => ( 
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <PasswordForgetLink />
    <SignUpLink />
  </div> 
);

const INITIAL_STATE = { 
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;


class SignInFormBase extends Component { 
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase.signInWithEmailAndPassword(email, password)
      .then(() => { 
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); 
      })
      .catch(error => { 
        this.setState({ error })
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }; 

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
    <form onSubmit={this.onSubmit}>
      <input
        name="email"
        value={email} onChange={this.onChange} type="text" placeholder="Email Address"
      /> 
      <input
        name="password" 
        value={password} onChange={this.onChange} type="password" placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">Sign In</button>
      {error && <p>{error.message}</p>}
    </form>
    );
  } 
}

class SignInGoogleBase extends Component { 
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit = event => { 
    event.preventDefault();
    this.props.firebase.signInWithGoogle()
      .then(({user}) => {
        this.props.firebase.user(user.uid).set({
          username: user.displayName,
          email: user.email,
          roles: [],
        })
        this.setState({error: null});
        this.props.history.push(ROUTES.HOME); })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error })
      });
    };
    
  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <button type="submit">Sign In with Google</button>
        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }
}
class SignInFacebookBase extends Component { 
  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  onSubmit = event => { 
    event.preventDefault();
    this.props.firebase.signInWithFacebook()
      .then(({user, additionalUserInfo}) => {
        this.props.firebase.user(user.uid).set({
          username: additionalUserInfo.profile.name,
          email: additionalUserInfo.profile.email,
          roles: [],
        })
        this.setState({error: null});
        this.props.history.push(ROUTES.HOME); })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    };
    
  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <button type="submit">Sign In with Facebook</button>
        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage; 
export { SignInForm };
