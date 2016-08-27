const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;

let _tags = {};

const TagStore = new Store(Dispatcher);

const _addTag = function(tag) {
  _tags[tag.id] = tag;
};

TagStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case TagConstants.RECEIVE_TAG:
      _addTag(payload.tag);
      console.log(_tags);
      TagStore.__emitChange();
      break;
  }
};

module.exports = TagStore;
