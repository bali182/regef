const Enzyme = require('enzyme')
const ReactAdapter = require('enzyme-adapter-react-16.3')
Enzyme.configure({ adapter: new ReactAdapter() })
