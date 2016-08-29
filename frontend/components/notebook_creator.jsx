const React = require('react');
const NotebookActions = require("../actions/notebook_actions.js");
const CurrentNotebookActions = require("../actions/current_notebook_actions.js");

const NotebookCreator = React.createClass({
  getInitialState: function() {
    return { title: "Title your notebook"};
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.closeNotebookCreator();
  },

  handleTextChange: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  },

  handleCreate: function(e) {
    e.preventDefault();
    let notebook = {};
    notebook["title"] = this.state.title;
    notebook["user_id"] = this.props.currentUserID;
    NotebookActions.createNotebook(notebook);
    this.props.closeNotebookCreator();
    this.props.closeSelectNotebookModal();
    this.props.changeCardColumnToNotebook();
  },

  render: function () {
    return (
      <div className="notebook-creator-modal">
        <h3>CREATE NOTEBOOK</h3>
        <input onChange={this.handleTextChange}
          type='text' value={this.state.title}
          className="create-notebook-title"/>
        <div className="nb-buttons"
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleCreate}>Create notebook</button>
        </div>
      </div>
    );
  }
});

module.exports = NotebookCreator;
