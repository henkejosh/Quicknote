"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteConstants = require('../constants/note_constants.js');
const NotebookConstants = require('../constants/notebook_constants.js');
const CurrentNotebookConstants = require('../constants/current_notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNoteStore = require("./current_note_store.js");
const CurrentNoteConstants = require("../constants/current_note_constants.js");
const TagConstants = require('../constants/tag_constants.js');

const NoteStore = new Store(Dispatcher);

let _notes = {};
let _notebookNotes = {};
let _tagNotes = {};

const _setNotes = function(notes) {
  _notes = {};
  notes.notes_arr.forEach( note => {
    _notes[note.id] = note;
  });
};

const _addNote = function(note) {
  _notes[note.id] = note;
  // _notebookNotes[note.id] = note;
  _ensureRightNotebook(note);
};

const _addJustNote = function(note) {
  _notes[note.id] = note;
};

const _chooseTagNotes = function(currentTag) {
  // debugger;
  if(Object.keys(currentTag).length === 0) return;

  let note_ids = currentTag.note_ids;
  Object.keys(_notes).forEach( id => {
    note_ids.forEach( validID => {
      if(parseInt(id) === validID.id) {
        _tagNotes[id] = _notes[id];
      }
    });
  });
};

const _setNotebookNotes = function(currentNotebook) {
  const notes = currentNotebook.notes;
  _notebookNotes = {};
  notes.forEach( note => {
    note.notebook_id = currentNotebook.id;
    _notebookNotes[note.id] = note;
  });
  // CurrentNoteStore.resetCurrentNote(notes);
};

const _removeNote = function(noteID) {
  delete _notes[noteID];
  if(_notebookNotes[noteID]) delete _notebookNotes[noteID];
};

const _resetNotebookNotes = function() {
  _notebookNotes = {};
};

const _ensureRightNotebook = function(note) {
  // debugger;
  if(Object.keys(_notebookNotes).length === 0) {
    _notebookNotes[note.id] = note;
    // return;
  } else {
    Object.keys(_notebookNotes).forEach( id => {
      if(_notebookNotes[id].notebook_id === note.notebook_id) {
        _notebookNotes[note.id] = note;
      }
    });
  }
};

const _handleNewNotebookNote = function(note) {
  Object.keys(_notebookNotes).forEach( id => {
    if(_notebookNotes[id].notebook_id === note.notebook_id) {
      _notebookNotes[note.id] = note;
      return;
    }
  });
  Object.keys(_notebookNotes).forEach( id => {
    if(parseInt(id) === note.id) {
      delete _notebookNotes[note.id];
      return;
    }
  });
};

const _createNotebookNotes = function(notebookID) {
  const notes = NoteStore.find(notebookID);
  _resetNotebookNotes();
  Object.keys(notes).forEach( id => {
    _notebookNotes[id] = notes[id];
  });
  // _setNotebookNotes(notes);
};

NoteStore.tagNotes = function(tag) {
  if(Object.keys(tag).length === 0) return;

  const relevantNoteIDs = tag.note_ids;
  let tagNotes = {};
  Object.keys(_notes).forEach( noteID => {
    relevantNoteIDs.forEach( id => {
      if (noteID === id) {
        tagNotes[noteID] = _notes[noteID];
      }
    });
  });
  console.log(tagNotes);
  return tagNotes;
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

NoteStore.allNotes = function(type) {
  if(type === "all") {
    return Object.assign({}, _notes);
  } else if(type === "notebook") {
    return Object.assign({}, _notebookNotes);
  } else if(type === "tag") {
    return Object.assign({}, _tagNotes);
  }
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
      _setNotebookNotes(payload.currentNotebook);
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
    case NoteConstants.UPDATE_NOTEBOOK_NOTES:
      _createNotebookNotes(payload.notebookID);
      NoteStore.__emitChange();
      break;
    case NoteConstants.RECEIVE_NOTE_NEW_NOTEBOOK:
      _addJustNote(payload.note);
      _handleNewNotebookNote(payload.note);
      NoteStore.__emitChange();
      break;
    case CurrentNoteConstants.RECEIVE_CURRENT_NOTE:
      _addNote(payload.currentNote);
      NoteStore.__emitChange();
      break;
    case TagConstants.RECEIVE_TAG:
      _chooseTagNotes(payload.tag);
      NoteStore.__emitChange();
      break;
  }
};

module.exports = NoteStore;
