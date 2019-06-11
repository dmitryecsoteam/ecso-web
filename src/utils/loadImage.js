// return TRUE if image loaded successfully and FALSE - if any error occured
export default (src) => {
    return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => { resolve(true); }
            img.onerror = () => { resolve(false); }
            img.src = src;
    });
}