import React from 'react';
import { shallow } from 'enzyme';
import TravelCard from '../../../components/MainPage/TravelCard';

let wrapper;
beforeEach(() => {
    wrapper = shallow(<TravelCard
        _id="5c6c7e42e3b7e1edb974a39b"
        name="Osaka"
        country="Japan"
        nameEn="Osaka"
        countryEn="Japan"
        priceAirplane={123}
        carDistance={189}
        parameters={{}}
    />);
});

test('should render TravelCard with empty parameters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render TravelCard with parameters', () => {
    wrapper.setProps({ parameters:{
        Beach: 4,
        Food: 5,
        Museum: 4
    } });
    expect(wrapper).toMatchSnapshot();
});

test('should render TravelCard with find airplane prices', () => {
    wrapper.setProps({ priceAirplane: null, carDistance: 225 });
    expect(wrapper).toMatchSnapshot();
});

test('should render TravelCard with car distance', () => {
    wrapper.setProps({ priceAirplane: null });
    expect(wrapper).toMatchSnapshot();
});