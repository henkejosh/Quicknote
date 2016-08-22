const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookApiUtil = require('../util/notebook_api_util');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const CurrentNotebookActions = {
  selectCurrentNotebook: function(notebook) {
    NotebookApiUtil.selectCurrentNotebook(notebook, this.receiveCurrentNotebook);
  },

  receiveCurrentNotebook: function(notebook) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.RECEIVE_CURRENT_NOTEBOOK,
      currentNotebook: notebook
    });
  },

};

module.exports = CurrentNotebookActions;
