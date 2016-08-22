const React = require('react');
const Modal = require('react-modal');

const LeftNavBar = React.createClass({
  handleNBClick: function(e) {
    e.preventDefault();
    if(this.props.select_notebook_modal_open) {
      this.props.closeSelectNotebookModal();
    } else {
      this.props.openSelectNotebookModal();
    }
  },

  render: function() {
    return (
      <nav className="left-nav">
        <div>Current User: {this.props.currentUser}</div>
        <div className="note-icon">Note</div>
        <div onClick={this.handleNBClick}
          className="notebook-icon">NB</div>
      </nav>
    );
  }
});

module.exports = LeftNavBar;
