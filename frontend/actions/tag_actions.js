const Dispatcher = require('../dispatcher/dispatcher.js');
const TagApiUtil = require('../util/tag_api_util');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNoteActions = require('./current_note_actions.js');

const TagActions = {
  createTag: function(tag, noteID) {
    TagApiUtil.createTag(tag, noteID, this.receiveTag);
  },

  receiveTag: function(tag, noteID) {
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_TAG,
      tag: tag
    });
    CurrentNoteActions.selectCurrentNote(noteID);
  }
};

module.exports = TagActions;
