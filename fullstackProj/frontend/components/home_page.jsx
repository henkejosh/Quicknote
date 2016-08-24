const React = require('react');
const NotebookActions = require('../actions/notebook_actions.js');
const NotebookStore = require('../stores/notebook_store.js');
const CurrentNotebookStore = require('../stores/current_notebook_store.js');
const NotesBar = require('./notes_bar.jsx');
const LeftNavBar = require('./left_nav_bar.jsx');
const NotebookBar = require('./notebook_bar.jsx');
const NoteStore = require('../stores/note_store.js');
const NoteActions = require('../actions/note_actions.js');
const NoteEditor = require('./note_editor.jsx');
// const CurrentNoteStore = require('../stores/current_note_store.js');

const HomePage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.allNotebooks(),
      currentNotebook: CurrentNotebookStore.currentNotebook(),
      // currentNote: CurrentNoteStore.currentNote();
    // current_notebook_open: false
      notes: NoteStore.allNotes(),
    //   tags: ,
    //   current_note: ,
    //   create_note_modal_open: false,
      SelectNotebookModalOpen: false,
    //   tags_modal_open: false,
      cardColumnNotebook: false
    };
  },

  componentWillMount: function() {
    // this.currentNotebookListener =
    //   CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    NotebookActions.getAllNotebooks();
    NoteActions.getAllNotes();
  },

  componentDidMount: function() {
    this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    this.noteListener = NoteStore.addListener(this.updateNotes);
    // this.currentNoteListener = CurrentNoteStore.addListener(this.updateCurrentNote);
  },

  componentWillUnmount: function() {
    this.currentNotebookListener.remove();
    this.noteListener.remove();
    this.notebookListener.remove();
    // this.currentNoteListener.remove();
  },

  updateCurrentNote: function() {
    this.setState({ currentNote: CurrentNoteStore.currentNote() });
  },

  updateNotes: function() {
    this.setState({ notes: this.controlNotesProps() });
  },

  updateCurrentNotebook: function() {
    this.setState({
      currentNotebook: CurrentNotebookStore.currentNotebook()
    });
  },

  updateNotebooks: function() {
    this.setState({ notebooks: NotebookStore.allNotebooks() });
  },

  openSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: true });
  },

  closeSelectNotebookModal: function() {
    // debugger;
    this.setState({ SelectNotebookModalOpen: false });
  },

  createCurrentNotebookBar: function() {
    return <CurrentNotebookBar notes={ this.controlNotesProps() }/>;
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

  controlNotesProps: function() {
    if(this.state.cardColumnNotebook) {
      return NoteStore.allNotebookNotes();
    } else {
      return NoteStore.allNotes();
    }
  },

  changeCardColumnToNotebook: function() {
    this.setState({ cardColumnNotebook: true });
  },

  createNotesComp: function() {
    if(Object.keys(this.state.notes).length > 0) {
      return (
        <NotesBar notes={this.state.notes}
          currentNotebook={this.state.currentNotebook}
          cardColumnNotebook={this.state.cardColumnNotebook}
          />
      );
    }
  },

  render: function() {
    return (
      <div className="home-page-content">

        <LeftNavBar
          SelectNotebookModalOpen={this.state.SelectNotebookModalOpen}
          openSelectNotebookModal={this.openSelectNotebookModal}
          closeSelectNotebookModal={this.closeSelectNotebookModal}
          currentUser={this.props.currentUser}
          logout={this.props.logout}
          currentNotebook={this.props.currentNotebook}
          changeCardColumnToNotebook={this.changeCardColumnToNotebook}
          />

        <div className="page-content">
          { this.createNotesComp() }
          { this.controlSelectNotebookModal() }
        </div>

        <NoteEditor currentNotebook={this.props.currentNotebook}/>

      </div>
    );
  }
});

module.exports = HomePage;
