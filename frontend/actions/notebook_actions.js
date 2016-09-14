const Dispatcher = require('../dispatcher/dispatcher.js');
const NotebookApiUtil = require('../util/notebook_api_util');
const NotebookConstants = require('../constants/notebook_constants.js');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('./note_actions.js');
const TagActions = require('./tag_actions.js');

const NotebookActions = {
  getAllNotebooks: function() {
    NotebookApiUtil.getAllNotebooks(this.receiveAllNotebooks);
  },

  receiveAllNotebooks: function(notebooks) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.GET_ALL_NOTEBOOKS,
      notebooks: notebooks
    });
  },

  createNotebook: function(notebook) {
    NotebookApiUtil.createNotebook(notebook, this.receiveNotebook);
  },

  receiveNotebook: function(notebook) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.RECEIVE_NOTEBOOK,
      notebook: notebook
    });
  },

  deleteNotebook: function(notebookID) {
    NotebookApiUtil.deleteNotebook(notebookID, this.removeNotebookFromStore);
  },

  removeNotebookFromStore: function(object) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.UPDATE_ALL_NOTEBOOKS_POST_DELETE,
      notebooks: object.notebooks
    });
    NoteActions.receiveAllNotes(object.notes);
    TagActions.getAllTags();
  },

  updateNotebook: function(notebook) {
    NotebookApiUtil.updateNotebook(notebook, this.receiveUpdatedNotebook);
  },

  receiveUpdatedNotebook: function(notebook) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.RECEIVE_UPDATED_NOTEBOOK,
      notebook: notebook
    });
  }
};

module.exports = NotebookActions;
