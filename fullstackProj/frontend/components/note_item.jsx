const React = require('react');

const NoteItem = React.createClass({
  formatLastUpdated: function() {
    let difference = Date.now() - Date.parse(this.props.updated_at);
    if(difference < 0.6) {
      return "JUST NOW";
    } else {
      return `${Math.ceil(difference / 86400000)} DAYS AGO`;
    }
  },

  render: function() {
    return (
      <div className="note-card">
        <ul>
          <li>{this.props.title}</li>
          <li>{this.formatLastUpdated()}</li>
          <li>{this.props.body}</li>
        </ul>
      </div>
    );
  }
});

module.exports = NoteItem;
