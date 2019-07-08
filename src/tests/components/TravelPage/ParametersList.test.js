import React from 'react';
import { shallow, mount } from 'enzyme';
import ParametersList from '../../../components/TravelPage/ParametersList';

import { destinationForParametersList } from '../../fixtures/destinations';

jest.mock('../../../store/ReduxStore.js');

test('should render ParametersList component', () => {
    const wrapper = mount(<ParametersList destination={destinationForParametersList} />);
    expect(wrapper).toMatchSnapshot();
});