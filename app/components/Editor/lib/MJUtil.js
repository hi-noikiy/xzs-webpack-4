import isPlainObject from 'lodash/isPlainObject'

/**
 * 方法级和优先的函数
 * @type {{}}
 */
export function setStyle(element) {
	switch (arguments.length) {
		case 2:
			let options = arguments[1];
			if (isPlainObject(options)) {
				for (let key in options) {
					element.style[key] = formatValue(key, options[key]);
				}
			}
			break;
		case 3:
			let key = arguments[1],
				value = arguments[2];
			element.style[key] = formatValue(key, value);
			break;
		default:
			break;
	}
	
	function formatValue(key, value) {
		if (key === 'ZIndex') {
			return value
		}
		if (typeof value === 'number') {
			return value + 'px';
		}
		return value
	}
}


