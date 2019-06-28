import React from 'react';
import { shallow } from 'enzyme';
import ParametersList from '../../../components/TravelPage/ParametersList';

import { destinationForParametersList } from '../../fixtures/destinations';

jest.mock('../../../store/ReduxStore.js');

test('should render ParametersList component', () => {
    const wrapper = shallow(<ParametersList destination={destinationForParametersList} />);
    expect(wrapper).toMatchSnapshot();
});