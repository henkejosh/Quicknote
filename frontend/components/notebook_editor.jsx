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
    // notebook["user_id"] = this.props.currentUserID;
    NotebookActions.updateNotebook(notebook);
    this.props.closeNotebookEditor();
    // this.props.closeSelectNotebookModal();
    this.props.changeCardColumnToNotebook();
  },

  render: function() {
    return (
      <div className="notebook-editor-modal">
          <h3>NOTEBOOK INFO</h3>
          <p>Title: <input onChange={this.handleTextChange}
            type='text' value={this.state.title}/>
          </p>
          <p>Creator: {this.props.currentUser}</p>

            <br/>

          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleCreate}>Update notebook</button>
        </div>
    );
  }
});

module.exports = NotebookEditor;
