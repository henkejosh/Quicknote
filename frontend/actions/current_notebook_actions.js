const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookApiUtil = require('../util/notebook_api_util');
const CurrentNotebookConstants = require('../constants/current_notebook_constants.js');
const hashHistory = require('react-router').hashHistory;

const CurrentNotebookActions = {
  selectCurrentNotebook: function(notebookID) {
    NotebookApiUtil.selectCurrentNotebook(notebookID, this.receiveCurrentNotebook);
  },

  receiveCurrentNotebook: function(notebook) {
    Dispatcher.dispatch({
      actionType: CurrentNotebookConstants.RECEIVE_CURRENT_NOTEBOOK,
      currentNotebook: notebook
    });
  }
};

module.exports = CurrentNotebookActions;
