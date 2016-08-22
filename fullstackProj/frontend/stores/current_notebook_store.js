"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const CurrentNotebookStore = new Store(Dispatcher);

let _currentNotebook = {};

const _setCurrentNotebook = function(notebook) {
  _currentNotebook[notebook.id] = notebook;
};

CurrentNotebookStore.currentNotebook = function() {
  return Object.assign({}, _currentNotebook);
};

CurrentNotebookStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
      _setCurrentNotebook(payload.currentNotebook);
      CurrentNotebookStore.__emitChange();
      break;
  }
};

// const _login = function(currentUser) {
//   _currentUser = currentUser;
// };

// const _logout = function() {
//   _currentUser = {};
//   hashHistory.push("/");
// };


//
// SessionStore.isUserLoggedIn = function() {
//   return !!_currentUser.id;
// };
//
// SessionStore.__onDispatch = payload => {
//   switch(payload.actionType) {
//     case SessionConstants.LOGIN:
//       _login(payload.currentUser);
//       SessionStore.__emitChange();
//       break;
//     case SessionConstants.LOGOUT:
//       _logout();
//       SessionStore.__emitChange();
//       break;
//   }
// };

module.exports = CurrentNotebookStore;
