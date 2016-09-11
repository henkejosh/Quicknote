const React = require('react');
const SignInModal = require('./sign_in_modal.jsx');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;

const LandingPage = React.createClass({
  handleSignupOpen: function(e) {
    e.preventDefault();
    this.props.openSignUpModal();
  },

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
              Inspiration strikes anywhere. Quicknote lets you capture, nurture, and share your ideas across any device.
            </p>

            <div onClick={this.handleSignupOpen}
              className="signup-button-container">
              <button name="register" className="signup-button-landing">Sign Up for Free</button>
            </div>

          </div>

          <div className="video-overlay" />
          <video autoPlay loop
            poster="https://cdn1.evernote.com/evernote.com/img/homepage/homepage-hero-video-desktop-still.jpg"
            type="video/webm" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.webm"
            type="video/mp4" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.mp4">
          </video>

        </div>

        <section className="social-proof">
          <div className="row">
            <p>Join <span className="green">millions</span> of people who rely on Quicknote to get more things done every day.</p>
          </div>
        </section>

        <section className="new-story">
          <div className="row">

            <div className="story-item image-on-right">
              <div className="story-image note"></div>
              <div className="story-content">
                <h2>Make a note of it</h2>
                <p>Create a project to-do list. Jot down a reminder. Or snap a picture of a sketch. A note can be anything you want it to be. And once you make a note, it’s accessible wherever you go, forever.</p>
              </div>
            </div>

          </div>
        </section>

      </div>

    );
  }
});

module.exports = LandingPage;
