const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookApiUtil = require('../util/notebook_api_util');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const NotebookActions = {
  getAllNotebooks: function() {
    NotebookApiUtil.getAllNotebooks(this.receiveAllNotebooks);
  },

  receiveAllNotebooks: function(notebooks) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.GET_ALL_NOTEBOOKS,
      notebooks: notebooks
    });
  },

  createNotebook: function(notebook) {
    NotebookApiUtil.createNotebook(notebook, this.receiveNotebook);
  },

  receiveNotebook: function(notebook) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.RECEIVE_NOTEBOOK,
      notebook: notebook
    });
  },

  deleteNotebook: function(notebookID) {
    NotebookApiUtil.deleteNote(notebookID, this.removeNotebookFromStore);
  },

  removeNotebookFromStore: function(notebookID) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.REMOVE_NOTEBOOK,
      notebookID: notebookID
    });
  }


  // signup: function(params) {
  //   SessionApiUtil.signup(params, SessionActions.receiveCurrentUser);
  //     // ErrorActions.setErrors);
  // },
  //
  // login: function(params) {
  //   SessionApiUtil.login(params, SessionActions.receiveCurrentUser);
  //     // ErrorActions.setErrors);
  // },
  //
  // logout: function() {
  //   SessionApiUtil.logout(SessionActions.removeCurrentUser);
  //   // CurrentSongActions.clearCurrentSong();
  // },
  //
  // receiveCurrentUser: function(user) {
  //   Dispatcher.dispatch({
  //     actionType: SessionConstants.LOGIN,
  //     currentUser: user
  //   });
  // },
  //
  // removeCurrentUser: function(user) {
  //   Dispatcher.dispatch({
  //     actionType: SessionConstants.LOGOUT
  //   });
  // }
};

module.exports = NotebookActions;
