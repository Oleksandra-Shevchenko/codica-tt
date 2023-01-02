import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainScreen } from './components/MainScreen';

test('renders add a new city link', () => {
  render(<MainScreen />);
  const linkElement = screen.getByText(/Add a new city/i);
  expect(linkElement).toBeInTheDocument();
});
