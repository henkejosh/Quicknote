const React = require('react');

const TagsBarItem = React.createClass({
  render: function() {
    return (
      <li className="current-note-tag">{this.props.title}</li>
    );
  }
});

module.exports = TagsBarItem;
