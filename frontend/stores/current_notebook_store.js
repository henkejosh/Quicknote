"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const CurrentNotebookConstants = require('../constants/current_notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('./notebook_store.js');

const CurrentNotebookStore = new Store(Dispatcher);

let _currentNotebook = {};

const _setCurrentNotebook = function(notebook) {
  _currentNotebook = notebook;
};

const _chooseLastNotebook = function(notebooks) {
  const ids = Object.keys(notebooks);
  const lastID = Math.max.apply(null, ids);
  _currentNotebook = notebooks[lastID];
};

const _chooseLastNotebookFromArr = function(notebooks) {
  if(Array.isArray(notebooks.notebooks_arr)) {
    let newNotebooks = {};
    notebooks.notebooks_arr.forEach( nb => {
      newNotebooks[nb.id] = nb;
    });
    _chooseLastNotebook(newNotebooks);
  }
};

const _bootstrapCurrentNotebook = function(notebooks) {
  if(Array.isArray(notebooks.notebooks_arr)) {
    let newNotebooks = {};
    notebooks.notebooks_arr.forEach( nb => {
      newNotebooks[nb.id] = nb;
    });
    notebooks = newNotebooks;
  }

  if(Object.keys(_currentNotebook).length === 0) {
    _chooseLastNotebook(notebooks);
  }
};

CurrentNotebookStore.resetCurrentNotebook = function(notebooks) {
  _currentNotebook = {};
  _bootstrapCurrentNotebook(notebooks);
};

CurrentNotebookStore.currentNotebook = function() {
  return Object.assign({}, _currentNotebook);
};

CurrentNotebookStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case CurrentNotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
      _setCurrentNotebook(payload.currentNotebook);
      CurrentNotebookStore.__emitChange();
      break;
    case NotebookConstants.GET_ALL_NOTEBOOKS:
      _bootstrapCurrentNotebook(payload.notebooks);
      CurrentNotebookStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_NOTEBOOK:
      _setCurrentNotebook(payload.notebook);
      CurrentNotebookStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_UPDATED_NOTEBOOK:
      _setCurrentNotebook(payload.notebook);
      CurrentNotebookStore.__emitChange();
      break;
    case NotebookConstants.UPDATE_ALL_NOTEBOOKS_POST_DELETE:
      _chooseLastNotebook(payload.notebooks);
      CurrentNotebookStore.__emitChange();
      break;
  }
};

module.exports = CurrentNotebookStore;
