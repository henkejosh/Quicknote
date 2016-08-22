"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteConstants = require('../constants/note_constants.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const NoteStore = new Store(Dispatcher);

let _notes = {};
let _notebookNotes = {};

const _setNotes = function(notes) {
  notes.forEach( note => {
    _notes[note.id] = note;
  });
};

const _setNotebookNotes = function(notes) {
  notes.forEach( note => {
    _notebookNotes[note.id] = note;
  });
};

NoteStore.allNotes = function() {
  return Object.assign({}, _notes);
};

NoteStore.allNotebookNotes = function() {
  return Object.assign({}, _notebookNotes);
};

NoteStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case NoteConstants.RECEIVE_ALL_NOTES:
      _setNotes(payload.notes);
      NoteStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
      _setNotebookNotes(payload.currentNotebook.notes);
  }
};

module.exports = NoteStore;
