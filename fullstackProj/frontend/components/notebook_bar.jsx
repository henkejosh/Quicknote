const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');
const NotebookBarItem = require('./notebook_bar_item.jsx');
const NotebookStore = require('../stores/notebook_store.js');
const NotebookActions = require('../actions/notebook_actions.js');

const NotebookBar = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.allNotebooks()
    };
  },

  componentDidMount: function() {
    this.notebookStoreListener = NotebookStore.addListener(this.updateNotebooks);
  },

  updateNotebooks: function() {
    this.setState({ notebooks: NotebookStore.allNotebooks() });
  },

  componentWillMount: function() {
    NotebookActions.getAllNotebooks();
  },

  render: function() {
    const that = this;
    return (
      <Modal style={NotebookBarModStyle} isOpen={this.props.isOpen}>
        <div>
          <h2 className="modal-type">Notebooks</h2>
          <br/>

          { Object.keys(that.state.notebooks).map( id => {
              let notebook = that.state.notebooks[id];
              return (
                < NotebookBarItem key={id}
                    title={notebook.title}
                    user_id={notebook.user_id}
                  />
              );
            })
          }

          <div className="cancel-button">
            <button type="cancel" onClick={this.props.closeSelectNotebookModal}>Exit</button>
          </div>

        </div>
      </Modal>
    );
  }
});

module.exports = NotebookBar;
