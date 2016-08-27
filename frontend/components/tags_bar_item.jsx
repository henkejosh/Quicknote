const React = require('react');

const TagsBarItem = React.createClass({
  handleSelection: function(e) {
    e.preventDefault();
    this.props.changeCardColumnToTag();
    this.props.closeSelectTagModal();
  },

  formatNoteCount: function() {
    return this.props.tag.note_ids.length;
  },

  render: function() {
    return (
      <li onClick={this.handleSelection}
        className="current-note-tag"
        >{this.props.title}: [{this.formatNoteCount()}]</li>
    );
  }
});

module.exports = TagsBarItem;
