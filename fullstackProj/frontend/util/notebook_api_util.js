const NotebookApiUtil = {
  selectCurrentNotebook: function(notebookID, success) {
    $.ajax({
      url: `api/notebooks/${notebookID}`,
      type: "GET",
      dataType: "json",
      success,
      error: function() {
        console.log("Error fetching current notebook");
      }
    });
  },

  getAllNotebooks: function(success) {
    $.ajax({
      url: `api/notebooks`,
      type: "GET",
      dataType: "json",
      success,
      error: function() {
        console.log("Error fetching all notebooks");
      }
    });
  }
};

module.exports = NotebookApiUtil;
