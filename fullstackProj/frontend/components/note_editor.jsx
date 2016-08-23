const React = require('react');

const NoteEditor = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    // make this autosave by doing an "onChange" and having body
    // content tied to state
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="note-editor-page">

        <div className="top-toolbar">
          <div className="notebook-selector">choose NB</div>
          <div className="tag-selector">choose tag</div>
        </div>

        <h2 className="note-name">Note Name Here</h2>
        <div className="text-editor-toolbar">Text editor Toolbar</div>

        <span className="note-body">Type your note here</span>

      </form>
    );
  }
});

module.exports = NoteEditor;
