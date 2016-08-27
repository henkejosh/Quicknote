const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;

let _tags = {};

const TagStore = new Store(Dispatcher);

const _addTag = function(tag) {
  _tags[tag.id] = tag;
};

const _updateTags = function(tags) {
  tags.tags_arr.forEach( tag => {
    _tags[tag.id] = tag;
  });
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
  }
};

module.exports = TagStore;
