import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {closeModal} from '@/redux/action/modal'
import ReactDOM from 'react-dom';
import BaseModal from './baseModal';
import {openModal} from '@/redux/action/modal'
import {CLOSE_ALL_MODAL, CLOSE_MODAL, OPEN_MODAL} from '@/redux/const';

export class ModalPortal extends PureComponent {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		close: PropTypes.func.isRequired
	}
	createEl = () => {
		this.el = document.createElement('div');
		this.el.classList.add('mj-modal');
		document.body.insertBefore(this.el, null);
	}
	removeEl = () => {
		document.body.removeChild(this.el);
	}
	renderPortal = (props) => {
		document.body.setAttribute('style', 'overflow: hidden;');
		this.createEl();
		ReactDOM.unstable_renderSubtreeIntoContainer(this, (
			<BaseModal {...props}/>
		), this.el);
	}
	unrenderPortal = () => {
		ReactDOM.unmountComponentAtNode(this.el);
		this.removeEl();
		document.getElementsByClassName('mj-modal') && document.body.setAttribute('style', 'overflow: hidden;');
	}
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
	}
	
	componentWillUnmount() {
		if (document.body.contains(this.el)) {
			this.unrenderPortal();
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen !== this.props.isOpen) {
			if (nextProps.isOpen) {
				this.renderPortal(nextProps);
			} else {
				this.unrenderPortal();
			}
		}
	}
	
	render() {
		return null;
	}
}

@connect((state) => {
	return {
		modal: state.modal
	}
}, (dispatch) => {
	return {
		openModal(option) {
			dispatch(openModal(option))
		},
		// closeAllModal() {
		// 	dispatch(closeAllModal())
		// },
		closeModal(force = false) {
			dispatch(closeModal(force))
		}
	}
})
export class ModalGroup extends PureComponent {
	static propTypes = {
		modal: PropTypes.object.isRequired
	}
	modelIndex = 0
	
	renderPortal = (props) => {
		document.body.setAttribute('style', 'overflow: hidden;');
		let el = document.createElement('div');
		el.classList.add('mj-modal');
		el.dataset.index = this.modelIndex;
		document.body.insertBefore(el, null);
		this.modelIndex ++;
		ReactDOM.unstable_renderSubtreeIntoContainer(this, (
			<BaseModal {...props}
			           modelIndex={this.modelIndex}
			           closeModal={this.props.closeModal}
			           ref={component => component && this.componentList.push({
				           el,
				           component,
				           modalType: props.modalType
			           })}/>
		), el);
		//ref 函数默认卸载默认执行
	}
	unrenderPortal = (force = false) => {
		if (this.componentList.length === 0) return
		this.modelIndex --;
		let {el, component} = this.componentList.pop();
		if (force) {
			component.modaltoBeLeave(null, () => {
				ReactDOM.unmountComponentAtNode(el);
				document.body.removeChild(el);
				document.getElementsByClassName('mj-modal') && document.body.setAttribute('style', 'overflow: hidden;');
			})
		} else {
			ReactDOM.unmountComponentAtNode(el);
			document.body.removeChild(el);
			document.getElementsByClassName('mj-modal') && document.body.setAttribute('style', 'overflow: hidden;');
		}
	}
	unrenderAllPortal = () => {
		if (!this.componentList.length) return
		let componentList = this.componentList.map(i => i).reverse();
		componentList.forEach((k, i) => {
			setTimeout(() => {
				this.props.closeModal(true);
			}, this.closePaddingTime * i)
		})
	}
	
	constructor(props) {
		super(props);
		this.componentList = [];
		this.closePaddingTime = 300;
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.modal !== this.props.modal) {
			switch (nextProps.modal.type) {
				case OPEN_MODAL:
					this.renderPortal({...nextProps.modal.builtProps, modalType: nextProps.modal.modalType});
					break;
				case CLOSE_MODAL:
					this.unrenderPortal(nextProps.modal.force);
					break;
				case CLOSE_ALL_MODAL:
					this.unrenderAllPortal();
					break;
				default:
					break;
			}
		}
	}
	
	render() {
		return null;
	}
}






