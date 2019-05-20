import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { SearchForm } from '../../../components/MainPage/SearchForm';
import { client } from '../../../clientGraphQL/client';
import 'react-dates/initialize';

import origins from '../../fixtures/origins';
import destinations from '../../fixtures/destinations'


jest.mock('../../../clientGraphQL/client.js');


const startSearchOrigins = jest.fn(() => Promise.resolve());
const startSearchDestinations = jest.fn(() => Promise.resolve());
const startSearchTravelsByParameters = jest.fn();
const startSearchTravelsByDestination = jest.fn();
const setSearchForm = jest.fn();

let props;

beforeEach(() => {
  props = {
    origins: [],
    isFetchingOrigins: false,
    destinations: [],
    isFetchingDestinations: false,
    searchForm: {
      originInputValue: '',
      originSelectedId: 0,
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
});


test('should render SearchForm with default props', () => {
  const wrapper = shallow(<SearchForm {...props} />);
  expect(wrapper).toMatchSnapshot();
});



/*************************   Origin   *************************/

describe('origin autoinput', () => {
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

    expect(startSearchOrigins).not.toHaveBeenCalled();
    expect(wrapper.state('suggestOrigins')).toEqual([]);
  });

  test('should start search origins only on first letter while user continue typing', async () => {
    const wrapper = mount(<SearchForm {...props} />);
    let value = 'T';

    wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      origins
    });

    value = 'To';
    wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });

    expect(startSearchOrigins).toHaveBeenCalledTimes(1);
    expect(startSearchOrigins).toHaveBeenCalledWith(value[0].toLowerCase())
  });

  test('should render origins autosuggest list', async () => {
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
    expect(wrapper.state('originSelectedId')).toEqual(origins[2]._id);
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
    expect(wrapper.state('originSelectedId')).toEqual(origins[0]._id);
  });

  test('should clear origin input when user blur out and suggestions array is empty', async () => {
    const value = 'Tk';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(0).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      origins
    });
    wrapper.find('Autosuggest').at(0).find('input').simulate('focus');
    wrapper.find('Autosuggest').at(0).find('input').simulate('blur');

    expect(wrapper.state('originInputValue')).toEqual('');
    expect(wrapper.state('originSelectedId')).toEqual(0);
  });

  test('should give an error on form submit with empty origin', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('errorOriginInput')).toBeTruthy();
  });
})





/*************************   Destination   *************************/

describe('destination autoinput', () => {
  test('should set suggestDestinations to array of suggestions on user input', async () => {
    const value = 'T';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });

    expect(startSearchDestinations).toHaveBeenCalledWith(value[0].toLowerCase());
    expect(wrapper.state('suggestDestinations')).toEqual([destinations[0], destinations[2]]);
  });

  test('should set suggestDestinations to empty array on user input', async () => {
    const value = 'Tk';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });

    expect(startSearchDestinations).toHaveBeenCalledWith(value[0].toLowerCase());
    expect(wrapper.state('suggestDestinations')).toEqual([]);
  });

  test('should not start search destinations when user input starts from special symbol', async () => {
    const value = '%Tk';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });

    expect(startSearchDestinations).not.toHaveBeenCalled();
    expect(wrapper.state('suggestDestinations')).toEqual([]);
  });

  test('should start search destinations only on first letter while user continue typing', async () => {
    const wrapper = mount(<SearchForm {...props} />);
    let value = 'T';

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });

    value = 'To';
    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });

    expect(startSearchDestinations).toHaveBeenCalledTimes(1);
    expect(startSearchDestinations).toHaveBeenCalledWith(value[0].toLowerCase())
  });

  test('should render destinations autosuggest list', async () => {
    const value = 'T';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });
    wrapper.find('Autosuggest').at(1).find('input').simulate('focus');

    expect(wrapper.find('Autosuggest').at(1)).toMatchSnapshot();
  });

  test('should set destinationInputValue when user selects suggestion', async () => {
    const value = 'T';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });
    wrapper.find('Autosuggest').at(1).find('input').simulate('focus');
    wrapper.find('Autosuggest').at(1).find('li').at(1).simulate('click');

    expect(wrapper.state('destinationInputValue')).toEqual(destinations[2].nameEn);
    expect(wrapper.state('destinationSelectedId')).toEqual(destinations[2]._id);
  });

  test('should set destinationInputValue to first item of destinations array when user blur out input', async () => {
    const value = 'T';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });
    wrapper.find('Autosuggest').at(1).find('input').simulate('focus');
    wrapper.find('Autosuggest').at(1).find('input').simulate('blur');

    expect(wrapper.state('destinationInputValue')).toEqual(destinations[0].nameEn);
    expect(wrapper.state('destinationSelectedId')).toEqual(destinations[0]._id);
  });

  test('should clear destination input when user blur out and suggestions array is empty', async () => {
    const value = 'Tk';
    const wrapper = mount(<SearchForm {...props} />);

    wrapper.find('Autosuggest').at(1).find('input').simulate('change', { target: { value } });
    await wrapper.setProps({
      destinations
    });
    wrapper.find('Autosuggest').at(1).find('input').simulate('focus');
    wrapper.find('Autosuggest').at(1).find('input').simulate('blur');

    expect(wrapper.state('destinationInputValue')).toEqual('');
    expect(wrapper.state('destinationSelectedId')).toEqual(0);
  });

  test('should give an error on form submit with empty destination', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('errorDestinationInput')).toBeTruthy();
  });
});




/*************************   Date   *************************/

describe('date input', () => {
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
});



/*************************   Parameters Panel   *************************/

describe('parameters panel', () => {

  test('should open parameters panel on click', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    // Set errors to true
    wrapper.setState({
      errorOriginInput: true,
      errorDestinationInput: true,
      errorDateInput: true,
      errorParameters: true
    });

    // Open panel
    wrapper.find('ParametersPanel').prop('parametersOnClick')();
    expect(wrapper.state('parametersPanel')).toBeTruthy();
    // Should reset error state of parameters panel and destination on each open
    expect(wrapper.state('errorParameters')).toBeFalsy();
    expect(wrapper.state('errorDestinationInput')).toBeFalsy();
    expect(wrapper.state('errorOriginInput')).toBeTruthy();
    expect(wrapper.state('errorDateInput')).toBeTruthy();
    // Should dispatch search form
    expect(setSearchForm).toHaveBeenCalledWith(wrapper.state())
  });

  test('should close parameters panel on click', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    // Set errors to true and open panel
    wrapper.setState({
      parametersPanel: true,
      errorOriginInput: true,
      errorDestinationInput: true,
      errorDateInput: true,
      errorParameters: true
    });

    // Close panel
    wrapper.find('ParametersPanel').prop('parametersOnClick')();
    expect(wrapper.state('parametersPanel')).toBeFalsy();
    // Should reset error state of parametrs on close
    expect(wrapper.state('errorParameters')).toBeFalsy();
    expect(wrapper.state('errorDestinationInput')).toBeFalsy();
    expect(wrapper.state('errorOriginInput')).toBeTruthy();
    expect(wrapper.state('errorDateInput')).toBeTruthy();
    // Should dispatch search form
    expect(setSearchForm).toHaveBeenCalledWith(wrapper.state())
  });

  test('should change parameter value', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.find('ParametersPanel').prop('onChange')(5, 'Beach');
    expect(wrapper.state('parametersValue').Beach).toBe(5);

    wrapper.find('ParametersPanel').prop('onChange')(3, 'Food');
    expect(wrapper.state('parametersValue').Food).toBe(3);

    wrapper.find('ParametersPanel').prop('onChange')(2, 'Museum');
    expect(wrapper.state('parametersValue').Museum).toBe(2);

    wrapper.find('ParametersPanel').prop('onChange')(1, 'Nature');
    expect(wrapper.state('parametersValue').Nature).toBe(1);

    wrapper.find('ParametersPanel').prop('onChange')(5, 'Shopping');
    expect(wrapper.state('parametersValue').Shopping).toBe(5);

    wrapper.find('ParametersPanel').prop('onChange')(4, 'Nightlife');
    expect(wrapper.state('parametersValue').Nightlife).toBe(4);

    expect(setSearchForm).toHaveBeenCalledTimes(6);
    expect(setSearchForm).toHaveBeenLastCalledWith(wrapper.state());
  });
});




/*************************   Submit  *************************/

describe('submit', () => {
  test('should not submit form with empty origin', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.setState({
      destinationInputValue: 'dest',
      destinationSelectedId: 15
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(startSearchTravelsByDestination).not.toHaveBeenCalled();
    expect(startSearchTravelsByParameters).not.toHaveBeenCalled();
  });

  test('should not submit form with empty destination', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.setState({
      originInputValue: 'orig',
      originSelectedId: 3,
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(startSearchTravelsByDestination).not.toHaveBeenCalled();
    expect(startSearchTravelsByParameters).not.toHaveBeenCalled();
  });

  test('should not submit form with wrong date', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.setState({
      date: null
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(startSearchTravelsByDestination).not.toHaveBeenCalled();
    expect(startSearchTravelsByParameters).not.toHaveBeenCalled();
  });

  test('should not submit form with zero parameters chosen', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.setState({
      originInputValue: 'orig',
      originSelectedId: 3,
      parametersPanel: true
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(startSearchTravelsByDestination).not.toHaveBeenCalled();
    expect(startSearchTravelsByParameters).not.toHaveBeenCalled();
  });

  test('should start search travels by destination', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.setState({
      originInputValue: 'orig',
      originSelectedId: 3,
      destinationInputValue: 'dest',
      destinationSelectedId: 15
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(startSearchTravelsByDestination).toHaveBeenCalledWith(3, 15, wrapper.state('date').format('YYYY-MM-DD'));
  });

  test('should start search travels by parameters', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    const parametersValue = {
      Beach: 0,
      Food: 5,
      Museum: 0,
      Nature: 5,
      Shopping: 3,
      Nightlife: 0
    }

    wrapper.setState({
      originInputValue: 'orig',
      originSelectedId: 3,
      parametersPanel: true,
      parametersValue
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    expect(startSearchTravelsByParameters).toHaveBeenCalledWith(3, parametersValue, wrapper.state('date').format('YYYY-MM-DD'));
  });
});