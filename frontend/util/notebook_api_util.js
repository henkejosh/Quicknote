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
  },

  createNotebook: function(notebook, success) {
    $.ajax({
      url: "api/notebooks",
      type: "POST",
      dataType: "json",
      data: { notebook },
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  deleteNotebook: function(notebookID, success) {
    $.ajax({
      url: `api/notebooks/${notebookID}`,
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

module.exports = NotebookApiUtil;
