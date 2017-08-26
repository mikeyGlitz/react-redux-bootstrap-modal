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
const InnerModal = ({ handleHide, title, show, component: Component, ...props }) => (
  <Modal show={show} onHide={handleHide}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Component {...props} />
    </Modal.Body>
  </Modal>);

InnerModal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  component: PropTypes.elem
};

InnerModal.defaultProps = {
  component: <div />
};

const PropertyInjector = component => props => InnerModal({ component, ...props });

/**
 * A wrapper component for the modal dialog
 * This component connects the modal dialog to the redux state
 * @param {any} props React props
 * * `component` - The component to be wrapped by the modal
 * * `name` - The name of the dialog. This field translates to field under the
 * `modal` state
 * * `destroyOnHide` - flag to indicate whether the component gets destroyed
 * when the modal closes or not
 * * `resolve` - a resolver function to resolve before the dialog is displayed
 * @return {React.ComponentClass} A react component which
 * wraps the modal dialog
 */
const ModalWrapper = ({component, ...props}) => {
  const ModalWithProps = PropertyInjector(component);
  const WrappedModal = connectModal(props)(ModalWithProps);

  return <WrappedModal />
};

ModalWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  resolve: PropTypes.func,
  destroyOnHide: PropTypes.bool
};

ModalWrapper.defaultProps = {
  destroyOnHide: false,
  resolve: () => null
}

export default ModalWrapper;
