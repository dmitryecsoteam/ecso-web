import React from 'react';
import { mount } from 'enzyme';
import ImageSlider from '../../../components/TravelPage/ImageSlider';

jest.mock('../../../utils/loadImage.js')

// puts resolve stub function in callback queue
// when this function is called, it waits untill async componentDidMount completes
const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

let wrapper;
beforeEach(async () => {

    wrapper = mount(<ImageSlider
        interval={5000}
        name='Name'
        country='Country'
    />);

    await waitForAsync();

    // re-render after componentDidMount completes
    wrapper.update();
});

test('should render empty ImageSlider', async () => {
    const wrapper = mount(<ImageSlider
        interval={5000}
        name='No'
        country='Images'
    />);

    await waitForAsync();

    // re-render after componentDidMount completes
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('images')).toEqual([]);
});

test('should render ImageSlider with three images', () => {

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('images')).toEqual(["/images/Name-Country/slide1.jpg", "/images/Name-Country/slide2.jpg", "/images/Name-Country/slide3.jpg"]);

    // Initial index must be 0
    expect(wrapper.state('index')).toBe(0);
});

test('should rotate image right', () => {

    // 1. Right click
    wrapper.find('.image-slider__button--right').simulate('click');
    wrapper.update();

    // Index should change to 1
    // and bakground image in style should change to slide2
    expect(wrapper.state('index')).toBe(1);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide2.jpg)' });


    // 2. Right click again
    wrapper.find('.image-slider__button--right').simulate('click');
    wrapper.update();

    // Index should change to 2
    // and bakground image in style should change to slide3
    expect(wrapper.state('index')).toBe(2);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide3.jpg)' });

    // 3. Right click again
    wrapper.find('.image-slider__button--right').simulate('click');
    wrapper.update();

    // Index should change to 0
    // and bakground image in style should change to slide1
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide1.jpg)' });
});

test('should rotate image left', () => {

    // 1. Left click
    wrapper.find('.image-slider__button--left').simulate('click');
    wrapper.update();

    // Index should change to 2
    // and bakground image in style should change to slide3
    expect(wrapper.state('index')).toBe(2);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide3.jpg)' });


    // 2. Left click
    wrapper.find('.image-slider__button--left').simulate('click');
    wrapper.update();

    // Index should change to 1
    // and bakground image in style should change to slide2
    expect(wrapper.state('index')).toBe(1);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide2.jpg)' });


    // 3. Left click
    wrapper.find('.image-slider__button--left').simulate('click');
    wrapper.update();

    // Index should change to 0
    // and bakground image in style should change to slide1
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide1.jpg)' });
});

test('should change image on dot click', async () => {

    // We are currently on slide1
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide1.jpg)' });

    // Click on last dot
    const dot = wrapper.find('.image-slider__dot').last();
    dot.simulate('click', { target: { dataset: { id: dot.prop('data-id') } }});
    wrapper.update();

    // Index should change to 2
    // and bakground image in style should change to slide3
    expect(wrapper.state('index')).toBe(2);
    expect(wrapper.find('.image-slider__current-slide').prop('style')).toEqual({ backgroundImage: 'url(/images/Name-Country/slide3.jpg)' });
});

test('should set correct interval', async () => {

    jest.useFakeTimers();

    const interval = 15000;

    const wrapper = mount(<ImageSlider
        interval={interval}
        name='No'
        country='Images'
    />);

    await waitForAsync();

    // should call setInterval on component mount
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), interval);

    
    // change image
    wrapper.find('.image-slider__button--right').simulate('click');
    // should reset interval
    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
});