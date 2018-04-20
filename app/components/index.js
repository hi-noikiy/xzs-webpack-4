import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ModalGroup} from './modal';
import {openModal} from '@/redux/action/modal'
// import ModalPortal from './modal/portal';
import ToolTipDemo from './toolTipDemo';

@connect(null, (dispatch) => {
	return {
		openModal: (option) => {
			dispatch(openModal(option));
		}
	}
})
export default class Index extends PureComponent {
	state = {
		isOpen: false,
		isOpen2: false,
		count: 0,
		value: '默认',
		showTask: false
	}
	
	componentDidMount() {
		// FetchAPI({
		// 	// url: './mock/friends.json',
		// 	url: '/api/login/helloworld',
		// 	body: {
		// 		c: {a: 1},
		// 		aaaa: 'a122',
		// 		asdaaa: false
		// 	},
		// 	formCommit: true
		// 	// method: 'GET'
		// }).then((r) => {
		// 	console.log(121)
		// })
	}
	
	render() {
		return (
			<div className="aacc" onClick={() => {
				console.log('点击protal');
			}}>
				<div onClick={(e) => {
					e.stopPropagation();
					this.props.openModal({
						modalType: 'aaa',
						builtProps: {
							beforeEnter: () => {
								console.log('beforeEnter');
							},
							afterEnter: () => {
								console.log('afterEnter');
							},
							beforeLeave: (payload) => {
								console.log('beforeLeave', payload);
							},
							afterLeave: () => {
								console.log('afterLeave');
							},
						}
					})
					setTimeout(() => {
						this.props.openModal({
							modalType: 'bbb',
							builtProps: {
								wrapperHeight: 200,
								wrapperWidth: 500,
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
					}, 1000)
				}}>开关modal
				</div>
				{
					this.state.showTask ? (
						<div ref={el => {
							this.el = el
						}}>asdasd</div>
					) : null
				}
				
				{/*<ModalPortal isOpen={this.state.isOpen}*/}
				{/*close={() => {*/}
				{/*this.setState({isOpen: false})*/}
				{/*}}*/}
				{/*>*/}
				{/*<TestTime close={() => {*/}
				{/*this.setState({isOpen: false})*/}
				{/*}}/>*/}
				{/*</ModalPortal>*/}
				<ModalGroup/>
				<ToolTipDemo/>
				{/*<SortablePage />*/}
			</div>
		)
	}
};

