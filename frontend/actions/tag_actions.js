const Dispatcher = require('../dispatcher/dispatcher.js');
const TagApiUtil = require('../util/tag_api_util');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNoteActions = require('./current_note_actions');

const TagActions = {
  createTag: function(tag, noteID) {
    TagApiUtil.createTag(tag, noteID, this.receiveTag);
  },

  getAllTags: function() {
    TagApiUtil.getAllTags(this.receiveTags);
  },

  receiveTag: function(tag, noteID) {
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_TAG,
      tag: tag
    });

    if(noteID) CurrentNoteActions.selectCurrentNote(noteID);
  },

  receiveTags: function(tags) {
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_ALL_TAGS,
      tags: tags
    });
  },

  deleteTag: function(tag) {
    TagApiUtil.deleteTag(tag, this.removeTagFromStore);
  },

  removeTagFromStore: function(tagID) {
    Dispatcher.dispatch({
      actionType: TagConstants.REMOVE_TAG,
      tagID: tagID
    });
  },

  destroyRelationship: function(tagID, taggingID) {
    TagApiUtil.destroyRelationship(tagID, taggingID, this.updateNotesAndTags);
  },

  updateNotesAndTags: function(object) {
    Dispatcher.dispatch({
      actionType: TagConstants.UPDATE_NOTE_AND_TAG,
      tag: object.object.tag,
      note: object.object.note
    });
  },

  selectCurrentTag: function(tag, noteID) {
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_CURRENT_TAG,
      tag: tag
    });

    if(noteID) CurrentNoteActions.selectCurrentNote(noteID);
  }
};

module.exports = TagActions;
