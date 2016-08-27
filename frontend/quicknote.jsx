// React
const React = require('react');
const ReactDOM = require('react-dom');
const reactRouter = require('react-router');
const Router = reactRouter.Router;
const hashHistory = reactRouter.hashHistory;
const Route = reactRouter.Route;
const IndexRoute = reactRouter.IndexRoute;
// Session
const SessionActions = require('./actions/session_actions.js');
// Components
const App = require('./components/app.jsx');
const LandingPage = require('./components/landing_page.jsx');
const HomePage = require('./components/home_page.jsx');
// Stores
const SessionStore = require('./stores/session_store.js');
const NotebookStore = require('./stores/notebook_store.js');
const NotebookActions = require('./actions/notebook_actions.js');
const CurrentNotebookActions = require('./actions/current_notebook_actions.js');
const CurrentNotebookStore = require('./stores/current_notebook_store.js');
const CurrentNoteStore = require('./stores/current_note_store.js');
const NoteStore = require('./stores/note_store.js');
const TagStore = require("./stores/tag_store.js");

const _ensureNotLoggedIn = function(nextState, replace) {
  if(SessionStore.isUserLoggedIn()) {
    replace('/home');
  }
};

const _ensureLoggedIn = function(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
};

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ LandingPage }
        onEnter={ _ensureNotLoggedIn }/>
      <Route path="/home" component={ HomePage }
        onEnter={ _ensureLoggedIn }/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function() {
  if(window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  ReactDOM.render(
    appRouter,
    document.getElementById("root")
  );
});

window.TagStore = TagStore;
window.NoteStore = NoteStore;
window.CurrentNoteStore = CurrentNoteStore;
window.NotebookStore = NotebookStore;
window.CurrentNotebookStore = CurrentNotebookStore;
window.CurrentNotebookActions = CurrentNotebookActions;
