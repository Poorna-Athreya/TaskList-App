// import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
// import List from './List';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    listId: '1',
    taskId: '1',
  }),
  useNavigate: () => (route) => {
    mockNavigate(route);
  },
}));

describe('List Component', () => {
  it('should render the lists given from the App', async () => {
    // jest.spyOn()
  });
});
