const React = require('react');
const NotebookActions = require("../actions/notebook_actions.js");
const CurrentNotebookActions = require("../actions/current_notebook_actions.js");

const NotebookCreator = React.createClass({
  getInitialState: function() {
    return { title: ""};
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
    if(this.state.title === "") return ;

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
        <i className="fa fa-book create" aria-hidden="true"></i>

        <h3>CREATE NOTEBOOK</h3>

        <div className="notebook-creator-break" />

        <input type='text'
          onChange={this.handleTextChange}
          value={this.state.title}
          className="create-notebook-title"
          placeholder="Title your notebook"
          />

        <div className="nb-buttons">
          <div className="nb-cancel-button"
            onClick={this.handleCancel}>Cancel</div>

          <div className="nb-create-button"
            onClick={this.handleCreate}>Create notebook</div>
        </div>
      </div>
    );
  }
});

module.exports = NotebookCreator;
