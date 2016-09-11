const React = require('react');
const ReactDropdown = require('react-dropdown').default;
const Modal = require('react-modal');
const modStyle = require('../misc/modal_styles.js');
const NotebookSelectee = require('./notebook_selectee.jsx');
const NoteActions = require('../actions/note_actions.js');

const NotebookDropdown = React.createClass({
  formatNotebooks: function() {
    let notebooks = [];
    // Object.keys(this.props.notebooks).forEach( id => {
    //   if(this.props.notebooks[id].title !== this.props.currentNotebook.title) {
    //     notebooks.push(this.props.notebooks[id].title);
    //   }
    // });
    let that = this;
    return Object.keys(this.props.notebooks).map( id => {
      if(that.props.notebooks[id].title !== that.props.currentNotebook) {
        // debugger;
        let notebook = that.props.notebooks[id];
        return (
          <NotebookSelectee key={id}
            title={notebook.title}
            onSelect={that.onSelect}
            closeNotebookSelector={that.props.closeNotebookSelector}
            />
        );
      }
    });


    // return notebooks;
  },

  formatCurrentNotebookTitle: function() {
    if(Object.keys(this.props.currentNotebook).length === 0) return;

    return this.props.currentNotebook.title;
  },

  formatNotebookOptions: function() {
    if(Object.keys(this.props.notebooks).length === 0) return;

    const that = this;
    Object.keys(this.props.notebooks).map( id => {
      let notebook = that.props.notebooks[id];
      return (
        <NotebookSelectee key={id}
          title={notebook.title}
          onSelect={that.onSelect}
          />
      );
    });
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.closeNotebookSelector();
  },

  onSelect: function(e) {
    e.preventDefault();
    let title = e.target.innerHTML;
    // debugger;
    let notebook;
    Object.keys(this.props.notebooks).forEach( id => {
      if(this.props.notebooks[id].title === title) {
        notebook = this.props.notebooks[id];
      }
    });
    let note = this.props.currentNote;
    note.notebook_id = notebook.id;
    this.props.updateNotebook();
    // NoteActions.changeNoteNotebook(note);
    this.props.closeNotebookSelector();
  },

  // this.formatNotebooks().map( id => {
  //     let notebook = this.props.notebooks[id];
  //     return (
  //       <NotebookSelectee key={id}
  //         title={notebook.title}
  //         onSelect={this.onSelect}
  //         closeNotebookSelector={this.props.closeNotebookSelector}
  //
  //         />
  //     );
  //   })


  render: function() {
    return (
        <section className="notebook-selector" >
            {  this.formatNotebooks() }
        </section>
    );
  }
});

module.exports = NotebookDropdown;
