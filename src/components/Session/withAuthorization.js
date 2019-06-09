import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const withAuthorization = (Component, condition) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LANDING);
          }    
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => condition(authUser) ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      )
    }
  };

  return compose(withRouter, withFirebase)(WithAuthorization);
}

export default withAuthorization;