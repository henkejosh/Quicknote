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
const CurrentNoteStore = require('../stores/current_note_store.js');
const CurrentNoteActions = require('../actions/current_note_actions.js');
const NotebookCreator = require('./notebook_creator.jsx');
const NotebookEditor = require('./notebook_editor.jsx');
const TagModalBar = require('./tag_modal_bar.jsx');

const HomePage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.allNotebooks(),
      currentNotebook: CurrentNotebookStore.currentNotebook(),
      currentNote: CurrentNoteStore.currentNote(),
    // current_notebook_open: false
      notes: NoteStore.allNotes(),
      notebookCreatorOpen: false,
      notebookEditorOpen: false,
      tagModalBarIsOpen: false,
    //   tags: ,
    //   current_note: ,
    //   create_note_modal_open: false,
    //   tags_modal_open: false,
      cardColumnStyle: "all"
      // cardColumnNotebook: false
    };
  },

  componentWillMount: function() {
    // this.currentNotebookListener =
    //   CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    // this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    // this.currentNoteListener = CurrentNoteStore.addListener(this.updateCurrentNote);
    // this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    // this.noteListener = NoteStore.addListener(this.updateNotes);


    NotebookActions.getAllNotebooks();
    NoteActions.getAllNotes();
  },

  componentDidMount: function() {
    this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    this.currentNoteListener = CurrentNoteStore.addListener(this.updateCurrentNote);
    this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    this.noteListener = NoteStore.addListener(this.updateNotes);
    NotebookActions.getAllNotebooks();
    NoteActions.getAllNotes();
  },

  componentWillUnmount: function() {
    this.currentNotebookListener.remove();
    this.noteListener.remove();
    this.notebookListener.remove();
    this.currentNoteListener.remove();
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

  forceUpdateAllNotes: function() {
    this.setState({ notes: NoteStore.allNotes() });
  },

  forceUpdateNotebookNotes: function() {
    this.setState({ notes: NoteStore.allNotebookNotes() });
  },

  forceUpdateTagNotes: function() {
    // TODO!!!
  },

  forceUpdateCurrentNote: function() {
    CurrentNoteActions.forceUpdateCurrentNote(this.state.notes);
  },

  openSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: true });
    this.makeNoteEditorOpaque();
    this.closeNotebookCreator();
    this.closeSelectTagModal();
    this.closeNotebookEditor();
  },

  closeSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: false });
    this.removeNoteEditorOpacity();
  },

  createCurrentNotebookBar: function() {
    return <CurrentNotebookBar notes={ this.controlNotesProps() }/>;
  },

  makeNoteEditorOpaque: function() {
    $(".note-editor-page").css("opacity", 0.5);
  },

  removeNoteEditorOpacity: function() {
    $(".note-editor-page").css("opacity", 1);
  },

  controlSelectTagModal: function() {
    if(this.state.tagModalBarIsOpen) {
      return (
        <TagModalBar
          tagModalBarIsOpen={ this.state.tagModalBarIsOpen }
          closeSelectTagModal={ this.closeSelectTagModal }
          openSelectTagModal={ this.openSelectTagModal }
          changeCardColumnToTag={this.changeCardColumnToTag}
          changeCardColumnToAllCards={this.changeCardColumnToAllCards}
          // openTagCreator={this.openTagCreator}
          />
      );
    }
  },

  controlSelectNotebookModal: function() {
    if(this.state.SelectNotebookModalOpen) {
      return (
        <NotebookBar
          notebookBarIsOpen={ this.state.SelectNotebookModalOpen }
          closeSelectNotebookModal={ this.closeSelectNotebookModal }
          changeCardColumnToNotebook={this.changeCardColumnToNotebook}
          changeCardColumnToAllCards={this.changeCardColumnToAllCards}
          openNotebookCreator={this.openNotebookCreator}
          />
      );
    }
  },

  controlNotesProps: function() {
    if(this.state.cardColumnStyle === "notebook") {
      return NoteStore.allNotebookNotes();
    } else {
      return NoteStore.allNotes();
    }
  },

  changeCardColumnToTag: function() {
    this.setState({ cardColumnStyle: "tag" });
  },

  changeCardColumnToNotebook: function() {
    this.setState({ cardColumnStyle: "notebook" });
  },

  changeCardColumnToAllCards: function() {
    this.setState({ cardColumnStyle: "all" });
  },

  createNotesBar: function() {
    // if(Object.keys(this.state.notes).length > 0) {
    return (
      <NotesBar notes={this.state.notes}
        currentNotebook={this.state.currentNotebook}
        cardColumnStyle={this.state.cardColumnStyle}
        selectCurrentNote={this.selectCurrentNote}
        openNotebookEditor={this.openNotebookEditor}
        />
    );
  },

  selectCurrentNote: function(noteID) {
    CurrentNoteActions.selectCurrentNote(noteID);
  },

  ensureCurrentNote: function() {
    if(Object.keys(this.state.currentNote).length === 0) {
      CurrentNoteStore.forceUpdateCurrentNote(this.state.notes);
    }
  },

  renderNotebookCreator: function() {
    if(this.state.notebookCreatorOpen) {
      return (
        <NotebookCreator
          closeNotebookCreator={this.closeNotebookCreator}
          currentUser={this.props.currentUser}
          currentUserID={this.props.currentUserID}
          closeSelectNotebookModal={this.closeSelectNotebookModal}
          changeCardColumnToNotebook={this.changeCardColumnToNotebook}
          />
      );
    }
  },

  closeNotebookCreator: function() {
    this.setState({ notebookCreatorOpen: false });
  },

  openNotebookCreator: function() {
    this.setState({ notebookCreatorOpen: true });
    this.closeSelectTagModal();
    this.closeNotebookEditor();
    this.closeSelectNotebookModal();
  },

  closeNotebookEditor: function() {
    this.setState({ notebookEditorOpen: false });
  },

  openNotebookEditor: function() {
    this.setState({ notebookEditorOpen: true });
    this.closeSelectTagModal();
    this.closeNotebookCreator();
    this.closeSelectNotebookModal();
  },

  closeSelectTagModal: function() {
    this.setState({ tagModalBarIsOpen: false });
  },

  openSelectTagModal: function() {
    this.setState({ tagModalBarIsOpen: true });
    this.closeNotebookCreator();
    this.closeNotebookEditor();
    this.closeSelectNotebookModal();
  },

  renderNotebookEditor: function() {
    if(this.state.notebookEditorOpen) {
      return (
        <NotebookEditor key={`editor-${this.state.currentNotebook.id}`}
          currentNotebook={this.state.currentNotebook}
          closeNotebookEditor={this.closeNotebookEditor}
          openNotebookEditor={this.openNotebookEditor}
          changeCardColumnToNotebook={this.changeCardColumnToNotebook}
          currentUser={this.props.currentUser}
          />
      );
    }
  },

  renderNoteEditor: function() {
    if(Object.keys(this.state.currentNote).length === 0) {
      return <div></div>;
    } else {
      return (
        <NoteEditor key={this.state.currentNote.id}
          currentNote={this.state.currentNote}
          currentNotebook={this.state.currentNotebook}
          notebooks={this.state.notebooks}
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
          tagModalBarIsOpen={this.state.tagModalBarIsOpen}
          openSelectTagModal={this.openSelectTagModal}
          closeSelectTagModal={this.closeSelectTagModal}
          currentUser={this.props.currentUser}
          logout={this.props.logout}
          currentNotebook={this.state.currentNotebook}
          changeCardColumnToNotebook={this.changeCardColumnToNotebook}
          changeCardColumnToAllCards={this.changeCardColumnToAllCards}
          updateNotes={this.updateNotes}
          forceUpdateAllNotes={this.forceUpdateAllNotes}
          changeCardColumnToTag={this.changeCardColumnToTag}
          />

        <div className="page-content">
          { this.createNotesBar() }
          { this.controlSelectNotebookModal() }
          { this.controlSelectTagModal() }
        </div>

        { this.renderNoteEditor() }
        { this.renderNotebookCreator() }
        { this.renderNotebookEditor() }
      </div>
    );
  }
});

module.exports = HomePage;
