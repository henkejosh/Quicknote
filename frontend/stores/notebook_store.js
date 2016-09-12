"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNotebookStore = require('./current_notebook_store.js');
const SessionConstants = require('../constants/session_constants.js');

const NotebookStore = new Store(Dispatcher);

let _allNotebooks = {};

const _setAllNotebooks = function(notebooks) {
  // if(Array.isArray(notebooks.notebooks_arr)) {
  //   let newNotebooks = {};
  //   notebooks.notebooks_arr.forEach( nb => {
  //     newNotebooks[nb.id] = nb;
  //   });
  //   notebooks = newNotebooks;
  // }
  // debugger;
  _allNotebooks = {};
  if(notebooks.notebooks_arr) {
    notebooks = notebooks.notebooks_arr;
  } else if(Object.keys(notebooks).length === 0) {
    return {};
  }

  notebooks.forEach( notebook => {
    _allNotebooks[notebook.id] = notebook;
  });
};

const _removeNotebook = function(notebookID) {
  delete _allNotebooks[notebookID];
  CurrentNotebookStore.resetCurrentNotebook(_allNotebooks);
};

const _receiveNotebook = function(notebook) {
  _allNotebooks[notebook.id] = notebook;
};

const _resetStore = function() {
  _allNotebooks = {};
};

NotebookStore.findNotebook = function(notebookID) {
  let notebook;
  Object.keys(_allNotebooks).forEach( id => {
    if(parseInt(id) === notebookID) {
      notebook = _allNotebooks[id];
    }
  });
  return notebook;
};

NotebookStore.mostRecentNotebook = function() {
  const ids = Object.keys(_allNotebooks);
  const lastID = Math.max.apply(null, ids);
  return {lastID: _allNotebooks[lastID]};
};

NotebookStore.allNotebooks = function() {
  return Object.assign({}, _allNotebooks);
};

NotebookStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NotebookConstants.GET_ALL_NOTEBOOKS:
      _setAllNotebooks(payload.notebooks);
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.REMOVE_NOTEBOOK:
      _removeNotebook(payload.notebookID);
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_NOTEBOOK:
      _receiveNotebook(payload.notebook);
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.UPDATE_ALL_NOTEBOOKS_POST_DELETE:
      _setAllNotebooks(payload.notebooks);
      NotebookStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _resetStore();
      break;
  }
};

module.exports = NotebookStore;
