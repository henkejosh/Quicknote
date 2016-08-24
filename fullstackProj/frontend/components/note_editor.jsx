const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../actions/note_actions.js');

const NoteEditor = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body
      // notebook_id: this.props.currentNote.notebook_id,

      // notebook_id: this.props.currentNotebook.id

      // title: this.props.currentNote.title,
      // body: this.props.currentNote.body,
      // id: this.props.currentNote.id,
      // notebook_id: this.props.currentNote.notebook_id
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    // make this autosave by doing an "onChange" and having body
    // content tied to state
  },

  componentDidMount: function() {
    this.setState({
      title: this.props.currentNote.title,
      body: this.props.currentNote.body
    });
  },

  saveChanges: function() {
    let note = this.props.currentNote;
    note.body = this.state.body;
    note.title = this.state.title;
    note = note;
    NoteActions.updateNote(note);
  },

  autoSave: function() {
    this.saveTimeout = setTimeout(this.saveChanges, 1);
  },

  updateTitle: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value});
  },

  updateBody: function() {
    // debugger;
    const that = this;
    return(e) => {
      if(that.saveTimeout) clearTimeout(that.saveTimeout);
      // that.setState({ [property]: e.target.value});
      that.setState({ "body": e});
      // this.autoSave();
    };
  },

  render: function() {
    return (
      <form className="note-editor-page"
        onSubmit={this.handleSubmit}
        onBlur={this.saveChanges}>


        <div className="top-toolbar">
          <div className="notebook-selector">choose NB</div>
          <div className="tag-selector">choose tag</div>
        </div>

        <input className="note-name"
          onChange={this.updateTitle}
          value={this.state.title} />

        <div className="text-editor-toolbar">Text editor Toolbar</div>

        <ReactQuill theme="snow"
                  onChange={ this.updateBody }
                  value={ this.state.body }/>

      </form>
    );
  }
});

module.exports = NoteEditor;
