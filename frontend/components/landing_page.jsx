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

            <img className="landing-logo"
              src="https://res.cloudinary.com/dg2yejdpt/image/upload/v1473575193/logo_pwwbfg.png"/>
            <span className="landing-logo-title">Quicknote</span>

            <div className='watermark-cover' />
          </div>

          <div onClick={this.props.openSignInModal}
            className="right-panel">Sign In</div>
        </header>

        <div className="landing-body-content">
          <div className="landing-content-container">

            <h2 className="landing-title">Remember Everything</h2>
            <p className="sub-copy">
              Inspiration strikes anywhere. Evernote lets you capture, nurture, and share your ideas across any device.
            </p>
          </div>

          <div className="video-overlay" />
          <video autoPlay loop
            type="video/webm" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.webm"
            type="video/mp4" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.mp4">
          </video>

        </div>

        <section className="social-proof">
          <div className="row">
            <p>Join <span className="green">millions</span> of people who rely on Evernote to get more things done every day.</p>
          </div>
      </section>

      </div>

    );
  }
});

module.exports = LandingPage;
