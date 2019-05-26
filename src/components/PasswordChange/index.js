import React, { Component } from 'react';
import {withFirebase} from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.firebase.updatePassword(this.state.passwordOne)
      .then(() => this.setState({...INITIAL_STATE}))
      .catch(error => this.setState({error}));
  }

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  render() {
    const {passwordOne, passwordTwo, error} = this.state;
    const isInvalid = !passwordOne || passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withFirebase(PasswordChangeForm);