import PropTypes from 'prop-types';
import React, {createFactory, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {ReactModal} from './index';
import BaseModal from './baseModal';

const modalRoot = document.getElementById('modal');
const Portal = createFactory(BaseModal);
export default class ModalPortal extends PureComponent {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		close: PropTypes.func.isRequired
	}
	
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	}
	
	componentDidMount() {
		if (this.props.open) {
			modalRoot.appendChild(this.el);
		}
	}
	
	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.open !== this.props.open) {
			if (nextProps.open) {
				modalRoot.appendChild(this.el);
			} else {
				modalRoot.removeChild(this.el);
			}
			console.log('121');
		}
	}
	
	render() {
		return ReactDOM.createPortal(
			<BaseModal close={this.props.close}>{this.props.children}</BaseModal>,
			this.el,
		);
	}
}