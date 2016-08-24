const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../actions/note_actions.js');

const NoteEditor = React.createClass({
  getInitialState: function() {
    return {
      title: "Title Here",
      body: "Note body here",
      notebook_id: 1
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

  saveChanges: function() {
    NoteActions.updateNote(this.state);
  },

  autoSave: function() {
    this.saveTimeout = setTimeout(this.saveChanges, 100);
  },

  update: function(property) {
    return(e) => {
      if(this.saveTimeout) clearTimeout(this.saveTimeout);
      this.setState({ [property]: e.target.value});
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

        <span onChange={this.update("body")}
          className="note-body">{this.state.body}</span>

        <ReactQuill theme="snow"
                  onChange={ this.update("body") }
                  value={ this.state.body }/>

      </form>
    );
  }
});

module.exports = NoteEditor;
