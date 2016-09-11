const React = require('react');
const NotebookActions = require("../actions/notebook_actions.js");
const CurrentNotebookActions = require("../actions/current_notebook_actions.js");

const NotebookEditor = React.createClass({
  getInitialState: function() {
    return { title: this.props.currentNotebook.title };
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.closeNotebookEditor();
  },

  handleTextChange: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  },

  handleCreate: function(e) {
    e.preventDefault();
    let notebook = this.props.currentNotebook;
    notebook["title"] = this.state.title;
    NotebookActions.updateNotebook(notebook);
    this.props.closeNotebookEditor();
    this.props.changeCardColumnToNotebook();
  },

  render: function() {
    return (
      <div className="notebook-editor-modal">
        <div className="notebook-modal-body">

          <h3>NOTEBOOK INFO</h3>

          <span className="nb-editor-title-card"><p
            className="title-word">Title: <
            /p><input
            className="edit-notebook-title"
            onChange={this.handleTextChange}
            type='text' value={this.state.title}/>
          </span>

          <span className="nb-editor-creator-card"
            >Creator: <p>{this.props.currentUser}</p></span>

          <div className="notebook-editor-break" />

          <div className="nb-buttons-editor">
            <div className="nb-cancel-button"
              onClick={this.handleCancel}>Cancel</div>

            <div className="nb-create-button"
              onClick={this.handleCreate}>Update notebook</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NotebookEditor;
