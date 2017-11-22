/* eslint-disable import/no-extraneous-dependencies */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
/* eslint-enable */

global.requestAnimationFrame = callback => setTimeout(callback, 0);

Enzyme.configure({ adapter: new Adapter() });
