import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import UserSessionControls from './UserSessionControls.jsx';
import CreateView from './views/create/View.jsx';
import ListView from './views/list/View.jsx';
import LogInView from './views/logIn/View.jsx';
import ViewView from './views/view/View.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <UserSessionControls />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListView />
            )}
          />
          <Route
            exact
            path="/create"
            render={({
              history,
            }) => (
              <CreateView
                onSave={(id) => {
                  history.push(`/view/${id}`);
                }}
              />
            )}
          />
          <Route
            exact
            path="/log-in"
            render={({
              history,
            }) => (
              <LogInView
                onLoggedIn={() => {
                  history.push('/');
                }}
              />
            )}
          />
          <Route
            exact
            path="/view/:id"
            render={({
              match,
            }) => (
              <ViewView
                id={match.params.id}
              />
            )}
          />
          <Redirect
            to="/"
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;