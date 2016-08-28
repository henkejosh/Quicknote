const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const TagConstants = require('../constants/tag_constants.js');
const NoteConstants = require('../constants/note_constants.js');

let _tags = {};

const TagStore = new Store(Dispatcher);

const _addTag = function(tag) {
  _tags[tag.id] = tag;
};

const _updateTags = function(tags) {
  _tags = {};
  // debugger;
  tags.tags_arr.forEach( tag => {
    _tags[tag.id] = tag;
  });
};

const _removeTag = function(tagID) {
  if(_tags[tagID]) delete _tags[tagID];
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
    // case NoteConstants.RECEIVE_ALL_NOTES:
    //   _updateTags(payload.notes)
    //   TagStore.__emitChange();
  }
};

module.exports = TagStore;
