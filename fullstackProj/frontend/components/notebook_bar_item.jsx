const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');
const NoteStore = require('../stores/note_store.js');

const NotebookBarItem = React.createClass({

  render: function() {
    return (
      <div>
        <ul>
          <li>{this.props.title}</li>
          <li>{NoteStore.count(this.props.id)} notes</li>
        </ul>
      </div>
    );
  }
});

module.exports = NotebookBarItem;
