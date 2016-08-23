const React = require('react');
const Modal = require('react-modal');
const NotebookStore = require('../stores/notebook_store.js');

const LeftNavBar = React.createClass({
  handleNBClick: function(e) {
    e.preventDefault();
    if(this.props.select_notebook_modal_open) {
      this.props.closeSelectNotebookModal();
    } else {
      this.props.openSelectNotebookModal();
    }
  },

  createNewNote: function() {
    let notebook;
    if(Object.keys(this.props.currentNotebook).length === 0) {
      notebook = NotebookStore.mostRecentNotebook();
    } else {
      notebook = this.props.currentNotebook;
    }
    // let note = {
    //   notebook_id: notebook.id,
    //
    // }
  },

  render: function() {
    return (
      <nav className="left-nav">
        <div>Current User: {this.props.currentUser}</div>
          <br/>
        <div className="add-note-icon nav-icon"
          onClick={this.createNewNote}>Add Note</div>

          <br/>
        <div className="note-icon nav-icon">Note Icon</div>

          <br/>
        <div onClick={this.handleNBClick}
          className="notebook-icon nav-icon">NB Icon</div>
          <br/>

        <p className="log-out"
          onClick={this.props.logout}>Log Out</p>

      </nav>
    );
  }
});

module.exports = LeftNavBar;
