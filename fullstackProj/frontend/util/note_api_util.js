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

  createNote: function(note) {

  }
};

module.exports = NoteApiUtil;
