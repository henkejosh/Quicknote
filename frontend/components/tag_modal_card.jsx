const React = require('react');
const TagActions = require('../actions/tag_actions.js');
const CurrentNoteActions = require('../actions/current_note_actions.js');

const TagModalCard = React.createClass({
  handleSelection: function(e) {
    e.preventDefault();
    // this.props.selectCurrentTag(this.props.tag);
    let noteID;
    if(this.props.tag.note_ids) {
      noteID = this.props.tag.note_ids[0].id;
    }
    // CurrentNoteActions.selectCurrentNote(noteID);
    TagActions.selectCurrentTag(this.props.tag, noteID);
    this.props.changeCardColumnToTag();
    this.props.closeSelectTagModal();
  },

  formatNoteCount: function() {
    if(this.props.tag.note_ids) {
      return this.props.tag.note_ids.length;
    } else {
      return "0";
    }
  },

  render: function() {
    return (
      <li onClick={this.handleSelection}
        className="current-note-tag"
        >{this.props.title}: [{this.formatNoteCount()}]</li>
    );
  }
});

module.exports = TagModalCard;
