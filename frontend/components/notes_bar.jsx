const React = require('react');
const NoteItem = require('./note_item.jsx');

const NotesBar = React.createClass({
  formatCardColumnType: function() {
    if(this.props.cardColumnStyle === "all") {
      return "NOTES";
    } else if(this.props.cardColumnStyle === "notebook"){
      return `NOTEBOOK: ${this.props.currentNotebook.title}`;
    } else if(this.props.cardColumnStyle === "tag") {
      if(this.props.currentTag.title) {
        return `TAG: ${this.props.currentTag.title}`;
      } else {
        return "NOTES";
      }
    }
  },

  formatCardColumnHeader: function() {
    if(this.props.cardColumnStyle === "notebook") {
      return (
        <i key={`nb-${this.props.currentNotebook.id}`}
          onClick={this.openNotebookEditor}
          className="fa fa-pencil-square-o edit-nb-icon"
          aria-hidden="true"></i>
      );
      // className="edit-nb-icon">EDIT NB!!!</div>
    }
    // } else if(this.props.cardColumnStyle === "tag") {
    //   return (
    //     <div key={`tag-${this.props.currentTag.id}`}
    //       onClick={this.openNotebookEditor}
    //       className="edit-nb-icon">EDIT NB!!!</div>
    //   );
    // }
  },

  formatNotesLength: function() {
    let notesLength;
    if(this.props.cardColumnStyle === "tag") {
      if(this.props.currentTag.note_ids) {
        notesLength = this.props.currentTag.note_ids.length;
      } else {
        notesLength = 0;
      }
    } else {
    // if(this.props.cardColumnStyle === "notebook") {
      notesLength = Object.keys(this.props.notes).length;
    }
    return `${notesLength} notes`;
  },

  openNotebookEditor: function(e) {
    e.preventDefault();
    this.props.openNotebookEditor();
  },

  render: function() {
    const that = this;
    return (
      <div className="notes-bar">
        <div className="current-notebook-card">

          { this.formatCardColumnHeader() }

          <div className="notebook-card-title">
            <div className="notes-bar-title">{this.formatCardColumnType()}</div>

          </div>

          <div className="count-holder">
            <span className="note-count">{this.formatNotesLength()}</span>
          </div>
        </div>

        <div className="note-cards">
          { Object.keys(that.props.notes).map( id => {
              let note = that.props.notes[id];
              return (
                < NoteItem key={id}
                    body={note.body}
                    notebook_id={note.notebook_id}
                    title={note.title}
                    id={note.id}
                    created_at={note.created_at}
                    updated_at={note.updated_at}
                    selectCurrentNote={this.props.selectCurrentNote}
                    currentNote={this.props.currentNote}
                  />
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = NotesBar;
