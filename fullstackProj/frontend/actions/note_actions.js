const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteApiUtil = require('../util/note_api_util');
const NoteConstants = require('../constants/note_constants.js');
const hashHistory = require('react-router').hashHistory;

const NoteActions = {
  getAllNotes: function() {
    NoteApiUtil.getAllNotes(this.receiveAllNotes);
  },

  receiveAllNotes: function(notes) {
    Dispatcher.dispatch({
      actionType: NoteConstants.RECEIVE_ALL_NOTES,
      notes: notes
    });
  }
};

module.exports = NoteActions;
