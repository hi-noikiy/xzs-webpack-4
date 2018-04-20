// const EventName = [];
/**
 * mouse 事件特殊处理
 * 画布中触发mouseDown 注册document mousemove /mouseup
 * 任何的mouseUp事件 解绑document的 mouseup事件
 *
 * 如何触发默认的行为
 *
 * 点击的判定
 * 双击的判定
 *
 *
 *
 */


export default {
	addEventListener(ele, eventName, handler) {
		ele.addEventListener(eventName, handler, false)
	},
	removeEventListener(ele, eventName, handler) {
		ele.removeListener(eventName, handler, false)
	}
}
