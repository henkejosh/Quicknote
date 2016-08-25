"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteConstants = require('../constants/note_constants.js');
const CurrentNoteConstants = require('../constants/current_note_constants.js');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('./notebook_store.js');

const CurrentNoteStore = new Store(Dispatcher);

let _currentNote = {};

const _setCurrentNote = function(note) {
  // _currentNote[note.id] = note;
  _currentNote = note;
};

const _chooseLastNote = function(notes) {
  const ids = Object.keys(notes);
  const lastID = Math.max.apply(null, ids);
  // _currentNote[lastID] = notes[lastID];
  _currentNote = notes[lastID];
};

const _bootstrapCurrentNote = function(notes) {
  if(Object.keys(_currentNote).length === 0) {
    _chooseLastNote(notes);
  }
};

const _removeNote = function(noteID) {
  if(_currentNote.id === noteID) _currentNote = {};
};

CurrentNoteStore.currentNote = function() {
  return Object.assign({}, _currentNote);
};

CurrentNoteStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case CurrentNoteConstants.RECEIVE_CURRENT_NOTE:
      _setCurrentNote(payload.currentNote);
      CurrentNoteStore.__emitChange();
      break;
    case NoteConstants.RECEIVE_ALL_NOTES:
      _bootstrapCurrentNote(payload.notes);
      CurrentNoteStore.__emitChange();
      break;
    case NoteConstants.REMOVE_NOTE:
      _removeNote(payload.note);
      CurrentNoteStore.__emitChange();
      break;
  }
};

module.exports = CurrentNoteStore;
