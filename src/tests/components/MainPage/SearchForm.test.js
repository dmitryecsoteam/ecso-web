import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { SearchForm } from '../../../components/MainPage/SearchForm';
import { client } from '../../../clientGraphQL/client';
import 'react-dates/initialize';

import origins from '../../fixtures/origins';


jest.mock('../../../clientGraphQL/client.js');

window.matchMedia = (query) => {
  const queryMap = {
    '(min-width: 416px)': () => window.innerWidth >= 415,
    '(max-width: 415px)': () => window.innerWidth < 415
  };

  const queryValue = queryMap[query];
  const matches = queryValue ? queryValue() : false;

  return {
    matches,
    addListener: () => { },
    removeListener: () => { }
  };
};

const startSearchOrigins = jest.fn(() => Promise.resolve());
const startSearchDestinations = jest.fn();
const startSearchTravelsByParameters = jest.fn();
const startSearchTravelsByDestination = jest.fn();
const setSearchForm = jest.fn();

const props = {
  origins: [],
  isFetchingOrigins: false,
  destinations: [],
  isFetchingDestinations: false,
  searchForm: {
    originInputValue: '',
    originsSelectedId: 0,
    destinationInputValue: '',
    destinationSelectedId: 0,
    date: moment(),
    parametersPanel: false,
    parametersValue: {
      Beach: 0,
      Food: 0,
      Museum: 0,
      Nature: 0,
      Shopping: 0,
      Nightlife: 0
    }
  },
  startSearchOrigins,
  startSearchDestinations,
  startSearchTravelsByParameters,
  startSearchTravelsByDestination,
  setSearchForm
};


test('should render SearchForm with default props', () => {
  const wrapper = shallow(<SearchForm {...props} />);
  expect(wrapper).toMatchSnapshot();
});



/*************************   Origin   *************************/

test('should set suggestOrigins to array of suggestions on user input', async () => {
  const value = 'T';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });

  expect(startSearchOrigins).toHaveBeenCalledWith(value[0].toLowerCase());
  expect(wrapper.state('suggestOrigins')).toEqual([origins[0], origins[2]]);
});

test('should set suggestOrigins to empty array on user input', async () => {
  const value = 'Tk';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });

  expect(startSearchOrigins).toHaveBeenCalledWith(value[0].toLowerCase());
  expect(wrapper.state('suggestOrigins')).toEqual([]);
});

test('should not start search origins when user input starts from special symbol', async () => {
  const value = '%Tk';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });

  expect(startSearchOrigins).toHaveBeenCalledTimes(0);
  expect(wrapper.state('suggestOrigins')).toEqual([]);
});

test('should render autosuggest list', async () => {
  const value = 'T';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });
  wrapper.find('Autosuggest').at(0).find('input').simulate('focus');

  expect(wrapper.find('Autosuggest').at(0)).toMatchSnapshot();
});

test('should set originInputValue when user selects suggestion', async () => {
  const value = 'T';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });
  wrapper.find('Autosuggest').at(0).find('input').simulate('focus');
  wrapper.find('Autosuggest').at(0).find('li').at(1).simulate('click');

  expect(wrapper.state('originInputValue')).toEqual(origins[2].nameEn);
  expect(wrapper.state('originsSelectedId')).toEqual(origins[2]._id);
});

test('should set originInputValue to first item of origins array when user blur out input', async () => {
  const value = 'T';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });
  wrapper.find('Autosuggest').at(0).find('input').simulate('focus');
  wrapper.find('Autosuggest').at(0).find('input').simulate('blur');

  expect(wrapper.state('originInputValue')).toEqual(origins[0].nameEn);
  expect(wrapper.state('originsSelectedId')).toEqual(origins[0]._id);
});

test('should clear input when user blur out and suggestions array is empty', async () => {
  const value = 'Tk';
  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
  await wrapper.setProps({
    origins
  });
  wrapper.find('Autosuggest').at(0).find('input').simulate('focus');
  wrapper.find('Autosuggest').at(0).find('input').simulate('blur');

  expect(wrapper.state('originInputValue')).toEqual('');
  expect(wrapper.state('originsSelectedId')).toEqual(0);
});

test('should give an error on form submition with empty origin', () => {
  const wrapper = shallow(<SearchForm {...props} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });

  expect(wrapper.state('errorOriginInput')).toBeTruthy();
});



/*************************   Date   *************************/

test('should submit correct date (small devices)', () => {

  // Set device width to small
  window.testMediaQueryValues = { width: 300 };

  const wrapper = mount(<SearchForm {...props} />);
  wrapper.find('MediaQuery').at(0).find('input').simulate('change', { target: { value: '1970-05-22' } });
  expect(wrapper.state('date').format('YYYY-MM-DD')).toEqual(moment('1970-05-22').format('YYYY-MM-DD'));
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeFalsy();
});

test('should submit correct date after incorrect (small devices)', () => {

  // Set device width to small
  window.testMediaQueryValues = { width: 300 };

  const wrapper = mount(<SearchForm {...props} />);
  wrapper.setState({
    date: null,
    errorDateInput: true
  });
  wrapper.find('MediaQuery').at(0).find('input').simulate('change', { target: { value: '1970-05-22' } });
  expect(wrapper.state('date').format('YYYY-MM-DD')).toEqual(moment('1970-05-22').format('YYYY-MM-DD'));
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeFalsy();
});

test('should not submit out of range date (small devices)', () => {

  // Set device width to small
  window.testMediaQueryValues = { width: 300 };

  const wrapper = mount(<SearchForm {...props} />);

  // Enter date out of range (1 year)
  wrapper.find('MediaQuery').at(0).find('input').simulate('change', { target: { value: '1971-01-01' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();

  // Enter past date
  wrapper.find('MediaQuery').at(0).find('input').simulate('change', { target: { value: '1969-12-31' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();
});

test('should not submit nonexistent date (small devices)', () => {

  // Set device width to small
  window.testMediaQueryValues = { width: 300 };

  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('MediaQuery').at(0).find('input').simulate('change', { target: { value: '1970-01-35' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();
});


test('should submit correct date (big devices)', () => {

  // Set device width to big
  window.testMediaQueryValues = { width: 1200 };

  const wrapper = mount(<SearchForm {...props} />);
  wrapper.find('MediaQuery').at(1).find('input').simulate('change', { target: { value: '1970-05-22' } });
  expect(wrapper.state('date').format('YYYY-MM-DD')).toEqual(moment('1970-05-22').format('YYYY-MM-DD'));
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeFalsy();
});

test('should submit correct date after incorrect (big devices)', () => {

  // Set device width to small
  window.testMediaQueryValues = { width: 1200 };

  const wrapper = mount(<SearchForm {...props} />);
  wrapper.setState({
    date: null,
    errorDateInput: true
  });
  wrapper.find('MediaQuery').at(1).find('input').simulate('change', { target: { value: '1970-05-22' } });
  expect(wrapper.state('date').format('YYYY-MM-DD')).toEqual(moment('1970-05-22').format('YYYY-MM-DD'));
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeFalsy();
});

test('should not submit out of range date (big devices)', () => {

  // Set device width to big
  window.testMediaQueryValues = { width: 1200 };

  const wrapper = mount(<SearchForm {...props} />);

  // Enter date out of range (1 year)
  wrapper.find('MediaQuery').at(1).find('input').simulate('change', { target: { value: '1971-01-01' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();

  // Enter past date
  wrapper.find('MediaQuery').at(1).find('input').simulate('change', { target: { value: '1969-12-31' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();
});

test('should not submit nonexistent date (big devices)', () => {

  // Set device width to big
  window.testMediaQueryValues = { width: 1200 };

  const wrapper = mount(<SearchForm {...props} />);

  wrapper.find('MediaQuery').at(1).find('input').simulate('change', { target: { value: '1970-01-35' } });
  expect(wrapper.state('date')).toBeNull();
  wrapper.find('form').simulate('submit');
  expect(wrapper.state('errorDateInput')).toBeTruthy();
});

test('should set calendar focus on change (small devices)', () => {

  window.testMediaQueryValues = { width: 300 };

  const wrapper = shallow(<SearchForm {...props} />);
  //console.log(wrapper.find('MediaQuery').at(0).debug())
  wrapper.find('MediaQuery').at(0).find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBeTruthy();
});

test('should set calendar focus on change (big devices)', () => {

  window.testMediaQueryValues = { width: 1200 };

  const wrapper = shallow(<SearchForm {...props} />);
  //console.log(wrapper.find('MediaQuery').at(0).debug())
  wrapper.find('MediaQuery').at(1).find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBeTruthy();
});





