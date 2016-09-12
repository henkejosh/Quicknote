const React = require('react');
const NoteActions = require('../actions/note_actions.js');

const NoteItem = React.createClass({
  formatLastUpdated: function() {
    const difference = Date.now() - Date.parse(this.props.updated_at);
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if(days > 31) {
      return "MONTHS AGO";
    } else if(days > 13) {
      return `${Math.floor(days / 7)} WEEKS AGO`;
    } else if(days > 1) {
      return `${Math.floor(days)} DAYS AGO`;
    } else if(days === 1) {
      return "1 DAY AGO";
    } else if(hours > 1) {
      return `${Math.floor(hours)} HOURS AGO`;
    } else if(hours === 1) {
      return "1 HOUR AGO";
    } else if (minutes > 1) {
      return `${Math.floor(minutes)} MINUTES AGO`;
    } else if(minutes === 1){
      return "1 MINUTE AGO";
    } else if(seconds > 10) {
      return `${Math.floor(seconds)} SECONDS AGO`;
    } else {
      return "JUST NOW";
    }
  },

  deleteNote: function(e) {
    e.preventDefault();
    NoteActions.deleteNote(this.props.id);
    e.stopPropagation();
  },

  formatIfCurrentNote: function() {
    if(!this.props.currentNote) return false;
    if(this.props.currentNote.id === this.props.id) {
      return <div className="selected-note-card" />;
    }
  },

  handleSelection: function(e) {
    e.preventDefault();
    this.props.selectCurrentNote(this.props.id);
  },

  formatBody: function() {
    if(!this.props.body) return;
    const html = $(this.props.body)[0];
    return html.innerText || html.textContent;
  },

  render: function() {
    return (
      <div id={`note-card-${this.props.id}`} onClick={this.handleSelection}
        className="note-card">
        { this.formatIfCurrentNote() }
        <ul>
          <li className="card-title">{this.props.title}</li>
          <li className="card-timestamp">{this.formatLastUpdated()}</li>
          <li className="card-body">{this.formatBody()}</li>
        </ul>

        <i className="fa fa-trash-o note"
          onClick={this.deleteNote}
          aria-hidden="true">
        </i>

        <div className="note-card-line-break" />
      </div>
    );
  }
});

module.exports = NoteItem;
