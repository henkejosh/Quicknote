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

  createNote: function(note, success) {
    $.ajax({
      url: "api/notes",
      type: "POST",
      data: { note },
      dataType: "json",
      success,
      error: function() {
        console.log("Error creating note");
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
      // error: function() {
      //   console.log("Error updating note");
      // }
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  }
};

module.exports = NoteApiUtil;
