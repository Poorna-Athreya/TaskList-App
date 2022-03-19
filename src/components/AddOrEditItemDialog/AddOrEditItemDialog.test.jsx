import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
// import {
//   MemoryRouter, Routes, Route,
// } from 'react-router-dom';
// import { LIST_ROUTE } from '../../constants/routes';
import AddOrEditItemDialog from './AddOrEditItemDialog';

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

describe('AddOREditItem Component', () => {
  const inputTestId = 'testId-inputText';
  const mockOnCreate = jest.fn();
  //   const addListComponent = (
  //     <MemoryRouter initialEntries={[`${LIST_ROUTE}/add`]}>
  //       <Routes>
  //         <Route path={`${LIST_ROUTE}/add`} element={<AddOrEditItemDialog item="List"
  // itemEditOrAdd="Add" onCreate={mockOnCreate} />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   beforeEach(() => {
  //     mockOnCreate.mockClear();
  //   });
  it('should display the correct label Add List when props passed are Add List', () => {
    render(<AddOrEditItemDialog item="List" itemEditOrAdd="Add" onCreate={mockOnCreate} />);
    expect(screen.getByText('Add List')).toBeTruthy();
  });
  it('should display the correct label Add Task when props passed are Add Task', () => {
    render(<AddOrEditItemDialog item="Task" itemEditOrAdd="Add" onCreate={mockOnCreate} />);
    expect(screen.getByText('Add Task')).toBeTruthy();
  });
  it('should display the correct label Edit Task when props passed are Edit Task', () => {
    render(<AddOrEditItemDialog item="Task" itemEditOrAdd="Edit" onCreate={mockOnCreate} />);
    expect(screen.getByText('Edit Task')).toBeTruthy();
  });
  it('should update list name when input text changes', () => {
    const mockListName = 'Mock List';
    render(<AddOrEditItemDialog item="List" />);
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { value: mockListName },
    });
    expect(screen.getByTestId(inputTestId)).toHaveAttribute(
      'value',
      mockListName,
    );
  });
  it('should update task name when input text changes', () => {
    const mockTaskTitle = 'Mock title';
    render(<AddOrEditItemDialog item="Task" />);
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { value: mockTaskTitle },
    });
    expect(screen.getByTestId(inputTestId)).toHaveAttribute(
      'value',
      mockTaskTitle,
    );
  });
  it('should load and display the existing task title in the input if editing task', () => {
    const mockTaskTitle = 'Mock Title';
    const mockGetTaskById = (listId, taskId) => ({ id: taskId, title: mockTaskTitle, listId });
    render(<AddOrEditItemDialog item="Task" itemEditOrAdd="Edit" getTaskById={mockGetTaskById} />);
    expect(screen.getByTestId(inputTestId)).toHaveAttribute(
      'value',
      mockTaskTitle,
    );
  });
  it('should call the navigate function back to the previous page if cancel button is clicked', () => {
    render(<AddOrEditItemDialog item="List" />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  // it('should call the onSubmit method when Adding Item and form is submitted', () => {
  //   const mockOnSubmit = jest.fn();
  //   render(<AddOrEditItemDialog item="List" onCreate={mockOnCreate} />);
  //   // fireEvent.submit(screen.getByTestId('AddOrEditItemForm'), {
  //   //   onSubmit: mockOnSubmit,
  //   // });
  //   fireEvent.click(screen.getByText('Submit'));
  //   expect(mockOnSubmit).toHaveBeenCalled();
  // });
});
