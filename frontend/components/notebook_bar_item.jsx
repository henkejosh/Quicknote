const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');
const NoteStore = require('../stores/note_store.js');
const CurrentNotebookActions = require('../actions/current_notebook_actions.js');
const NotebookActions = require('../actions/notebook_actions.js');
const CurrentNotebookStore = require('../stores/current_notebook_store.js');

const NotebookBarItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    CurrentNotebookActions.selectCurrentNotebook(this.props.id);
    this.props.changeCardColumnToNotebook();
    this.props.closeSelectNotebookModal();
  },

  handleDelete: function(e) {
    e.preventDefault();
    NotebookActions.deleteNotebook(this.props.id);
    NotebookActions.getAllNotebooks();
    this.props.changeCardColumnToAllCards();
    this.props.closeSelectNotebookModal();
    // CurrentNotebookStore.resetCurrentNotebook(this.props.notebooks);
    e.stopPropagation();
  },

  render: function() {
    return (
      <div>
        <ul className="notebook-card" onClick={this.handleClick}>
          <li>{this.props.title}</li>
          <li>{NoteStore.count(this.props.id)} notes</li>

          <li className="notebook-delete-icon"
            onClick={this.handleDelete}>DELETE</li>

        </ul>
      </div>
    );
  }
});

module.exports = NotebookBarItem;
