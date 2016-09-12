const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const TagConstants = require('../constants/tag_constants.js');
const NoteConstants = require('../constants/note_constants.js');
const SessionConstants = require('../constants/session_constants.js');

let _tags = {};

const TagStore = new Store(Dispatcher);

const _addTag = function(tag) {
  _tags[tag.id] = tag;
};

const _updateTags = function(tags) {
  _tags = {};
  tags.tags_arr.forEach( tag => {
    _tags[tag.id] = tag;
  });
};

const _removeTag = function(tagID) {
  if(_tags[tagID]) delete _tags[tagID];
};

const _resetStore = function() {
  _tags = {};
};

TagStore.allTags = function() {
  return Object.assign( {}, _tags);
};

TagStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case TagConstants.RECEIVE_TAG:
      _addTag(payload.tag);
      TagStore.__emitChange();
      break;
    case TagConstants.RECEIVE_ALL_TAGS:
      _updateTags(payload.tags);
      TagStore.__emitChange();
      break;
    case TagConstants.REMOVE_TAG:
      _removeTag(payload.tagID);
      TagStore.__emitChange();
      break;
    case TagConstants.UPDATE_NOTE_AND_TAG:
      _addTag(payload.tag);
      TagStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _resetStore();
      break;
  }
};

module.exports = TagStore;
