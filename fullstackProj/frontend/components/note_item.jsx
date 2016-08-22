const React = require('react');

const NoteItem = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li>{this.props.title}</li>
          <li>NoteID: {this.props.id}</li>
          <li>{this.props.body}</li>
          <li>NotebookID: {this.props.notebook_id}</li>
        </ul>
      </div>
    );
  }
});

module.exports = NoteItem;
