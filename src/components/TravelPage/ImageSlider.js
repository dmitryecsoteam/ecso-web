import React from 'react'

export default class ImageSlider extends React.Component {

    state = {
        index: 0
    }

    divRef = React.createRef();
    autoSlide = 0;

    componentDidMount() {
        // add animation
        this.divRef.current.classList.add('image-slider__animation');

        // preload images
        this.props.images.forEach((image) => {
            const img = new Image();
            img.src = image.fileName;
            img.onload = () => {
                console.log(image)
            };
        });

        // Set interval to auto-slide
        this.autoSlide = setInterval(() => {
            this.slideRight();
        }, this.props.interval);
    }

    componentDidUpdate() {
        void this.divRef.current.offsetWidth;
        this.divRef.current.classList.add('image-slider__animation');
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
        this.autoSlide = setInterval(() => {
            this.slideRight();
        }, this.props.interval);
    }

    slideTo = (index) => {
        this.setState({
            index
        });
    }

    slideRight = () => {

        // remove animation
        this.divRef.current.classList.remove('image-slider__animation');

        // rerender with next background image from images array
        // if current background image is the last in array of images, than move to the start
        if (this.state.index === this.props.images.length - 1) this.slideTo(0);
        else this.slideTo(this.state.index + 1);

    }

    slideLeft = () => {

        // remove animation
        this.divRef.current.classList.remove('image-slider__animation');

        // rerender with previous background image from images array
        // if curresnt background image is the first one, than move to the last one
        if (this.state.index === 0) this.slideTo(this.props.images.length - 1);
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

        const { images } = this.props;

        const dots = [];
        for (let i = 0; i < images.length; i++) {
            let className = "image-slider__dot";
            if (i === index) {
                className += " image-slider__dot--active"
            }
            dots.push(<span key={i} data-id={i} className={className} onClick={this.onDotClick}></span>)
        }

        return (
            <div className="image-slider__container">
                <div
                    ref={this.divRef}
                    className="image-slider__current-slide"
                    style={{ backgroundImage: `url(${images[index]})` }}
                >
                </div>
                <div className="image-slider__button image-slider__button--left" onClick={this.onLeftClick}>&#10094;</div>
                <div className="image-slider__button image-slider__button--right" onClick={this.onRightClick}>&#10095;</div>
                <div className="image-slider__dots-container">{dots}</div>
            </div>
        );
    }
}