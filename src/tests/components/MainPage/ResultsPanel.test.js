import React from 'react';
import { shallow } from 'enzyme';
import { ResultsPanel } from '../../../components/MainPage/ResultsPanel';
import travels from '../../fixtures/travels';

let wrapper, setFilter;
beforeEach(() => {
    setFilter = jest.fn();
    wrapper = shallow(<ResultsPanel
        travels={[]}
        isFetching={false}
        isInitEmptyResult={true}
        parametersPanel={false}
        parametersValue={
            {
                Beach: 0,
                Food: 0,
                Museum: 0,
                Nature: 0,
                Shopping: 0,
                Nightlife: 0
            }
        }
        filter={
            {
                sortBy: 'relevance',
                desc: true
            }
        }
        setFilter={setFilter}
    />);
});

test('should render emplty div on INIT', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render spinner', () => {
    wrapper.setProps({ isFetching: true });
    expect(wrapper).toMatchSnapshot();
});

test('should render single TravelCard without filter', () => {
    wrapper.setProps({ isFetching: true });
    wrapper.setProps({
        travels: [travels[0]],
        isInitEmptyResult: false,
        isFetching: false
    });
    expect(wrapper).toMatchSnapshot();
});

test('should render list of travels', () => {
    wrapper.setProps({ isFetching: true });
    wrapper.setProps({
        travels: [travels[0], travels[1]],
        isInitEmptyResult: false,
        isFetching: false,
        parametersPanel: true,
        parametersValue: {
            Beach: 0,
            Food: 4,
            Museum: 4,
            Nature: 0,
            Shopping: 0,
            Nightlife: 0
        }
    });
    expect(wrapper).toMatchSnapshot();
});

test('should render list of travels with price descending filter', () => {
    wrapper.setProps({ isFetching: true });
    wrapper.setProps({
        travels: [travels[0], travels[1]],
        isInitEmptyResult: false,
        isFetching: false,
        parametersPanel: true,
        parametersValue: {
            Beach: 0,
            Food: 4,
            Museum: 4,
            Nature: 0,
            Shopping: 0,
            Nightlife: 0
        },
        filter: {
            sortBy: 'price',
            desc: true
        }
    });
    expect(wrapper).toMatchSnapshot();
});

test('should set filters on click', () => {
    wrapper.setProps({ isFetching: true });
    wrapper.setProps({
        travels: [travels[0], travels[1]],
        isInitEmptyResult: false,
        isFetching: false,
        parametersPanel: true,
        parametersValue: {
            Beach: 0,
            Food: 4,
            Museum: 4,
            Nature: 0,
            Shopping: 0,
            Nightlife: 0
        }
    });

    // shouldn't set current filter
    wrapper.find('.results__filter').simulate('click', { target: { id: 'relevanceDesc' } });
    expect(setFilter).toHaveBeenCalledTimes(0);

    wrapper.setProps({ filter: { sortBy: 'relevance', desc: false } });
    wrapper.find('.results__filter').simulate('click', { target: { id: 'relevanceAsc' } });
    expect(setFilter).toHaveBeenCalledTimes(0);

    wrapper.setProps({ filter: { sortBy: 'price', desc: true } });
    wrapper.find('.results__filter').simulate('click', { target: { id: 'priceDesc' } });
    expect(setFilter).toHaveBeenCalledTimes(0);

    wrapper.setProps({ filter: { sortBy: 'price', desc: false } });
    wrapper.find('.results__filter').simulate('click', { target: { id: 'priceAsc' } });
    expect(setFilter).toHaveBeenCalledTimes(0);

    wrapper.setProps({ filter: { sortBy: 'relevance', desc: true } });


    // should set filter action
    wrapper.find('.results__filter').simulate('click', { target: { id: 'relevanceAsc' } });
    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith('relevance', false);

    wrapper.find('.results__filter').simulate('click', { target: { id: 'priceDesc' } });
    expect(setFilter).toHaveBeenCalledTimes(2);
    expect(setFilter).toHaveBeenCalledWith('price', true);

    wrapper.find('.results__filter').simulate('click', { target: { id: 'priceAsc' } });
    expect(setFilter).toHaveBeenCalledTimes(3);
    expect(setFilter).toHaveBeenCalledWith('price', false);
});