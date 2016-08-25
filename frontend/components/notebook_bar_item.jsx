const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');
const NoteStore = require('../stores/note_store.js');
const CurrentNotebookActions = require('../actions/current_notebook_actions.js');

const NotebookBarItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    CurrentNotebookActions.selectCurrentNotebook(this.props.id);
    this.props.changeCardColumnToNotebook();
    this.props.closeSelectNotebookModal();
  },

  render: function() {
    return (
      <div>
        <ul className="notebook-card" onClick={this.handleClick}>
          <li>{this.props.title}</li>
          <li>{NoteStore.count(this.props.id)} notes</li>
        </ul>
      </div>
    );
  }
});

module.exports = NotebookBarItem;
