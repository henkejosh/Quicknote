"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteConstants = require('../constants/note_constants.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const CurrentNotebookConstants = require('../constants/current_notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNoteStore = require("./current_note_store.js");

const NoteStore = new Store(Dispatcher);

let _notes = {};
let _notebookNotes = {};

const _setNotes = function(notes) {
  notes.forEach( note => {
    _notes[note.id] = note;
  });
};

const _addNote = function(note) {
  _notes[note.id] = note;
  _notebookNotes[note.id] = note;
};

const _setNotebookNotes = function(notes) {
  _notebookNotes = {};
  notes.forEach( note => {
    _notebookNotes[note.id] = note;
  });
};

const _removeNote = function(noteID) {
  delete _notes[noteID];
  if(_notebookNotes[noteID]) delete _notebookNotes[noteID];
};

const _resetNotebookNotes = function() {
  _notebookNotes = {};
};

NoteStore.find = function(notebookID) {
  let returnNotes = {};
  Object.keys(_notes).forEach( id => {
    if(_notes[id].notebook_id === notebookID) {
      returnNotes[id] = _notes[id];
    }
  });
  return returnNotes;
};

NoteStore.count = function(notebookID) {
  return Object.keys(this.find(notebookID)).length;
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
    case CurrentNotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
      _setNotebookNotes(payload.currentNotebook.notes);
      NoteStore.__emitChange();
      break;
    case NoteConstants.RECEIVE_NOTE:
      _addNote(payload.note);
      NoteStore.__emitChange();
      break;
    case NoteConstants.REMOVE_NOTE:
      _removeNote(payload.noteID);
      NoteStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_NOTEBOOK:
      _resetNotebookNotes();
      NoteStore.__emitChange();
      break;
  }
};

module.exports = NoteStore;
