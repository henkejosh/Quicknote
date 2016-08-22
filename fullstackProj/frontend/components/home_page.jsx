const React = require('react');
const NotebookActions = require('../actions/notebook_actions.js');
const NotebookStore = require('../stores/notebook_store.js');
const CurrentNotebookStore = require('../stores/current_notebook_store.js');
const NotesBar = require('./notes_bar.jsx');
const LeftNavBar = require('./left_nav_bar.jsx');

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
      select_notebook_modal_open: false,
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
    this.setState({ select_notebook_modal_open: true });
  },

  closeSelectNotebookModal: function() {
    this.setState({ select_notebook_modal_open: false });
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
    if(this.state.select_notebook_modal_open) {
      // return <SignInModal isOpen={ this.state.signInModal }
      //   closeSignInModal={this.closeSignInModal}
      //   modalType={this.state.modalType}
      //   makeModalSignUp={this.makeModalSignUp} />;
    }
  },

  render: function() {
    return (
      <div>
        <LeftNavBar
          select_notebook_modal_open={this.state.select_notebook_modal_open}
          openSelectNotebookModal={this.openSelectNotebookModal}
          closeSelectNotebookModal={this.closeSelectNotebookModal}
          />

        <div>Home Page dawg</div>
        { this.createCurrentNotebookBar() }

      </div>
    );
  }
});

module.exports = HomePage;
