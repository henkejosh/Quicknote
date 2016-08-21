const React = require('react');
const SignInModal = require('./sign_in_modal.jsx');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;
const HomePage = require('./home_page.jsx');

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
      hashHistory.push(`/`);
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
        makeModalSignUp={this.makeModalSignUp} />;
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
    if(SessionStore.isUserLoggedIn()) {
      cUser = SessionStore.currentUser().email;
    } else {
      cUser = "Nobody Logged In";
    }

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        openSignInModal: this.openSignInModal,
        currentUser: this.state.currentUser
      })
    );

    return (
      <div>
        { childrenWithProps }

        <h3>Current User: { cUser }</h3>

        { this.controlSignInModal() }

        <p>Howdy there. Back to square 1.</p>

        <h3>{this.state.modalType}</h3>
        <div className="openModal"
          onClick={this.openSignInModal} />
        <div className="closeModal"
          onClick={this.switchModalType} />
        <p className="log-out"
          onClick={this.logout}>Log Out</p>
      </div>
    );
  }
});

module.exports = App;
