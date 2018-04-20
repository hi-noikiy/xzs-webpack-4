import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, {createFactory, PureComponent} from 'react';
import ToolTipBase from './toolTipBase';

const ToolTipRoot = document.getElementById('tool-tip');
const Portal = createFactory(ToolTipBase);
/**
 * 有必要 结合 Modal操作
 */
export default class ToolTip extends PureComponent {
	static propTypes = {
		id: PropTypes.string.isRequired
	}
	/**
	 * 静态方法 打开一个ToolTips
	 */
	static show = () => {
	}
	/**
	 * 静态方法 关闭所有的ToolTips
	 */
	static hide = () => {
	}
	/**
	 * 根据id查询当前的 toolTip
	 * @param id
	 * @returns {Array}
	 */
	getTargetArray = (id) => {
		let targetArray = void 0;
		if (!id) {
			targetArray = document.querySelectorAll('[data-tip]:not([data-for])');
		} else {
			let escaped = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
			targetArray = document.querySelectorAll('[data-tip][data-for="' + escaped + '"]');
		}
		// targetArray is a NodeList, convert it to a real array
		return Array.from(targetArray)
	}
	bindListener = () => {
		const {id} = this.props;
		this.targetArray = this.getTargetArray(id);
		this.targetArray.forEach((target) => {
			target.addEventListener('mouseenter', this.showToolTip, false);
			// target.addEventListener('mouseover', this.updateToolTip, false);
			target.addEventListener('mouseleave', this.hideToolTip, false);
		});
	}
	unBindListener = () => {
		this.targetArray.forEach((target) => {
			target.removeEventListener('mouseenter', this.showToolTip);
			// target.removeEventListener('mouseover', this.updateToolTip);
			target.removeEventListener('mouseleave', this.hideToolTip);
		});
	}
	renderPortal = (props, callback) => {
		ReactDOM.unstable_renderSubtreeIntoContainer(this, Portal(props), ToolTipRoot, callback);
	}
	unmountPortal = () => {
		ReactDOM.unmountComponentAtNode(ToolTipRoot);
	}
	showToolTip = (e) => {
		let obj = e.target.getBoundingClientRect();
		// console.log(obj);
		this.renderPortal({
			children: this.props.children || e.target.dataset.tip
		}, () => {
			this.updateToolTip(e);
		})
	}
	updateToolTip = (e) => {
		if (!ToolTipRoot.children.length) {
			return
		}
		let position = this.getPosition(e);
		this.renderPortal({
			pos: position.pos,
			direction: position.direction,
			children: this.props.children || e.target.dataset.tip
		})
	}
	hideToolTip = (e) => {
		this.unmountPortal();
	}
	/**
	 * 检测规则 针对窗口是否越边
	 * 获取toolTip 实际定位位置
	 * @param e
	 * @returns {{pos: {left: *, top: Window}, direction: string}}
	 */
	getPosition = (e) => {
		let top = 0,
			left = 0,
			direction = 'top',
			spaceWidth = 20,        //间隔区域
			eventTargetRect = e.target.getBoundingClientRect();
		let {clientWidth: tipClientWidth, clientHeight: tipClientHeight} = ToolTipRoot.children[0];
		let centerPoient = {
			top: eventTargetRect.top + eventTargetRect.height / 2,
			left: eventTargetRect.left + eventTargetRect.width / 2
		};
		/**
		 * 默认四组合位置
		 * @type {{top: {left: number, top: number}}}
		 */
		let defaultPoint = {
			top: {
				left: centerPoient.left - tipClientWidth / 2,
				top: eventTargetRect.top - tipClientHeight - spaceWidth
			},
			left: {
				left: eventTargetRect.left - tipClientWidth - spaceWidth,
				top: centerPoient.top - tipClientHeight / 2
			},
			right: {
				left: eventTargetRect.left + eventTargetRect.width + spaceWidth,
				top: centerPoient.top - tipClientHeight / 2
			},
			bottom: {
				left: centerPoient.left - tipClientWidth / 2,
				top: eventTargetRect.top + eventTargetRect.width + spaceWidth
			}
		};
		['left', 'top', 'bottom', 'right'].forEach((space) => {
			Object.assign(defaultPoint[space], {
				right: defaultPoint[space].left + tipClientWidth,
				bottom: defaultPoint[space].top + tipClientHeight
			});
		});
		direction = 'top';
		if (!getPosition(defaultPoint['top'])) {    // top
			direction = 'left';
		} else {
			left = defaultPoint.top.left;
			top = defaultPoint.top.top;
			direction = 'top';
		}
		if (direction === 'left') {                 // left
			if (!getPosition(defaultPoint['left'])) {
				direction = 'right';
			} else {
				left = defaultPoint[direction].left;
				top = defaultPoint[direction].top;
			}
		}
		if (direction === 'right') {                 // right
			if (!getPosition(defaultPoint['right'])) {
				direction = 'bottom';
			} else {
				left = defaultPoint[direction].left;
				top = defaultPoint[direction].top;
			}
		}
		if (direction === 'bottom') {                 //bottom
			if (!getPosition(defaultPoint['bottom'])) {
				direction = 'top';
			} else {
				left = defaultPoint[direction].left;
				top = defaultPoint[direction].top;
			}
		}
		
		function getPosition(position) {
			return position.left > 0 && position.top > 0 && position.bottom < window.innerHeight && position.right < window.innerWidth
		}
		
		return {
			pos: {
				left,
				top
			},
			direction
		}
	}
	
	constructor(props) {
		super(props);
		this.state = {
			direction: {},
			pos: {},
			targetArray: []
		}
	}
	
	componentDidMount() {
		this.bindListener();
	}
	
	componentWillReceiveProps() {
	}
	
	componentWillUnmount() {
	}
	
	render() {
		return null
	}
}