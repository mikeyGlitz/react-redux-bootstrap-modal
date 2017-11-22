const raf = callback => setTimeout(callback, 0);

global.requestAnimationFrame = raf;

export default raf;
