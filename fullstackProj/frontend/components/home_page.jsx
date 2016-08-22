const React = require('react');
const NotebookActions = require('../actions/notebook_actions.js');
const NotebookStore = require('../stores/notebook_store.js');
const CurrentNotebookStore = require('../stores/current_notebook_store.js');
const NotesBar = require('./notes_bar.jsx');
const LeftNavBar = require('./left_nav_bar.jsx');
const NotebookBar = require('./notebook_bar.jsx');

const HomePage = React.createClass({
  getInitialState: function() {
    return {
      // notebooks: NotebookStore.allNotebooks(),
      currentNotebook: CurrentNotebookStore.currentNotebook(),
    // current_notebook_open: false
    //   notes: ,
    //   tags: ,
    //   current_note: ,
    //   create_note_modal_open: false,
      SelectNotebookModalOpen: false,
    //   tags_modal_open: false,
    };
  },

  componentWillMount: function() {
    NotebookActions.getAllNotebooks();
  },

  componentDidMount: function() {
    // this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
  },

  updateCurrentNotebook: function() {
    this.setState({ currentNotebook: NotebookStore.currentNotebook });
  },

  updateNotebooks: function() {
    this.setState({ notebooks: NotebookStore.allNotebooks() });
  },

  componentWillUnmount: function() {
    this.currentNotebookListener.remove();
  },

  openSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: true });
  },

  closeSelectNotebookModal: function() {
    // debugger;
    this.setState({ SelectNotebookModalOpen: false });
  },

  createCurrentNotebookBar: function() {
    if(Object.keys(this.state.currentNotebook).length > 0) {
      return <CurrentNotebookBar />;
    }
    // } else {
    //   return <NotesBar />;
    // }
  },

  controlSelectNotebookModal: function() {
    if(this.state.SelectNotebookModalOpen) {
      return (
        <NotebookBar
          isOpen={ this.state.SelectNotebookModalOpen }
          closeSelectNotebookModal={ this.closeSelectNotebookModal }
          />
      );
    }
  },

  render: function() {
    return (
      <div>
        <LeftNavBar
          SelectNotebookModalOpen={this.state.SelectNotebookModalOpen}
          openSelectNotebookModal={this.openSelectNotebookModal}
          closeSelectNotebookModal={this.closeSelectNotebookModal}
          />

        <div>Home Page dawg</div>
        { this.controlSelectNotebookModal() }

      </div>
    );
  }
});

module.exports = HomePage;
