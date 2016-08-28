const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteApiUtil = require('../util/note_api_util');
const NoteConstants = require('../constants/note_constants.js');
const hashHistory = require('react-router').hashHistory;
const TagActions = require('./tag_actions.js');

const NoteActions = {
  getAllNotes: function() {
    NoteApiUtil.getAllNotes(this.receiveAllNotes);
  },

  receiveAllNotes: function(notes) {
    Dispatcher.dispatch({
      actionType: NoteConstants.RECEIVE_ALL_NOTES,
      notes: notes
    });
  },

  getNote: function(noteID) {
    NoteApiUtil.selectCurrentNote(noteID, this.receiveNote);
  },

  createNewNote: function(note) {
    NoteApiUtil.createNote(note, this.receiveNote);
  },

  updateNotebookNotes: function(notebookID) {
    Dispatcher.dispatch({
      actionType: NoteConstants.UPDATE_NOTEBOOK_NOTES,
      notebookID: notebookID
    });
  },

  receiveNote: function(note) {
    Dispatcher.dispatch({
      actionType: NoteConstants.RECEIVE_NOTE,
      note: note
    });
  },

  updateNote: function(note) {
    NoteApiUtil.updateNote(note, this.receiveNote);
  },

  changeNoteNotebook: function(note) {
    NoteApiUtil.updateNote(note, this.receiveNoteNewNotebook);
  },

  receiveNoteNewNotebook: function(note) {
    Dispatcher.dispatch({
      actionType: NoteConstants.RECEIVE_NOTE_NEW_NOTEBOOK,
      note: note
    });
  },

  deleteNote: function(noteID) {
    NoteApiUtil.deleteNote(noteID, this.removeNoteFromStore);
  },

  removeNoteFromStore: function(noteID) {
    Dispatcher.dispatch({
      actionType: NoteConstants.REMOVE_NOTE,
      noteID: noteID
    });
    TagActions.getAllTags();
  },
};

module.exports = NoteActions;
