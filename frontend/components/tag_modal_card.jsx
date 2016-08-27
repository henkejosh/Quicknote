const React = require('react');

const TagModalCard = React.createClass({
  handleSelection: function(e) {
    e.preventDefault();
    this.props.selectCurrentTag(this.props.tag);
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
