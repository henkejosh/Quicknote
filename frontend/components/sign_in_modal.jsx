const React = require('react');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
// const ErrorStore = require('../stores/error_store.js');
// const ErrorActions = require('../actions/error_actions.js');
const Modal = require('react-modal');
const modStyle = require('../misc/modal_styles.js');

const SignInModal = React.createClass({
  getInitialState: function() {
    return { email: "", password: "" };
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.isUserLoggedIn);
    // this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    // this.errorListener.remove();
    this.sessionListener.remove();
    this.props.makeModalSignIn();
  },

  // isUserLoggedIn: function() {
  //   if(SessionStore.isUserLoggedIn()) {
  //     hashHistory.push(`/songs`);
  //   }
  // },

  update: function(prop) {
    return (e) => {
      this.setState({
        [prop]: e.target.value
      });
    };
  },

  loggingIn: function() {
    SessionActions.login(this.state);
  },

  signingUp: function() {
    SessionActions.signup(this.state);
  },

  handleForm: function(e) {
    e.preventDefault();
    if(this.props.modalType === "Sign up") {
      this.signingUp();
    } else if(this.props.modalType === "Sign in") {
      this.loggingIn();
    }
    this.props.closeSignInModal();
  },

  handleModalChange: function(e) {
    e.preventDefault();
    this.props.makeModalSignUp();
  },

  guestLogin: function(e) {
    e.preventDefault();
    SessionActions.login({ email: "guest_user",
      password: "password"});
    this.props.closeSignInModal();
  },

  createNewAccountElements: function() {
    if(this.props.modalType === "Sign in") {
      return (
        <section className="no-account">
          <p>Don&#39;t have an account?</p>
          <p onClick={ this.handleModalChange }
            className="create-account">Create account</p>
        </section>
      );
    }
  },

  render: function() {
    return (
      <Modal style={modStyle} isOpen={this.props.isOpen}>
        <div>
          <h2 className="modal-type">{this.props.modalType}</h2>
          <br/>

          <form className="signup" onSubmit={ this.handleForm }>

          <div className="signup-email">
            <label name="email">Email: </label>
            <input type="text" id="email" value={this.state.email}
              onChange={this.update("email")}></input>

          </div>

          <div className="signup-password">
            <label name="password">Password: </label>
            <input type="password" id="password" value={this.state.password}
              onChange={this.update("password")}></input>

          </div>

          <div onClick={this.guestLogin}
            className="guest-login-button">
            <input type="submit" value="Guest Login"></input>
          </div>

          <div className="submit-button">
            <input type="submit" value="Submit"></input>
          </div>

          </form>

          <div className="cancel-button">
            <button type="cancel" onClick={this.props.closeSignInModal}>Cancel</button>
          </div>

          { this.createNewAccountElements() }

        </div>
      </Modal>
    );
  }
});

module.exports = SignInModal;
