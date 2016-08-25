const React = require('react');
const SignInModal = require('./sign_in_modal.jsx');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;
const LandingPage = require('./landing_page.jsx');

const App = React.createClass({
  getInitialState: function() {
    return { signInModal: false, modalType: "Sign in" };
  },

  componentDidMount: function() {
    Modal.setAppElement(document.getElementById("root"));
    this.sessionListener = SessionStore.addListener(this.isUserLoggedIn);
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
  },

  isUserLoggedIn: function() {
    if(SessionStore.isUserLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
      hashHistory.push(`/home`);
    }
  },

  openSignInModal: function() {
    this.setState({ signInModal: true });
  },

  closeSignInModal: function() {
    this.setState({ signInModal: false });
  },

  makeModalSignUp: function() {
    this.setState({ modalType: "Sign up" });
  },

  makeModalSignIn: function() {
    this.setState({ modalType: "Sign in"});
  },

  controlSignInModal: function() {
    if(this.state.signInModal) {
      return <SignInModal isOpen={ this.state.signInModal }
        closeSignInModal={this.closeSignInModal}
        modalType={this.state.modalType}
        makeModalSignUp={this.makeModalSignUp}
        makeModalSignIn={this.makeModalSignIn} />;
    }
  },

  switchModalType: function() {
    if(this.state.modalType === "Sign up") {
      this.makeModalSignIn();
    } else {
      this.makeModalSignUp();
    }
  },

  logout: function(e) {
    e.preventDefault();
    SessionActions.logout();
  },

  render: function() {
    let cUser;
    let cUserID;
    if(SessionStore.isUserLoggedIn()) {
      let user = SessionStore.currentUser();
      cUser = user.email;
      cUserID = user.id;
    } else {
      cUser = "Nobody Logged In";
      cUserID = "none";
    }

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        openSignInModal: this.openSignInModal,
        currentUser: cUser,
        logout: this.logout,
        currentUserID: cUserID
      })
    );

    return (
      <div>
        { childrenWithProps }

        { this.controlSignInModal() }

      </div>
    );
  }
});

module.exports = App;
