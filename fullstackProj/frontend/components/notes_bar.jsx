const React = require('react');
const NoteItem = require('./note_item.jsx');

const NotesBar = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    const that = this;
    return (
      <div className="notes-bar">
      { Object.keys(that.props.notes).map( id => {
          let note = that.props.notes[id];
          return (
            < NoteItem key={id}
                body={note.body}
                notebook_id={note.notebook_id}
                title={note.title}
                id={note.id}
              />
          );
        })
      }
      </div>
    );
  }
});

module.exports = NotesBar;
