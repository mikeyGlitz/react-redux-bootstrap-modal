require('./shim');
/* eslint-disable import/no-extraneous-dependencies */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
/* eslint-enable */

Enzyme.configure({ adapter: new Adapter() });
