const NoteActions = require('../actions/note_actions.js');

const NoteApiUtil = {
  getAllNotes: function(success) {
    $.ajax({
      url: `api/notes`,
      type: "GET",
      dataType: "json",
      success,
      error: function() {
        console.log("Error fetching notes");
      }
    });
  },

  selectCurrentNote: function(noteID, success) {
    $.ajax({
      url: `api/notes/${noteID}`,
      dataType: "json",
      type: "GET",
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  createNote: function(note, success) {
    $.ajax({
      url: "api/notes",
      type: "POST",
      data: { note },
      dataType: "json",
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  updateNote: function(note, success) {
    $.ajax({
      url: `api/notes/${note.id}`,
      dataType: "json",
      type: "PATCH",
      data: { note },
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  deleteNote: function(noteID, success) {
    $.ajax({
      url: `api/notes/${noteID}`,
      type: "DELETE",
      dataType: "json",
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  }
};

module.exports = NoteApiUtil;
