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

  update: function(property) {
    // debugger;
    const that = this;
    return(e) => {
      if(that.saveTimeout) clearTimeout(that.saveTimeout);
      // that.setState({ [property]: e.target.value});
      that.setState({ [property]: e});
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

        <h2 onChange={this.update("title")}
          className="note-name">{this.state.title}</h2>

        <div className="text-editor-toolbar">Text editor Toolbar</div>

        <ReactQuill theme="snow"
                  onChange={ this.update("body") }
                  value={ this.state.body }/>

      </form>
    );
  }
});

module.exports = NoteEditor;
