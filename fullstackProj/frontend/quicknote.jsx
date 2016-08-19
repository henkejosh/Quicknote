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

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } />
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
