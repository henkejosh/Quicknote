const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;

let _currentTag = {};

const CurrentTagStore = new Store(Dispatcher);

const _updateCurrentTag = function(tag) {
  _currentTag = tag;
};

CurrentTagStore.currentTag = function() {
  return Object.assign( {}, _currentTag);
};

CurrentTagStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case TagConstants.RECEIVE_TAG:
      _updateCurrentTag(payload.tag);
      CurrentTagStore.__emitChange();
      break;
    case TagConstants.RECEIVE_CURRENT_TAG:
      _updateCurrentTag(payload.tag);
      CurrentTagStore.__emitChange();
      break;
  }
};

module.exports = CurrentTagStore;
