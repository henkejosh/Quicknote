const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteApiUtil = require('../util/note_api_util');
const CurrentNoteConstants = require('../constants/current_note_constants.js');
const hashHistory = require('react-router').hashHistory;

const CurrentNoteActions = {
  selectCurrentNote: function(noteID) {
    NoteApiUtil.selectCurrentNote(noteID, this.receiveCurrentNote);
  },

  receiveCurrentNote: function(note) {
    Dispatcher.dispatch({
      actionType: CurrentNoteConstants.RECEIVE_CURRENT_NOTE,
      currentNote: note
    });
  },

};

module.exports = CurrentNoteActions;
