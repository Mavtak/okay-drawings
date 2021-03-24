import {
  shallow,
} from 'enzyme';
import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import App from './App.jsx';
import CreateView from './views/create/View.jsx';
import ListView from './views/list/View.jsx';
import LogInView from './views/logIn/View.jsx';
import ViewView from './views/view/View.jsx';

describe('App', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <App />
    );
  });

  it('is a BrowserRouter', () => {
    expect(subject.type()).toBe(BrowserRouter);
  });

  it('contains a Switch', () => {
    const theSwitch = subject.find(Switch);

    expect(theSwitch.length).toBe(1);
  });

  describe('routes', () => {
    const findRoute = (path) => routes().findWhere(x => x.props().path === path);
    const routes = () => subject.find(Switch).find(Route);
    const renderContent = (route, props) => shallow(
      <div>
        {
          route.props().render(props)
        }
      </div>
    ).children();

    it('contains 4', () => {
      expect(routes().length).toBe(4);
    });

    describe('/', () => {
      const content = () => renderContent(route());
      const route = () => findRoute('/');

      it('exists', () => {
        expect(route().length).toBe(1);
      });

      it('renders the list view', () => {
        expect(content().type()).toBe(ListView);
      });
    });

    describe('/create', () => {
      const content = () => renderContent(route());
      const route = () => findRoute('/create');

      it('exists', () => {
        expect(route().length).toBe(1);
      });

      it('renders the create view', () => {
        expect(content().type()).toBe(CreateView);
      });
    });

    describe('/log-in', () => {
      const content = () => renderContent(route());
      const route = () => findRoute('/log-in');

      it('exists', () => {
        expect(route().length).toBe(1);
      });

      it('renders the login view', () => {
        expect(content().type()).toBe(LogInView);
      });
    });

    describe('/view/:id', () => {
      const content = () => renderContent(route(), {
        match: {
          params: {
            id: 'some-id',
          },
        },
      });
      const route = () => findRoute('/view/:id');

      it('exists', () => {
        expect(route().length).toBe(1);
      });

      it('renders the View view', () => {
        expect(content().type()).toBe(ViewView);
      });

      it('passes through the id', () => {
        expect(content().props().id).toBe('some-id');
      });
    });
  });

  it('contains a fallback/redirect to the listing', () => {
    const redirect = subject.find(Switch).find(Redirect);

    expect(redirect.length).toBe(1);
    expect(redirect.props().to).toBe('/');
  });
});
