require('lodash/date')
console.log('bbb');

require.ensure([], (require)=>{
	require('./c')
	
	
	Promise.resolve('aabbcc')
})