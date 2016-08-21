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

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ LandingPage } />
      <Route path="/home" component={ HomePage } />
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
