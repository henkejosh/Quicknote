const React = require('react');
const Modal = require('react-modal');
const NotebookStore = require('../stores/notebook_store.js');
const NoteActions = require('../actions/note_actions.js');

const LeftNavBar = React.createClass({
  handleNBClick: function(e) {
    e.preventDefault();
    if(this.props.SelectNotebookModalOpen) {
      this.props.closeSelectNotebookModal();
    } else {
      this.props.openSelectNotebookModal();
    }
  },

  handleNoteIconClick: function(e) {
    e.preventDefault();
    this.props.changeCardColumnToAllCards();
    this.props.forceUpdateAllNotes();
  },

  handleTagIconClick: function(e) {
    e.preventDefault();
    // debugger;
    if(this.props.tagModalBarIsOpen) {
      this.props.changeCardColumnToAllCards();
      this.props.forceUpdateAllNotes();
      this.props.closeSelectTagModal();
    } else {
      this.props.openSelectTagModal();
      // this.props.forceUpdateTagNotes();
    }
  },

  createNewNote: function() {
    let note = {
      title: "New Note",
      body: "<div>Edit your note in here!</div>",
      notebook_id: this.props.currentNotebook.id
    };
    NoteActions.createNewNote(note);
  },

  render: function() {
    return (
      <nav className="left-nav">
        <div className="left-container">
        <div>Current User: {this.props.currentUser}</div>


      <div className="icon-holder" onClick={this.createNewNote}>
          <i className="fa fa-plus" aria-hidden="true" />
      </div>

        <div onClick={this.handleNoteIconClick} className="icon-holder">
          <i className="fa fa-file-text" aria-hidden="true"></i>
        </div>

        <div onClick={this.handleNBClick} className="icon-holder">
          <i className="fa fa-book green-book" aria-hidden="true"></i>
        </div>

          <div className="icon-holder" onClick={this.handleTagIconClick}>
            <i className="fa fa-tag green-tag" aria-hidden="true"></i>
          </div>

        <div className="icon-holder" onClick={this.props.logout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </div>

        </div>
      </nav>
    );
  }
});

module.exports = LeftNavBar;
