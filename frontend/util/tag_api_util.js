
const TagApiUtil = {
  createTag: function(tag, noteID, success) {
    $.ajax({
      url: `api/notes/${noteID}/tags`,
      type: "POST",
      dataType: "json",
      data: { tag },
      success: function(tag2) {
        success(tag2, noteID);
      },
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  }
};

module.exports = TagApiUtil;
