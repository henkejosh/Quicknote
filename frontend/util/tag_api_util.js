// const NoteActions = require('../actions/note_actions.js');

const TagApiUtil = {
  // NoteActions: NoteActions,

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
  },

  deleteTag: function(tag, success, cb2) {
    $.ajax({
      url: `api/tags/${tag.id}`,
      dataType: "json",
      type: "DELETE",
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  destroyRelationship: function(tagID, taggingID, success) {
    $.ajax({
      url: `api/tags/${tagID}`,
      dataType: "json",
      type: "DELETE",
      data: { tagging_id: taggingID, relat: true },
      success,
      error: xhr => {
        const error = `status: ${xhr.status} ${xhr.statusText}`;
        console.log(error);
        console.log(xhr.responseText);
      }
    });
  },

  // selectCurrentTag: function(tag, success) {
  //   $.ajax({
  //     url: `api/notes/${tag.id}`,
  //     data: {tag},
  //     dataType: "json",
  //     type: "GET",
  //     success,
  //     error: xhr => {
  //       const error = `status: ${xhr.status} ${xhr.statusText}`;
  //       console.log(error);
  //       console.log(xhr.responseText);
  //     }
  //   });
  // },

  getAllTags: function(success) {
    $.ajax({
      url: "api/tags",
      type: "GET",
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

module.exports = TagApiUtil;
