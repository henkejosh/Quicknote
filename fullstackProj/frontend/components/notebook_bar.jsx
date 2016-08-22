const React = require('react');
const Modal = require('react-modal');

const NotebookBar = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    return (
      <div className="notebook-bar">
        {this.props.currentNotebook}
      </div>
    );
  }
});

module.exports = NotebookBar;
