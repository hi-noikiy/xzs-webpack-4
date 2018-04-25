const http = require('http');

const options = {
	host: '127.0.0.1',
	path: 'http://app.meijian.io/',
};

http.get(options, (res) => {
	res.pipe(process.stdout);
});