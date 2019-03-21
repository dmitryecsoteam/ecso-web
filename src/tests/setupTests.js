//const fetch = require('unfetch');
//global.fetch = fetch;

// import babel polyfill to use async/await
import "@babel/polyfill";


// Configure enzyme
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });