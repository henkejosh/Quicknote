
const SessionApiUtil = {
  signup: function(user, success, error) {
    $.ajax({
      url: "api/users",
      type: "POST",
      data: { user },
      dataType: "json",
      success,
      error: xhr => {
        const errors = xhr.responseJSON;
        error("signup", errors);
      }
    });
  },

  login: function(user, success, error) {
    $.ajax({
      url: "api/session",
      type: "POST",
      dataType: "json",
      data: { user },
      success,
      error: xhr => {
        const errors = xhr.responseJSON;
        error("login", errors);
      }
    });
  },

  logout: function(success) {
    $.ajax({
      url: "api/session",
      type: "DELETE",
      dataType: "json",
      success,
      error: (data) => {
        console.log("SessionApiUtil#logout error");
      }
    });
  }
};

module.exports = SessionApiUtil;
