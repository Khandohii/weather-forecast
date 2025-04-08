import renderer from 'react-test-renderer';
import React from 'react';
import FormSearch from './FormSearch.js';

it('renders FormSearch component correctly', () => {
    const component = renderer.create(
        <FormSearch setCityFunc={() => {}} setCoordsGlobal={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})