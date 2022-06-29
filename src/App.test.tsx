import { screen } from '@testing-library/react';
import { renderWithProviders } from './testHelpers';
import App from './App';

test('renders start screen', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Go to plays/i);
  expect(linkElement).toBeInTheDocument();
});
