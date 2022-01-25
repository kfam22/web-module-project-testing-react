import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const fakeEpisode = {
    id: 222,
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png', 
    name: '', 
    season: 22, 
    number: 22, 
    summary: 'episode 22 summary', 
    runtime: 22
}

const fakeEpisode2 = {
    id: 222,
    image: null, 
    name: '', 
    season: 22, 
    number: 22, 
    summary: 'episode 22 summary', 
    runtime: 22
}

test("renders without error", () => {
    render(<Episode episode={fakeEpisode}/>)
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={fakeEpisode}/>);
    const summary = screen.queryByText(/episode 22 summary/i);
    expect(summary).toBeInTheDocument();
    expect(summary).toBeVisible();
    expect(summary).toHaveTextContent('episode 22 summary');
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={fakeEpisode2} />);
    const imageLink = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    // console.log('imagelink:', imageLink);
    expect(imageLink).toBeInTheDocument();
});

// * [X] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
// * [X] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
// * [X] The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.