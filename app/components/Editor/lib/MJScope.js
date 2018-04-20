import {DEFAULT_CANVAS_COUNT, DEFAULT_CANVAS_PADDING, DEFAULT_LEFT_MARGIN, DEFAULT_TOP_MARGIN} from './const';
import MJCanvas from './MJCanvas';
import {setStyle} from './MJUtil';

/**
 * 默认画布设置管理的层级
 */
export default class MJScope {
	constructor(element) {
		this._element = element;
		this.layer = [];
		this._init();
		this._mouseScope = 'global';         // 'global' or 'canvas'
	}
	
	_init() {
		this._initElement();
		this._initEvent();
	}
	
	_initEvent() {
		this._element.addEventListener('contextmenu', this._contextMenuEvent, false)
	}
	
	_initElement() {
		this._element.classList.add('editor-container');
		setStyle(this._element, {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			overflow: 'auto'
		})
	}
	
	getScrollOffset() {
		return {
			x: this._element.scrollLeft,
			y: this._element.scrollTop,
		}
	}
	
	_contextMenuEvent(e) {
		e.preventDefault();
	}
	
	add(canvas) {
		if (canvas instanceof MJCanvas) {
			this._initCanvas(canvas);
		} else {
			throw new TypeError('【画布异常】:MJScope.add() 参数的非MJCanvas!')
		}
	}
	
	_initCanvas(canvas) {
		let pos = {}
		pos = {
			x: DEFAULT_LEFT_MARGIN,
			y: DEFAULT_TOP_MARGIN
		}
		if (this.layer.length === DEFAULT_CANVAS_COUNT) {
			throw new TypeError('【画布异常】:画布超过最大的设置值!')
		}
		this.layer.forEach(c => {
			pos.y += DEFAULT_CANVAS_PADDING + c.height;
		});
		this.layer.push(canvas);
		canvas._init(pos);
		canvas.renderAll();
	}
	
	setMouseScope(mouseInCanvas) {
		this._mouseScope = mouseInCanvas ? 'canvas' : 'global';
	}
	
	getMouseScope() {
		return this._mouseScope
	}
}