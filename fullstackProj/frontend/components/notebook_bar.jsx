const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');

const NotebookBar = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    return (
      <Modal style={NotebookBarModStyle} isOpen={this.props.isOpen}>
        <div>
          <h2 className="modal-type">Notebooks</h2>
          <br/>

          <div className="cancel-button">
            <button type="cancel" onClick={this.props.closeSelectNotebookModal}>Exit</button>
          </div>

        </div>
      </Modal>
    );
  }
});

module.exports = NotebookBar;
