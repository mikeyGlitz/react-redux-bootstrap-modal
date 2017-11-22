import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';

/**
 * A `react-bootstrap` `Modal` component which wraps a component
 * This component is placed inside {@link ModalWrapper} so that it
 * can be connected to the `redux` state
 * @param {any} props React props
 * * `handleHide` - function to handle hiding the modal dialog
 * * `title` - Title which gets displayed in the modal dialog
 * * `show` - flag to indicate if the modal is showing or not
 * * `component` - Component to be wrapped in the modal
 * @return {React.ComponentClass} React component which contains
 * the modal and the wrapped component
 */
const InnerModal = ({
  title,
  show,
  close,
  component: Component,
  backdrop,
  bsSize,
  ...props
}) => (
  <Modal
    backdrop={backdrop}
    bsSize={bsSize}
    show={show}
    onHide={props.handleHide}
  >
    <Modal.Header closeButton={close}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Component {...props} />
    </Modal.Body>
  </Modal>
);

InnerModal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.bool,
  component: PropTypes.element.isRequired,
  title: PropTypes.string,
  backdrop: PropTypes.oneOfType([
    PropTypes.oneOf(['static']),
    PropTypes.bool,
  ]),
  bsSize: PropTypes.oneOf(['lg', 'sm', 'small', 'large']),
};

InnerModal.defaultProps = {
  title: '',
  close: true,
  backdrop: null,
  bsSize: null,
};

const PropertyInjector = component => props => InnerModal({ component, ...props });

/**
 * A wrapper component for the modal dialog
 * This component connects the modal dialog to the redux state
 * @param {any} props React props
 * * `component` - The component to be wrapped by the modal
 * * `title` - A title string to pass down to the modal
 * * `name` - The name of the dialog. This field translates to field under the
 * `modal` state
 * * `destroyOnHide` - flag to indicate whether the component gets destroyed
 * when the modal closes or not
 * * `options` A set of options to configure the modal
 * * `resolve` - a resolver function to resolve before the dialog is displayed
 * @return {React.ComponentClass} A react component which
 * wraps the modal dialog
 */
const ModalWrapper = ({ component, title, options, ...props }) => {
  const delegateOptions = Object.keys(options).reduce((acc, curr) => {
    /* eslint-disable no-param-reassign */
    if (!acc) acc = {};
    /* eslint-enable */
    if (options[curr] !== null) acc[curr] = options[curr];
    return acc;
  }, {});

  const ModalWithProps = PropertyInjector(component);
  const WrappedModal = connectModal({ title, delegateOptions, ...props })(ModalWithProps);

  return <WrappedModal />;
};

ModalWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  resolve: PropTypes.func,
  destroyOnHide: PropTypes.bool,
  component: PropTypes.element.isRequired,
  options: PropTypes.shape({
    close: PropTypes.bool,
    backdrop: PropTypes.oneOfType([
      PropTypes.oneOf(['static']),
      PropTypes.bool,
    ]),
    bsSize: PropTypes.oneOf(['lg', 'sm', 'small', 'large']),
  }),
};

ModalWrapper.defaultProps = {
  destroyOnHide: false,
  resolve: () => null,
  title: '',
  options: {
    close: true,
    backdrop: null,
    bsSize: null,
  },
};

export default ModalWrapper;
