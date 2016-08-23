const React = require('react');
const NoteItem = require('./note_item.jsx');

const NotesBar = React.createClass({

  formatCurrentNotebookTitle: function() {
    if(Object.keys(this.props.currentNotebook).length === 0) {
      return "NOTES";
    } else {
      return this.props.currentNotebook.title;
    }
  },

  formatNotesLength: function() {
    const notesLength = Object.keys(this.props.notes).length;
    return `${notesLength} notes`;
  },

  render: function() {
    const that = this;
    return (
      <div className="notes-bar">
        <div className="note-card-title">
          <div>{this.formatCurrentNotebookTitle()}</div>
          <span>{this.formatNotesLength()}</span>
        </div>

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
              />
          );
        })
      }
      </div>
    );
  }
});

module.exports = NotesBar;
