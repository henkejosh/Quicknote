const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../actions/note_actions.js');
const NotebookDropdown = require('./notebook_dropdown.jsx');
const NotebookStore = require('../stores/notebook_store.js');
const TagsBarIndex = require('./tags_bar_index.jsx');

const NoteEditor = React.createClass({
  getInitialState: function() {
    // const notebook = this.findNotebook();
    return {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookSelectorOpen: false,
      notebookTitle: "",
      notebook_id: ""
      // notebook_id: this.props.currentNote.notebook_id,

      // notebook_id: this.props.currentNotebook.id

      // title: this.props.currentNote.title,
      // body: this.props.currentNote.body,
      // id: this.props.currentNote.id,
      // notebook_id: this.props.currentNote.notebook_id
    };
  },

  componentWillReceiveProps: function() {
    let notebook = this.findNotebook();
    if(!notebook) {
      notebook = this.props.currentNotebook;
    }
    this.setState({
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookTitle: notebook.title,
      notebook_id: notebook.id
    });
  },

  findNotebook: function() {
    return NotebookStore.findNotebook(this.props.currentNote.notebook_id);
    // debugger;
    // debugger;
    // const notebooks = this.props.notebooks;
    // const that = this;
    // let returnNotebook;
    // if(Object.keys(notebooks).length > 0) {
    //   Object.keys(notebooks).forEach( id => {
    //     // debugger;
    //     if(parseInt(id) === that.props.currentNote.notebook_id) {
    //       returnNotebook = notebooks[id];
    //     }
    //   });
    // }
    // if(returnNotebook) return returnNotebook;
  },

  // createNotebookTitle: function() {
  //   const notebooks = this.props.notebooks;
  //   const that = this;
  //   if(Object.keys(notebooks).length > 0) {
  //     Object.keys(notebooks).forEach( id => {
  //       debugger;
  //       if(parseInt(id) === that.props.currentNote.notebook_id) {
  //         return notebooks[id].title;
  //       }
  //     });
  //   }
  // },

  handleSubmit: function(e) {
    e.preventDefault();
    // make this autosave by doing an "onChange" and having body
    // content tied to state
  },

  componentDidMount: function() {
    let notebook = this.findNotebook();
    if(!notebook) {
      notebook = this.props.currentNotebook;
    }
    this.setState({
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookTitle: notebook.title,
      notebook_id: notebook.id
    });
  },

  saveChanges: function() {
    let note = this.props.currentNote;
    note.body = this.state.body;
    note.title = this.state.title;
    note.notebook_id = this.state.notebook_id;
    // delete note["tags"];
    // delete note["created_at"];
    // delete note["updated_at"];
    note = note;
    NoteActions.updateNote(note);
  },

  autoSave: function() {
    this.saveTimeout = setTimeout(this.saveChanges, 500);
  },

  updateTitle: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value});
  },

  updateNotebook: function() {
    if(this.saveTimeout) clearTimeout(this.saveTimeout);
    const note = this.props.currentNote;
    // this.props.currentNote.notebook_id = this.state.notebook_id;
    NoteActions.changeNoteNotebook(note);
  },

  updateBody: function(text) {
    if(this.saveTimeout) clearTimeout(this.saveTimeout);
    this.setState({ "body": text});
    this.autoSave();
  },

  createNotebookDropdownSelector: function() {
    // <NotebookDropdown currentNotebook={this.props.currentNotebook}
    if(this.state.notebookSelectorOpen) {
      return (
        <NotebookDropdown currentNotebook={this.state.notebookTitle}
          notebooks={this.props.notebooks}
          closeNotebookSelector={this.closeNotebookSelector}
          openNotebookSelector={this.openNotebookSelector}
          notebookSelectorOpen={this.state.notebookSelectorOpen}
          currentNote={this.props.currentNote}
          updateNotebook={this.updateNotebook}
          />
      );
    }
  },

  closeNotebookSelector: function() {
    this.setState({ notebookSelectorOpen: false });
  },

  openNotebookSelector: function() {
    this.setState({ notebookSelectorOpen: true });
  },

  handleNotebookSelectorOpen: function(e) {
    e.preventDefault();
    this.openNotebookSelector();
  },

  render: function() {
    return (
      <form className="note-editor-page"
        onSubmit={this.handleSubmit}
        onBlur={this.saveChanges}>


        <div className="top-toolbar">
          <div className="curr-notebook-name"
            onClick={this.handleNotebookSelectorOpen}
            >{this.state.notebookTitle}</div>

            <div className="dropdown-placeholder">
              { this.createNotebookDropdownSelector() }
            </div>

          <TagsBarIndex currentUserID={this.props.currentUserID}
            currentNote={this.props.currentNote}/>

        </div>

        <input className="note-name"
          onChange={this.updateTitle}
          value={this.state.title} />

        <div className="text-editor-toolbar">Text editor Toolbar</div>

        <ReactQuill theme='snow'
                  onChange={ this.updateBody }
                  value={ this.state.body }/>

      </form>
    );
  }
});

module.exports = NoteEditor;
