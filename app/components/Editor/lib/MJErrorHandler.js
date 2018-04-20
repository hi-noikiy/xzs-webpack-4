class MJErrorHandler {
	constructor(callback) {
		this.callBack = callback;
		this.init();
	}
	
	init() {
		try {
			this.callBack();
		} catch (e) {
			/**
			 * 是否标记特殊的异常
			 */
			console.log(e)
			//处理数据上报
		}
	}
	
	uploadErrorMsg(error) {
		let {message, stack} = error;
		//结合用户 系统 浏览器 账号 其他状态 上传服务端
	}
}