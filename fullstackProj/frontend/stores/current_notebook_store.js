"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('./notebook_store.js');

const CurrentNotebookStore = new Store(Dispatcher);

let _currentNotebook = {};

const _setCurrentNotebook = function(notebook) {
  _currentNotebook[notebook.id] = notebook;
};

CurrentNotebookStore.currentNotebook = function() {
  // if(Object.keys(_currentNotebook).length === 0) {
  //   _currentNotebook = NotebookStore.mostRecentNotebook();
  // }
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

module.exports = CurrentNotebookStore;
