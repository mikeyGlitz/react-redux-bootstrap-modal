/// <reference types="react" />

/**
 * Specification for an action which gets dispatched
 * from the ${@link hide} or {@link destory} actions
 * 
 * @interface IAction
 */
interface IAction {
  /**
   * Type string. Used by `redux`
   * 
   * @type {string}
   * @memberof IAction
   */
  type: string;
  /**
   * Payload to be submitted to the
   * reducer
   * 
   * @type {*}
   * @memberof IAction
   */
  payload: any;
}

/**
 * Specification for a show modal action
 * 
 * @interface IShowAction
 */
interface IShowAction {
  
  /**
   * Type string. Used by `redux`
   * 
   * @type {string}
   * @memberof IShowAction
   */
  type: string,
  /**
   * Payload to submit to the reducer
   * 
   * @type {{
   *     modal: string,
   *     props: any
   *   }}
   * @memberof IShowAction
   */
  payload: {
    /**
     * The name of the modal
     * 
     * @type {string}
     */
    modal: string,
    /**
     * Props to send to the wrapped component
     * 
     * @type {*}
     */
    props: any
  }
}

/**
 * Show function - shows a modal dialog
 * 
 * @export
 * @param {string} modal Name of the modal
 * @param {*} props Props to pass to the component wrapped in the modal component
 * @returns {IShowAction} Action descriptor for a dialog being shown
 */
export function show (modal: string, props: any): IShowAction;
/**
 * Action creator for hiding dialogs
 * 
 * @export
 * @param {string} modal  the name of the dialog to hide
 * @returns {IAction} Action descriptor for a dialog being hidden
 */
export function hide (modal: string): IAction;
/**
 * Action creator for destroying a modal
 * 
 * @export
 * @param {string} modal the name of the modal to destroy
 * @returns {IAction} an action describing the modal that was destroyed
 */
export function destroy (modal: string): IAction;

/**
 * Interface for options to pass to the modal component
 */
interface IModalOptions {
  /**
   * An indicator whether to show the close button or not (default to true)
   * @type {boolean}
   * @memberof IModalOptions
   */
  close?: boolean;
  /**
   * An optional parameter which indicates whether the modal component should have
   * a backdrop or not
   * @type {'static' | boolean}
   * @memberof IModalOptions
   */
  backdrop?: 'static' | boolean;
  /**
   * An optional parameter which indicates what size the modal component should be
   * @type {'lg' | 'large' | 'sm' | 'small'}
   * @memberof IModalOptions
   */
  bsSize?: 'lg' | 'large' | 'sm' | 'small';
}

/**
 * Redux reducer
 * 
 * @export
 * @param {*} state Existing state
 * @param {(IAction | IShowAction)} action Action descriptor for updating state
 * @returns {*} Updated state
 */
export function reducer(state: any, action: IAction | IShowAction): any;

/**
 * Properties for the interface wrapper component
 * 
 * @interface IWrapperProps
 */
interface IWrapperProps {
  /**
   * Name of the modal dialog
   * 
   * @type {string}
   * @memberof IWrapperProps
   */
  name: string;
  /**
   * An optional string to show for the title
   * @type {string?}
   * @memberof IWrapperProps
   */
  title?: string;
  /**
   * Component to wrap inside the modal
   * 
   * @type {React.ComponentType}
   * @memberof IWrapperProps
   */
  component: React.ComponentType<any>;
  /**
   * Flag to indicate whether the modal will be destroyed on hide
   * 
   * @type {boolean}
   * @memberof IWrapperProps
   */
  destroyOnHide?: boolean;
  /**
   * Function to resolve before displaying the modal
   * 
   * @memberof IWrapperProps
   */
  resolve?: (state: any, props: any) => any;
  /**
   * A set of options to pass down to the modal component
   */
  options?: IModalOptions;
}

/**
 * Component for displaying a modal dialog
 * 
 * @export
 * @param {IWrapperProps} props React props
 * @returns {React.ComponentType<any>} Wrapped modal instance
 */
export const ModalWrapper: (props: IWrapperProps) => React.Component<IWrapperProps>;