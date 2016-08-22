const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');

const NotebookBarItem = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    return (
      <div>
        <ul>
          <li>{this.props.title}</li>
          <li>{this.props.id}</li>
          <li>{this.props.user_id}</li>
        </ul>
      </div>
    );
  }
});

module.exports = NotebookBarItem;
