import React from 'react';
import { shallow } from 'enzyme';
import WeatherCard from '../../../components/TravelPage/WeatherCard';
//import moment from 'moment';
jest.unmock('moment');

test('should render WeatherCard with cloud condition', () => {
    const wrapper = shallow(<WeatherCard tempMin={15} tempMax={23} condition="cloud" date="2019-06-01" />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WeatherCard with sun condition', () => {
    const wrapper = shallow(<WeatherCard tempMin={15} tempMax={23} condition="sun" date="2019-06-01" />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WeatherCard with sun-cloud condition', () => {
    const wrapper = shallow(<WeatherCard tempMin={15} tempMax={23} condition="sun-cloud" date="2019-06-01" />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WeatherCard with rain condition', () => {
    const wrapper = shallow(<WeatherCard tempMin={15} tempMax={23} condition="rain" date="2019-06-01" />);
    expect(wrapper).toMatchSnapshot();
});