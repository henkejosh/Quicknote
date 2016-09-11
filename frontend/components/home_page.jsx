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
const TagStore = require('../stores/tag_store.js');
const TagActions = require('../actions/tag_actions.js');
const CurrentTagStore = require("../stores/current_tag_store.js");

const HomePage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.allNotebooks(),
      currentNotebook: CurrentNotebookStore.currentNotebook(),
      currentNote: CurrentNoteStore.currentNote(),
      currentTag: {},
      tags: {},
    // current_notebook_open: false
      notes: NoteStore.allNotes("all"),
      notebookCreatorOpen: false,
      notebookEditorOpen: false,
      tagModalBarIsOpen: false,
      SelectNotebookModalOpen: false,
    //   tags: ,
    //   current_note: ,
    //   create_note_modal_open: false,
    //   tags_modal_open: false,
      cardColumnStyle: "all"
      // cardColumnNotebook: false
    };
  },

  componentWillMount: function() {
    NotebookActions.getAllNotebooks();
    NoteActions.getAllNotes();
    TagActions.getAllTags();
  },

  componentDidMount: function() {
    this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    this.currentNoteListener = CurrentNoteStore.addListener(this.updateCurrentNote);
    this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    this.noteListener = NoteStore.addListener(this.updateNotes);
    this.tagStoreListener = TagStore.addListener(this.updateTags);
    this.currentTagListener = CurrentTagStore.addListener(this.updateCurrentTag);
  },

  componentWillUnmount: function() {
    this.currentNotebookListener.remove();
    this.noteListener.remove();
    this.notebookListener.remove();
    this.currentNoteListener.remove();
    this.tagStoreListener.remove();
    this.currentTagListener.remove();
  },

  updateCurrentTag: function() {
    this.setState({ currentTag: CurrentTagStore.currentTag() });
  },

  selectCurrentTag: function(tag) {
    this.setState({ currentTag: tag });
  },

  updateTags: function() {
    this.setState({ tags: TagStore.allTags() });
  },

  updateCurrentNote: function() {
    this.setState({ currentNote: CurrentNoteStore.currentNote() });
  },

  updateNotes: function() {
    // this.setState({ notes: this.controlNotesProps() });
    this.setState({ notes:
      NoteStore.allNotes(this.state.cardColumnStyle) });
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
    this.setState({ notes: NoteStore.allNotes("all"),
      tagModalBarIsOpen: false,
      SelectNotebookModalOpen: false
    });
    this.removeNoteEditorOpacity();
  },

  forceUpdateNotebookNotes: function() {
    this.setState({ notes: NoteStore.allNotes("notebook") });
  },

  forceUpdateTagNotes: function() {
    this.setState({ notes: NoteStore.allNotes("tag")});
  },

  forceUpdateCurrentNote: function() {
    CurrentNoteActions.forceUpdateCurrentNote(this.state.notes);
  },

  openSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: true });
    this.closeNotebookCreator();
    this.closeSelectTagModal();
    this.closeNotebookEditor();
    this.makeNoteEditorOpaque();
  },

  closeSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: false });
    this.removeNoteEditorOpacity();
  },

  createCurrentNotebookBar: function() {
    return <CurrentNotebookBar notes={ this.controlNotesProps() }/>;
  },

  makeNoteEditorOpaque: function() {
    // debugger;
    $(".note-editor-page").css("opacity", 0.2);
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
          notes={this.state.notes}
          selectCurrentTag={this.selectCurrentTag}
          currentTag={this.currentTag}
          tags={this.state.tags}
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
    } else if(this.state.cardColumnStyle === "all") {
      return NoteStore.allNotes();
    } else if(this.state.cardColumnStyle === "tag") {
      return NoteStore.tagNotes(this.state.currentTag);
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
        currentTag={this.state.currentTag}
        currentNote={this.state.currentNote}
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
    this.removeNoteEditorOpacity();
  },

  openSelectTagModal: function() {
    this.setState({ tagModalBarIsOpen: true });
    this.closeNotebookCreator();
    this.closeNotebookEditor();
    this.closeSelectNotebookModal();
    this.makeNoteEditorOpaque();
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
          currentUserID={this.props.currentUserID}
          />
      );
    }
  },

  render: function() {
    return (
      <div className="home-page-content">

        <LeftNavBar
          cardColumnStyle={this.state.cardColumnStyle}
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
          forceUpdateTagNotes={this.forceUpdateTagNotes}
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
