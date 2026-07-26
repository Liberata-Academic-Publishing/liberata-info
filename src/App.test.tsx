import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Introducing Liberata/i)).toBeTruthy();
});
