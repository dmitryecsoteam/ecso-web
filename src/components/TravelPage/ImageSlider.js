import React from 'react';
import loadImage from '../../utils/loadImage';
import '@babel/polyfill';

export default class ImageSlider extends React.Component {

    // Put first slide in initial state, so it could be displayed as soon as it would be loaded
    // Then load all next slides in componentDidMount
    state = {
        images: [`/images/${this.props.name}-${this.props.country}/slide1.jpg`],
        index: 0
    }

    // ref to ImageSlider div container. To control css classes and animation
    divRef = React.createRef();

    // Interval property for setInterval and clearInterval
    autoSlide = 0;

    async componentDidMount() {

        // add animation
        this.divRef.current.classList.add('image-slider__animation');

        const images = this.state.images.slice();
        let i = 2;
        let loadNextImage = true;
        while (loadNextImage) {

            // load next image
            loadNextImage = await loadImage(`/images/${this.props.name}-${this.props.country}/slide${i}.jpg`);

            // TRUE - image exists and loaded in cache, add this URL to images array and increment counter
            // FALSE - image doesn't exist, leave while loop
            if (loadNextImage) {
                images.push(`/images/${this.props.name}-${this.props.country}/slide${i}.jpg`);
                i++;
            }
        }

        // update state to rerender component
        this.setState({
            images
        });

        if (images.length > 1) {
            // Set interval to auto-slide when there are more than one image
            this.autoSlide = setInterval(this.slideRight, this.props.interval);
        }
    }

    componentDidUpdate() {

        if (this.divRef.current) {

            // HTMLElement's property reference triggers DOM reflow
            // without this animation wouldn't work
            // https://css-tricks.com/restart-css-animation/#article-header-id-0
            this.divRef.current.offsetWidth;

            // rerun animation on new image
            this.divRef.current.classList.add('image-slider__animation');

        }
    }

    componentWillUnmount() {
        clearInterval(this.autoSlide);
    }

    slideAndResetInterval = (slide, id) => {

        // remove auto-slide interval
        clearInterval(this.autoSlide);

        // change background image
        slide(id);

        // set new auto-slide interval
        this.autoSlide = setInterval(this.slideRight, this.props.interval);
    }

    slideTo = (index) => {

        // remove animation
        this.divRef.current.classList.remove('image-slider__animation');

        this.setState({
            index
        });
    }

    slideRight = () => {

        // rerender with next background image from images array
        // if current background image is the last in array of images, than move to the start
        if (this.state.index === this.state.images.length - 1) this.slideTo(0);
        else this.slideTo(this.state.index + 1);

    }

    slideLeft = () => {

        // rerender with previous background image from images array
        // if current background image is the first one, than move to the last one
        if (this.state.index === 0) this.slideTo(this.state.images.length - 1);
        else this.slideTo(this.state.index - 1);

    }

    onLeftClick = () => {

        // slide to previous image
        this.slideAndResetInterval(this.slideLeft);

    }

    onRightClick = () => {

        // slide to next image
        this.slideAndResetInterval(this.slideRight);

    }

    onDotClick = (event) => {

        // slide to choosed image
        this.slideAndResetInterval(this.slideTo, +event.target.dataset.id);

    }

    render() {

        const { index } = this.state;

        const { images } = this.state;

        const dots = [];
        for (let i = 0; i < images.length; i++) {
            let className = "image-slider__dot";
            if (i === index) {
                className += " image-slider__dot--active"
            }
            dots.push(<span key={i} data-id={i} className={className} onClick={this.onDotClick}></span>)
        }

        // const containerClassNames = classNames('image-slider__container',
        //     {
        //         'image-slider__container--empty': images.length === 0
        //     }
        // );

        return (
            <div>
                {images.length !== 0 && <div className="image-slider__container">
                    <div
                        ref={this.divRef}
                        className="image-slider__current-slide"
                        style={{ backgroundImage: `url(${images[index]})` }}
                    >
                    </div>
                    <div className="image-slider__button image-slider__button--left" onClick={this.onLeftClick}>&#10094;</div>
                    <div className="image-slider__button image-slider__button--right" onClick={this.onRightClick}>&#10095;</div>
                    <div className="image-slider__dots-container">{dots}</div>
                </div>}
            </div>
        );
    }
}