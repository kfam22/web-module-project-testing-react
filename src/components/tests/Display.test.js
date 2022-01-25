import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const fakeShow = {
    name: 'that show',
    summary: 'season 22 summary', 
    seasons: [{
        id: 22,
        name: 'season 22',
        episodes:[]
    }]
};

test('renders without errors with no props', ()=>{
    render(<Display/>);
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(1);
    })
});

test('displayFunc called when fetch button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled();
    })
})

// * [X] Test that the Display component renders without any passed in props.
// * [ ] Rebuild or copy the show test data element as used in the previous set of tests.
// * [X] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// * [X] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// * [ ] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.