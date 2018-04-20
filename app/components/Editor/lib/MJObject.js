import {setStyle} from './MJUtil';

export class MJObject {
	constructor(props) {
		let {
			top = 0,
			left = 0,
			width = 300,
			height = 300,
			angle = 0,
			flipX = false,
			flipY = false,
			scaleX = 1,
			scaleY = 1
		} = props;
		this.top = top;
		this.left = left;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.flipX = flipX;     //scaleY(-1)
		this.flipY = flipY;     //scaleY(-1)
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.element = void 0;
		this._meijian = {};     //美间特殊字段处理
		this._isMounted = false;
		this.canvas = void 0;
		this.active = false;    //是否被选中
	}
	
	setCanvas(canvas) {
		this.canvas = canvas;
	}
	
	init() {
	}
	
	toJson() {
		let {top, left, width, height, angle, flipX, flipY, scaleX, scaleY} = this;
		return {top, left, width, height, angle, flipX, flipY, scaleX, scaleY}
	}
	
	/**
	 * 操作之前设置原始的数据
	 * @private
	 */
	_setTransform(){
		this._originalTransform = {
			top: this.top,
			left: this.left,
			width: this.width,
			height: this.height
		}
	}
	
	
	isMounted() {
		return this._isMounted
	}
	
	setMounted() {
		this._isMounted = true
	}
	
	render() {
	}
	
	
	createItemElement (){
		let element = document.createElement('div'),
			innerEl = document.createElement('div');
		element.classList.add('item');
		innerEl.classList.add('inner');
		setStyle(element , {
			position: 'absolute'
		})
		setStyle(innerEl, {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			pointerEvents: 'none'
		})
		element.appendChild(innerEl);
		return element;
	}
	
	set(options){
		for (let key in options){
			this[key] = options[key];
		}
	}
	
	//内置 绘制对比 渲染
	_diff() {
		//针对美间字段diff
	}
}

export class MJImage extends MJObject {
	constructor(props) {
		super(props);
		this._element = void 0;
		this._img = void 0;
		this.src = props.src;
	}
	
	create() {
		let element = super.createItemElement(),
			img = new Image();
		img.src = 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1416655192.jpg';   //伪造的数据
		img.style.width = '100%';
		img.style.height = '100%';
		img.draggable = false;
		element.children[0].appendChild(img);
		this._element = element;
		this._img = img;
		setStyle(this._element, {
			width: this.width,
			height: this.height
		})
	}
	
	render() {
		super.render();
		if (!super.isMounted()) {
			this.create();
			// this.canvas.add(this);
			this.canvas._element.appendChild(this._element);
			super.setMounted();
		}
	}
}

export class MJSVG extends MJObject {
	constructor(props) {
		super(props)
	}
	
	render() {
	}
}

export class MJText extends MJObject {
	constructor(props) {
		super(props)
	}
	
	render() {
	}
}

export class MJGroup extends MJObject {
	constructor(props) {
		super(props)
	}
	
	render() {
	}
}




