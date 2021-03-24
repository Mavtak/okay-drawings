import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import CreateView from './views/create/View.jsx';
import ListView from './views/list/View.jsx';
import LogInView from './views/logIn/View.jsx';
import ViewView from './views/view/View.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
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
            render={() => (
              <CreateView />
            )}
          />
          <Route
            exact
            path="/log-in"
            render={() => (
              <LogInView />
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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;