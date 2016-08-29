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

  formatSelectedNotesIcon: function() {
    if(!this.props.cardColumnStyle) return;
    if(this.props.cardColumnStyle === "all") {
      return <div className="selected-icon-all selected-icon" />;
    }
  },

  formatSelectedNotebookIcon: function() {
    if(!this.props.cardColumnStyle) return;
    if(this.props.cardColumnStyle === "notebook") {
      return <div className="selected-icon-notebook selected-icon" />;
    }
  },

  formatSelectedTagIcon: function() {
    if(!this.props.cardColumnStyle) return;
    if(this.props.cardColumnStyle === "tag") {
      return <div className="selected-icon-tag selected-icon" />;
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
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAALklEQVR42mNgQAIJCQn1KJyEhMT/KBywADIHKpDUgCIA0YIQRDIUIsiAam1SAwDY1SaFYcC7cwAAAABJRU5ErkJggg=="
            className="hover-tag-arrow add-note"/>
          <span className="icon-hover-tag add-note-tag">New Note</span>
      </div>

        <div onClick={this.handleNoteIconClick} className="icon-holder">
          <i className="fa fa-file-text" aria-hidden="true" />
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAALklEQVR42mNgQAIJCQn1KJyEhMT/KBywADIHKpDUgCIA0YIQRDIUIsiAam1SAwDY1SaFYcC7cwAAAABJRU5ErkJggg=="
            className="hover-tag-arrow all-notes" />
          <span className="icon-hover-tag all-notes-tag" >New Note</span>
          { this.formatSelectedNotesIcon() }
        </div>

        <div onClick={this.handleNBClick} className="icon-holder">
          <i className="fa fa-book green-book" aria-hidden="true"></i>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAALklEQVR42mNgQAIJCQn1KJyEhMT/KBywADIHKpDUgCIA0YIQRDIUIsiAam1SAwDY1SaFYcC7cwAAAABJRU5ErkJggg=="
            className="hover-tag-arrow notebook-notes" />
          <span className="icon-hover-tag notebooks-tag" >Notebooks</span>
          { this.formatSelectedNotebookIcon() }
        </div>

          <div className="icon-holder" onClick={this.handleTagIconClick}>
            <i className="fa fa-tag green-tag" aria-hidden="true"></i>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAALklEQVR42mNgQAIJCQn1KJyEhMT/KBywADIHKpDUgCIA0YIQRDIUIsiAam1SAwDY1SaFYcC7cwAAAABJRU5ErkJggg=="
              className="hover-tag-arrow tag-notes" />
            <span className="icon-hover-tag tags-tag">TAGS</span>
            { this.formatSelectedTagIcon() }
          </div>

        <div className="icon-holder" onClick={this.props.logout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAALklEQVR42mNgQAIJCQn1KJyEhMT/KBywADIHKpDUgCIA0YIQRDIUIsiAam1SAwDY1SaFYcC7cwAAAABJRU5ErkJggg=="
            className="hover-tag-arrow log-out-icon" />
          <span className="icon-hover-tag add-note-tag">Log Out</span>
        </div>

        </div>
      </nav>
    );
  }
});

module.exports = LeftNavBar;
