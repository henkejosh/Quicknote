"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const NotebookStore = new Store(Dispatcher);

let _currentNotebook = {};
let _allNotebooks = {};

const _setCurrentNotebook = function(notebook) {
  _currentNotebook[notebook.id] = notebook;
};

const _setAllNotebooks = function(notebooks) {
  notebooks.forEach( notebook => {
    _allNotebooks[notebook.id] = notebook;
  });

  // if(Object.keys(_currentNotebook).length === 0) {
  //   let notebook = notebooks[0];
  //   _currentNotebook[notebook.id] = notebook;
  // }
};

NotebookStore.currentNotebook = function() {
  return Object.assign({}, _currentNotebook);
};

NotebookStore.allNotebooks = function() {
  return Object.assign({}, _allNotebooks);
};

NotebookStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
      _setCurrentNotebook(payload.currentNotebook);
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.GET_ALL_NOTEBOOKS:
      _setAllNotebooks(payload.notebooks);
      NotebookStore.__emitChange();
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

module.exports = NotebookStore;
