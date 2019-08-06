import React from 'react';
import { shallow } from 'enzyme';
import { NotificationButton } from '../../../components/TravelPage/NotificationButton';

jest.mock('../../../clientGraphQL/client.js');

const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

test('should render NotificationButton for signed user - Notify me about price changes', async () => {
    const wrapper = shallow(<NotificationButton user={{ email: 'test@mail.com', name: 'b' }} travelId="Not in notifications" />);
    await waitForAsync();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isNotification')).toBeFalsy();
});

test('should render NotificationButton for signed user - Delete notification', async () => {
    const wrapper = shallow(<NotificationButton user={{ email: 'test@mail.com', name: 'b' }} travelId="In notifications" />);
    await waitForAsync();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isNotification')).toBeTruthy();
});

test('should not render NotificationButton if user is null', () => {
    const wrapper = shallow(<NotificationButton user={null} travelId="test" />);

    expect(wrapper).toMatchSnapshot();
});