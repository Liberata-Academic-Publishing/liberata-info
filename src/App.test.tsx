import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
  // The hero renders desktop and mobile variants as separate subtrees — only
  // one is visible at a time, but both are in the DOM, so the copy matches
  // twice and getByText would throw.
  expect(screen.getAllByText(/Introducing Liberata/i).length).toBeGreaterThan(0);
});
