import { render, screen } from '@testing-library/react';
import HomeScreen from '../screens/HomeScreen';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
    ],
  },
]);
describe('HomeScreen', () => {
  it('renders the title and ingredients fields', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByLabelText('title')).toBeInTheDocument();
    expect(screen.getByLabelText('ingredients')).toBeInTheDocument();
  });

});