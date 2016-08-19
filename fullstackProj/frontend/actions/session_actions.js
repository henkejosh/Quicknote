const Dispatcher = require('../dispatcher/dispatcher.js');
const SessionApiUtil = require('../util/session_api_util');
const SessionConstants = require('../constants/session_constants.js');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {
  signup: function(params) {
    SessionApiUtil.signup(params, SessionActions.receiveCurrentUser);
      // ErrorActions.setErrors);
  },

  login: function(params) {
    SessionApiUtil.login(params, SessionActions.receiveCurrentUser);
      // ErrorActions.setErrors);
  },

  logout: function() {
    SessionApiUtil.logout(SessionActions.removeCurrentUser);
    // CurrentSongActions.clearCurrentSong();
  },

  receiveCurrentUser: function(user) {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: user
    });
  },

  removeCurrentUser: function(user) {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
