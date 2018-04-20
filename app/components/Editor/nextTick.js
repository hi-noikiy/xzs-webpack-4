/**
 * nextTick 针对 渲染优化
 *  基于队列操作 可异步的队列中 更雨浏览器特性的支持 考虑优先的执行
 *  MessageChannel 执行速度 > setTimeout(,0)
 *
 *
 */
let microTimerFunc,
	macroTimerFunc,
	useMacroTask = false;

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	macroTimerFunc = function () {
		setImmediate(flushCallbacks);
	};
} else if (typeof MessageChannel !== 'undefined' && (
		isNative(MessageChannel) ||
		// PhantomJS
		MessageChannel.toString() === '[object MessageChannelConstructor]'
	)) {
	var channel = new MessageChannel();
	var port = channel.port2;
	channel.port1.onmessage = flushCallbacks;
	macroTimerFunc = function () {
		port.postMessage(1);
	};
} else {
	macroTimerFunc = function () {
		setTimeout(flushCallbacks, 0);
	};
}


if (typeof Promise !== 'undefined' && Promise.toString() === 'function Promise() { [native code] }') {
	var p = Promise.resolve();
	microTimerFunc = function () {
		p.then(flushCallbacks);
		if (isIOS) { setTimeout(noop); }
	};
} else {
	microTimerFunc = macroTimerFunc;
}

function withMacroTask (fn) {
	return fn._withTask || (fn._withTask = function () {
		useMacroTask = true;
		var res = fn.apply(null, arguments);
		useMacroTask = false;
		return res
	})
}

function nextTick (cb, ctx) {
	let _resolve;
	callbacks.push(function () {
		if (cb) {
			try {
				cb.call(ctx);
			} catch (e) {
				handleError(e, ctx, 'nextTick');
			}
		} else if (_resolve) {
			_resolve(ctx);
		}
	});
	if (!pending) {
		pending = true;
		if (useMacroTask) {
			macroTimerFunc();
		} else {
			microTimerFunc();
		}
	}
	if (!cb && typeof Promise !== 'undefined') {
		return new Promise(function (resolve) {
			_resolve = resolve;
		})
	}
}
