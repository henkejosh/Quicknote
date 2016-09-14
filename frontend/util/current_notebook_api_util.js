const CurrentNotebookApiUtil = {
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
  }
};

module.exports = CurrentNotebookApiUtil;
