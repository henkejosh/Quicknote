"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const NotebookStore = new Store(Dispatcher);

let _allNotebooks = {};

const _setAllNotebooks = function(notebooks) {
  notebooks.forEach( notebook => {
    _allNotebooks[notebook.id] = notebook;
  });
};

const _removeNotebook = function(notebookID) {
  delete _allNotebooks[notebookID];
};

const _receiveNotebook = function(notebook) {
  _allNotebooks[notebook.id] = notebook;
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
  }
};

module.exports = NotebookStore;
