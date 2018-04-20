import 'whatwg-fetch';
import isPlainObject from 'lodash/isPlainObject';

const TIMEOUT_LIMIT = 60000;

export function FetchAPI({method = 'POST', url = '', body = {}, timeout = 0, formCommit = false}) {
	return new Promise((resolve, reject) => {
		if (!isPlainObject(body)) {
			reject({
				status: -3,
				statusText: '请求参数格式异常'
			})
		} else {
			let param = void 0,
				s = [];
			if (formCommit) {   //表单提交
				param = new FormData();
				for (let k in body) {
					let v = body[k];
					if (typeof v === 'string' || typeof v === 'boolean') {
						param.append(k, v);
					} else if (isPlainObject(v) || Array.isArray(v)) {
						param.append(k, JSON.stringify(v));
					}
				}
			} else {
				for (let k in body) {
					let v = body[k];
					if (typeof v === 'string' || typeof v === 'boolean') {
						s.push(k + '=' + v);
					} else if (isPlainObject(v) || Array.isArray(v)) {
						s.push(k + '=' + JSON.stringify(v));
					}
				}
				param = s.join('&');
			}
			let request = new Request(url, Object.assign({
				method,
				headers: Object.assign({
					'xzs-v2-fetch': 'xzs-v2-fetch'
				}, formCommit ? {} : {'Content-Type': 'application/x-www-form-urlencoded'}),
				mode: 'cors',
				credentials: 'include',
				cache: 'default'
			}, method === 'GET' ? {} : {body: param}));
			fetch(request).then((response) => {
				if (response.ok && response.status === 200) {
					response.json().then((res) => {
						if (res.ok) {
							
							resolve(res.r)
						} else {
							resolve(res ? {
								status: res.c,
								statusText: res.m
							} : {
								status: -2,
								statusText: '服务未返回任何信息'
							})
						}
					});
				} else {
					reject({
						status: response.status,
						statusText: response.statusText
					})
				}
			});
			setTimeout(() => {
				reject({
					status: 'timeout',
					statusText: '请求超时'
				})
			}, timeout || TIMEOUT_LIMIT);
		}
	}).then((res) => {
		return Promise.resolve(res);
	}, (error) => {
		console.error('Fetch data error', error);
	})
};
export default fetch
