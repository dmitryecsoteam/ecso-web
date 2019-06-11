export default (src) => {
    if (src === '/images/Name-Country/slide1.jpg') return Promise.resolve(true);
    else if (src === '/images/Name-Country/slide2.jpg') return Promise.resolve(true);
    else if (src === '/images/Name-Country/slide3.jpg') return Promise.resolve(true);
    else return Promise.resolve(false);
}