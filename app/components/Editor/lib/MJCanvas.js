import {
	DEFAULT_CANVAS_BACKGROUND_COLOR,
	DEFAULT_CANVAS_BORDER_COLOR,
	DEFAULT_CANVAS_HEIGHT,
	DEFAULT_CANVAS_WIDTH
} from './const';
import {setStyle} from './MJUtil';
import {MJGroup, MJImage, MJSVG, MJText} from './MJObject';
import MJEvents from './MJEvents'

/**
 * 画布内实际可操作对象为  controls控制点 或者 中间空额区域
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */




export default class MJCanvas {
	_mouseDown = (e) => {
		//针对事件的隔离
		this._dragStartPosition = {
			x: e.offsetX,
			y: e.offsetY
		};
		let target = this._findTarget(e);
		this.setActiiveObject(target);
		this.__mouseDown(target);
		//设置鼠标绘制区域
		this._scope.setMouseScope(true);
		MJEvents.addEventListener(document, 'mousemove', this._globalMouseMove);
		MJEvents.addEventListener(document, 'mouseup', this._globalMouseUp);
	}
	_mouseUp = (e) => {
		e.stopPropagation();
		this._dragMovePosition = {
			x: e.offsetX,
			y: e.offsetY
		};
		let target = this._findTarget(e);
		this.__mouseUp(e);
		document.removeEventListener('mousemove', this._globalMouseMove);
		document.removeEventListener('mouseup', this._globalMouseUp);
	}
	_mouseMove = (e) => {
		e.stopPropagation();
		this.__mouseMove(e);
	}
	_mouseLeave = (e) => {
		this.__mouseLeave(e);
	}
	_mouseEnter = (e) => {
		this.__mouseEnter(e);
	}
	//针对
	_globalMouseMove = (e) => {
		if (this._scope.getMouseScope() === 'global') {
			//当鼠标移出时 坐标系切换成 body
			console.log(e.pageX);
		}
	}
	_globalMouseUp = (e) => {
		this.__mouseUp(e);
	}
	__mouseDown = (target) => {
		if (target) {
			//设置转换初始化点位
			target._setTransform();
		}
	}
	__mouseUp = (position) => {
		document.removeEventListener('mousemove', this._globalMouseMove);
		document.removeEventListener('mouseup', this._globalMouseUp);
	}
	__mouseMove = (position) => {
	}
	__mouseLeave = (position) => {
	}
	__mouseEnter = (position) => {
	}
	
	constructor(initState, options = {objects: []}) {
		let {
			scope,
			width = DEFAULT_CANVAS_WIDTH,
			height = DEFAULT_CANVAS_HEIGHT,
			backgroundColor = DEFAULT_CANVAS_BACKGROUND_COLOR,
			borderColor = DEFAULT_CANVAS_BORDER_COLOR
		} = initState;
		this._scope = scope;    //画布附着区域
		this.offset = {         //当前画布坐标
			x: 0,
			y: 0
		};
		this.width = width;
		this.height = height;
		this.backgroundColor = backgroundColor;
		this.borderColor = borderColor;
		this._element = void 0;     //渲染的_element
		this.objects = [];
		this._isMounted = false;     //是否渲染完毕
		this._activeItem = void 0;
		this._activeGroup = void 0;
		this._dragStartPosition = void 0;
		options.objects.forEach((object) => {
			switch (object.type) {
				case 'image':
					this.objects.push(new MJImage(object));
					break;
				case 'svg':
					this.objects.push(new MJSVG(object));
					break;
				case 'text':
					this.objects.push(new MJText(object));
					break;
				case 'grop':
					this.objects.push(new MJGroup(object));
					break;
				default:
					break;
			}
		}); //绘制对象
	}
	
	//默认提供给SCOPE对象调用
	_init(pos) {
		if (!pos) {
			throw new TypeError('【画布异常】: 请设置定位坐标!');
		}
		if (!this._scope) {
			throw new TypeError('【画布异常】: 绘制区域[_scope]不存在!');
		}
		this._initElement(pos);
		this._initEvent();
		this._initObjects();
	}
	
	_initElement(pos) {
		let element = document.createElement('div');
		element.classList.add('canvas');
		this._element = element;
		this._setPosition(pos);
		this.setStyle({
			position: 'absolute',
			backgroundColor: this.backgroundColor,
			border: `solid 1px ${this.borderColor}`,
			boxSize: 'bord',
			width: this.width + 'px',
			height: this.height + 'px',
			boxSizing: 'border-box',
			overflow: 'hidden'
		});
		this._scope._element.insertBefore(element, null);
	}
	
	_initEvent() {
		MJEvents.addEventListener(this._element, 'mousedown', this._mouseDown);
		MJEvents.addEventListener(this._element, 'mouseup', this._mouseUp);
		MJEvents.addEventListener(this._element, 'mousemove', this._mouseMove);
		MJEvents.addEventListener(this._element, 'mouseleave', this._mouseLeave);
		MJEvents.addEventListener(this._element, 'mouseenter', this._mouseEnter);
	}
	
	_initObjects() {
		this._bindCanvas();
	}
	
	_bindCanvas() {
		this.objects.forEach(item => item.setCanvas(this));
	}
	
	_clearEvent() {
		MJEvents.removeEventListener(this._element, 'mousedown', this._mouseDown);
		MJEvents.removeEventListener(this._element, 'mouseup', this._mouseUp);
		MJEvents.removeEventListener(this._element, 'mousemove', this._mouseMove);
		MJEvents.removeEventListener(this._element, 'mouseleave', this._mouseLeave);
		MJEvents.removeEventListener(this._element, 'mouseenter', this._mouseEnter);
	}
	
	_findTarget(e) {
		let {path} = e,
			target = void 0,
			element = void 0;
		for (let i = 0; i <= path.length - 1; i++) {
			if (!(path[i] instanceof Window) && !(path[i] instanceof Document)&& path[i].classList.contains('item')) {
				element = path[i];
				break;
			}
		}
		if (element) {
			for (let j = this.objects.length - 1; j >= 0; j--) {
				if (element === this.objects[j]._element) {
					target = this.objects[j]
				}
			}
		}
		return target
	}
	
	setActiiveObject(item) {
		this._activeGroup = void 0;
		this._activeItem = item;
		item.set({
			active: true
		});
	}
	
	setActiiveGroup() {
	}
	
	_setPosition(pos) {
		this.offset = pos;
		this.setStyle({
			left: pos.x + 'px',
			top: pos.y + 'px'
		})
	}
	
	setStyle() {
		let newArguments = Array.from(arguments);
		newArguments.unshift(this._element);
		setStyle.apply(null, newArguments);
	}
	
	isMounted() {
		return this._isMounted;
	}
	
	renderAll() {
		if (this.isMounted()) {
			if (this._diff()) {
				/**
				 * 可能存在视图变更
				 * 1 layer 变更
				 * 2
				 */
				this.objects.forEach(item => item.render())
			}
		} else {
			this.objects.forEach(item => item.render())
			this._isMounted = true;
		}
	}
	
	_diff() {
		//针对diff逻辑
		return true;
	}
}
