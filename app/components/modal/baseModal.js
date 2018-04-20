import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import withCss from '@/withCss';
import styles from './modal.less';
import Footer from './footer';
import {connect} from 'react-redux';
import {closeAllModal, openModal} from '@/redux/action/modal';
@withCss(styles)
export default class BaseModal extends PureComponent {
	static props = {
		closeModal: PropTypes.func.isRequired,
		wrapperHeight: PropTypes.number,
		wrapperWidth: PropTypes.number,
		beforeEnter: PropTypes.func,
		afterEnter: PropTypes.func,
		beforeLeave: PropTypes.func,
		afterLeave: PropTypes.func,
		autoOverflow: PropTypes.boolean
	}
	static defaultProps = {
		beforeEnter: new Function(),
		afterEnter: new Function(),
		beforeLeave: new Function(),
		afterLeave: new Function(),
		wrapperHeight: 400,
		wrapperWidth: 400,
		autoOverflow: true
	}
	modaltoBeEnter = () => {
		this.setState({className: 'enter'}, () => {
			this.props.beforeEnter();
		});
		setTimeout(() => {
			this.setState({className: 'enter enter-active'});
			setTimeout(() => {
				this.props.afterEnter();
			}, this.enterTime)
		}, 0)
	}
	modaltoBeLeave = (payload, callback) => {
		this.setState({className: 'leave'}, () => {
			this.props.beforeLeave(payload);
		});
		setTimeout(() => {
			this.setState({className: 'leave leave-active'});
			setTimeout(() => {
				if (callback) {
					callback();     //用于全部阶段的触发
				} else {
					this.props.closeModal();
					this.props.afterLeave(); //是否触发
				}
			}, this.leaveTime)
		}, 0)
	}
	
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			enter: false,
			leave: false,
			className: ''
		}
		this.enterTime = 500;
		this.leaveTime = 300;
	}
	
	componentDidMount() {
		this.modaltoBeEnter();
	}
	
	componentWillUnmount() {
		// console.log('modelIndex', this.props.modelIndex);
	}
	
	render() {
		let {className} = this.state,
			{wrapperHeight, wrapperWidth} = this.props;
		return (
			<section styleName="modal-wrapper">
				<div styleName={`mask ${className}`}/>
				<div styleName={`modal ${className}`} style={{
					width: wrapperWidth,
					height: wrapperHeight
				}}>
					<div styleName="content">
						{
							this.props.children || '当前拼图内无内容'
						}
						{
							<TestTime modaltoBeLeave={this.modaltoBeLeave} modalType={this.props.modalType}
							          modelIndex={this.props.modelIndex}/>
						}
					</div>
					<Footer close={() => {
						this.modaltoBeLeave();
					}}/>
				</div>
			</section>
		)
	}
}

@connect(null, (dispatch) => {
	return {
		openModal: (option) => {
			dispatch(openModal(option));
		},
		closeAllModal: () => {
			dispatch(closeAllModal());
		}
	}
})
class TestTime extends PureComponent {
	static props = {
		modaltoBeLeave: PropTypes.func.isRequired
	}
	
	componentWillMount() {
		console.log('与加载componentWillMount componentWillMount')
	}
	
	componentWillUnmount() {
		console.log('卸载componentWillUnmount componentWillUnmount', this.props.modelIndex)
	}
	
	componentDidMount() {
		console.log('加载完毕 componentDidMount componentDidMount')
	}
	
	render() {
		return (
			<div style={{fontSize: 20}}>
				<span onClick={() => {
					this.props.modaltoBeLeave('我的内容 我的payload')
				}}>关闭 关闭</span>
				
				<div onClick={() => {
					this.props.openModal({
						modalType: 'ccc',
						builtProps: {
							beforeEnter: () => {
								console.log('beforeEnter 222222');
							},
							afterEnter: () => {
								console.log('afterEnter 22222');
							},
							beforeLeave: (payload) => {
								console.log('beforeLeave 22222', payload);
							},
							afterLeave: () => {
								console.log('afterLeave 22222');
							},
						}
					})
				}}> 打开二级的dom
				</div>
				
				<br/>
				<div onClick={this.props.closeAllModal}>
					关闭全部
				</div>
			</div>
		)
	}
}