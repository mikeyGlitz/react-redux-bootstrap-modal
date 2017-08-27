# React Redux Bootstrap Modal
This project is a bootstrap wrapper for [redux-modal](https://github.com/yesmeck/redux-modal)
that allows you to create a stateful modal using redux

## Getting Started
To use `react-redux-bootstrap-modal` first add it to your project
```bash
npm install --save react-redux-bootstrap-modal
npm install --save bootstrap # bootstrap is a required peerDependency
```

After it's added to your project you can use it inside of your component
```jsx
import * as React from 'react';
import { ModalWrapper, show } from 'react-redux-bootstrap-modal';
import { connect } from 'redux';
import MyModalBody from './somecomponent';

const MyComponent = ({showDialog}) => (
  <div>
    <button onClick={showDialog}>Show Dialog</button>
    <ModalWrapper name="my-modal" component={MyModalBody} />
  </div>
);

const ConnectedComponent = connect(null, dispatch => ({
  showDialog: dispatch(show('my-modal', { title: 'Modal Title' }))
}))(MyComponent);
```

To hide the dialog, either click off the screen, or add the code
```jsx
import {hide} from 'react-redux-bootstrap-modal';
...
connect(null, dispatch => ({
  hideDialog: dispatch(hide('my-modal'))
}));
```
inside your component which will comprise your modal body

### Additional API Information
`react-redux-bootstrap-modal` wraps the API from 
[redux-modal](https://github.com/yesmeck/redux-modal/blob/master/docs/api.md)
You can find details to the other API function calls there.
This project adds the `ModalWrapper` component which provides
a modal using `react-bootstrap` as the modal component.
`ModalWrapper` takes 2 mandatory properties:
* `name` - The name of the modal
* `component` - A React component which will be placed inside the
modal body

## License
This project uses the MIT License

## Project Tasks
|  Task Name  | Description                                |
|-------------|--------------------------------------------|
|  build      |  builds the project sources (using babel)  |
|  lint       |  Lints the project sources (eslint)        |
|  test       |  Executes unit tests using jest            |
|  clean      |  Cleans the `lib` director                 |

## Credit
* [react-bootstrap](https://react-bootstrap.github.io)
* [redux-modal](https://github.com/yesmeck/react-bootstrap)