const React = require('react');
const SignInModal = require('./sign_in_modal.jsx');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;

const LandingPage = React.createClass({


  render: function() {
    return (
      <div className="landing-page">
        <header>
          <div className="logo-container">
            <a href="/" className="header-sprite">
              <span>(logo image) Quicknote</span>
            </a>
          </div>

          <div onClick={this.props.openSignInModal}
            className="right-panel">Sign In</div>
        </header>

        <div className="landing-body-content">
          <h2>Remember Everything</h2>
          <section className="app-expl">
            <p>Use Quicknote to track to-do&#39;s, take notes in meetings, or plan your next adventure!</p>
            <img src="https://res.cloudinary.com/dg2yejdpt/image/upload/v1471819122/to_do_list_sraefc.png"/>
          </section>
        </div>

      </div>

    );
  }
});

module.exports = LandingPage;
