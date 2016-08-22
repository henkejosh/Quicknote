const NotebookApiUtil = {
  selectCurrentNotebook: function(notebook, success) {
    $.ajax({
      url: `api/notebooks/${notebook.id}`,
      type: "GET",
      dataType: "json",
      success,
      error: function() {
        console.log("Error fetching current notebook");
      }
    });
  },

  // getAllNotebooks: function(success) {
  //   $.ajax({
  //     url: `api/notebooks`,
  //     type: "GET",
  //     dataType: "json",
  //     success,
  //     error: function() {
  //       console.log("Error fetching all notebooks");
  //     }
  //   });
  // }
};

module.exports = CurrentNotebookApiUtil;
