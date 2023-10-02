import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ANewRunner from '../newRunner/newRunner';
import React from 'react';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('ANewRunner component', () => {
  it('should run the component without errors', () => {
    act(() => {
      render(<ANewRunner />);
    });
  });

  it('renders the form fields', () => {
    const { getByLabelText } = render(<ANewRunner />);
    expect(getByLabelText('Your name')).toBeInTheDocument();
    expect(getByLabelText('When your race is')).toBeInTheDocument();
    expect(getByLabelText('how long your race is')).toBeInTheDocument();
    expect(getByLabelText('what if you time objective')).toBeInTheDocument();
    expect(getByLabelText('Your most recent longest run')).toBeInTheDocument();
    expect(
      getByLabelText('which days of the week you do not want to training'),
    ).toBeInTheDocument();
    expect(
      getByLabelText('from when you would be on holidays'),
    ).toBeInTheDocument();
    expect(
      getByLabelText('until when you would be on holidays'),
    ).toBeInTheDocument();
  });
  
  it('a name should be added', async () => {
    render(<ANewRunner />);
    await waitFor(() => {
    const nameInput = screen.getByLabelText('Your name') as HTMLInputElement;
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Daniel Smith' } });
    });
      expect(nameInput.value).toBe('Daniel Smith');
  });
  });
  // it('race date should be added', async () => {
  //   render(<ANewRunner />);
  //   await waitFor(() => {
  //   const raceDateInput = screen.getByLabelText(
  //     'When your race is',
  //   ) as HTMLInputElement;
  //   act(() => {
  //     fireEvent.change(raceDateInput, { target: { value: '8.64e15' } });
  //   });
  //     expect(raceDateInput.value).toBe('8.64e15');
  // });
  // });

  it('race distance should be added', async () => {
    render(<ANewRunner />);
    await waitFor(() => {
    const raceDistanceInput = screen.getByLabelText(
      'how long your race is',
    ) as HTMLInputElement;
    act(() => {
      fireEvent.change(raceDistanceInput, { target: { value: '40' } });
    });
      expect(raceDistanceInput.value).toBe('40');
  });
  });
});
