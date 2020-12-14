import React from 'react';
import * as ReactDOM from 'react-dom';
import { StringExample } from '../stories/CookieDialog.stories';

describe('CookieDialog', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StringExample />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
