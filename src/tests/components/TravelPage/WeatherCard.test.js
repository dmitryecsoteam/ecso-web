import React from 'react';
import { shallow } from 'enzyme';
import WeatherCard from '../../../components/TravelPage/WeatherCard';
//import moment from 'moment';
jest.unmock('moment');

test('should render WeatherCard', () => {
    const wrapper = shallow(<WeatherCard tempMin={15} tempMax={23} conditionText="Mostly cloudy" conditionImage="cloud" date="2019-06-01" />);
    expect(wrapper).toMatchSnapshot();
});
