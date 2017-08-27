/**
 * Typescript test file
 * this file doesn't actually run.
 * The goal here is to see if the source will compile against the
 * definitions specified in "index.d.ts"
 */
import * as React from 'react';
import {ModalWrapper} from '../../index';

const innerModal: React.SFC<any> = (props: any) => <h1>Hello from react</h1>;

const MyContainer = () => <ModalWrapper name="my-modal" component={innerModal} />
