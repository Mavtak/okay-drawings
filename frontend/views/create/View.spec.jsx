import {
  shallow,
} from 'enzyme';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import userSession from '../../userSession.js';
import LoadingView from '../Loading/View.jsx';
import ColorPicker from './ColorPicker.jsx';
import DrawingPad from './DrawingPad.jsx';
import View from './View.jsx';
import WidthPicker from './WidthPicker.jsx';

jest.mock('../../getNow.js', () => () => 'mocked-current-time');

jest.mock('../../userSession.js', () => ({
  get: jest.fn(),
}));

describe('View', () => {
  let onLoggedOut;
  let onSave;
  let subject;

  beforeEach(() => {
    onLoggedOut = jest.fn();
    
    onSave = jest.fn();

    subject = shallow(
      <View
        listPath="/some-list-path"
        onLoggedOut={onLoggedOut}
        onSave={onSave}
      />
    );
  });

  it('has initial state', () => {
    expect(subject.state()).toEqual({
      brushColor: 'purple',
      brushWidthPx: 1,
      drawing: {
        dimensionsPx: {
          height: 500,
          width: 800,
        },
        isPublic: true,
        strokes: [],
      },
      submitting: false,
    });
  });

  describe('checkLoggedIn', () => {
    it('gets the user', () => {
      subject.instance().checkLoggedIn();

      expect(userSession.get).toHaveBeenCalledWith();
    });

    describe('when the user is logged in', () => {
      beforeEach(() => {
        userSession.get.mockReturnValue({
          username: 'some.username',
        });

        subject.instance().checkLoggedIn();
      });

      it('does not call onLoggedOut', () => {
        expect(onLoggedOut).not.toHaveBeenCalled();
      });
    });

    describe('when the user is logged out', () => {
      beforeEach(() => {
        userSession.get.mockReturnValue(null);

        subject.instance().checkLoggedIn();
      });

      it('calls onLoggedOut', () => {
        expect(onLoggedOut).toHaveBeenCalledWith();
      });
    });
  });

  describe('handleChangeDrawing', () => {
    describe('when there is a startTime set', () => {
      it('it sets the state', () => {
        subject.instance().handleChangeDrawing({
          startTime: 'some-start-time',
          strokes: [],
        });

        expect(subject.state().drawing).toEqual({
          startTime: 'some-start-time',
          strokes: [],
        });
      });
    });

    describe('when there is not a startTime set', () => {
      it('sets the start time and sets the state', () => {
        subject.instance().handleChangeDrawing({
          strokes: [],
        });

        expect(subject.state().drawing).toEqual({
          startTime: 'mocked-current-time',
          strokes: [],
        });
      });
    });
  });

  describe('render', () => {
    describe('when not submitting', () => {
      beforeEach(() => {
        subject.setState({
          submitting: false,
        });
      });
      
      it('renders as a div', () => {
        expect(subject.type()).toBe('div');
      });

      it('renders a link back to the listing', () => {
        const link = subject.find(Link);

        expect(link.length).toBe(1);
        expect(link.props().to).toBe('/some-list-path');
        expect(link.children().text()).toBe('back to listing');
      });

      it('renders a ColorPicker', () => {
        const colorPicker = subject.find(ColorPicker);

        expect(colorPicker.length).toBe(1);
        expect(colorPicker.props().choices).toEqual([
          'purple',
          'orangered',
          'green',
          'yellow',
          'skyblue',
        ]);
        expect(colorPicker.props().onChange).toBe(subject.instance().handleChangeBrushColor);
        expect(colorPicker.props().value).toBe('purple');
      });

      it('renders a WidthPicker', () => {
        const widthPicker = subject.find(WidthPicker);

        expect(widthPicker.length).toBe(1);
        expect(widthPicker.props().choices).toEqual([
          1,
          3,
          5,
          10,
          18,
        ]);
        expect(widthPicker.props().onChange).toBe(subject.instance().handleChangeBrushWidth);
        expect(widthPicker.props().value).toBe(1);
      });

      it('renders a DrawingPad', () => {
        const drawingPad = subject.find(DrawingPad);

        expect(drawingPad.length).toBe(1);
        expect(drawingPad.props().brushColor).toBe('purple');
        expect(drawingPad.props().brushWidthPx).toBe(1);
        expect(drawingPad.props().onChange).toBe(subject.instance().handleChangeDrawing);
        expect(drawingPad.props().value).toEqual({
          dimensionsPx: {
            height: 500,
            width: 800,
          },
          isPublic: true,
          strokes: [],
        });
      });

      it('renders a checkbox to set the drawing to public', () => {
        const checkbox = () => subject
          .find('input')
          .findWhere(x => x.props().type === 'checkbox');

        expect(checkbox().props().onChange).toBe(subject.instance().handleChangeIsPublic);

        subject.setState({
          drawing: {
            ...subject.state.drawing,
            isPublic: false,
          },
        });

        expect(checkbox().props().checked).toBe(false)

        subject.setState({
          drawing: {
            ...subject.state.drawing,
            isPublic: true,
          },
        });

        expect(checkbox().props().checked).toBe(true)
      });

      it('renders a submit button', () => {
        const button = subject.find('button');

        expect(button.length).toBe(1);
        expect(button.props().onClick).toBe(subject.instance().handleSave);
        expect(button.text()).toBe('save');
      });
    });

    describe('when submitting', () => {
      beforeEach(() => {
        subject.setState({
          submitting: true,
        });
      });
      
      it('renders as a Loading View', () => {
        expect(subject.type()).toBe(LoadingView);
      });
    });
  });
});
