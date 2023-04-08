import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/EzBob Search/i);
  expect(linkElement).toBeInTheDocument();
});

test('Should display possible results window on search', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('search');
  userEvent.type(input, 'react');
  const reactElements = screen.queryAllByText(/react/i);
  expect(reactElements.length).toEqual(10);

})