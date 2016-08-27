const React = require('react');

const TagsBarItem = React.createClass({
  handleSelection: function(e) {
    e.preventDefault();
    this.props.changeCardColumnToTag();
    this.props.closeSelectTagModal();
  },

  render: function() {
    return (
      <li onClick={this.handleSelection}
        className="current-note-tag">{this.props.title}</li>
    );
  }
});

module.exports = TagsBarItem;
