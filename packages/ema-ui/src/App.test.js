import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EverMindAgent element', () => {
  render(<App />);
  const linkElement = screen.getByText(/EverMindAgent/i);
  expect(linkElement).toBeInTheDocument();
});
