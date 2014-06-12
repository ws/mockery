var Promise = require('bluebird')
var config = require('nconf').argv().env().file({ file: 'config.json' })

var Mockery = require('./lib/mockery.js')
var fakeData = require('./lib/fakeData.js')

config.defaults({
	'count': 1,
	'boundary': 'xYzZY'
})

var mockery = new Mockery({
	'url': config.get('url'),
	'count': config.get('count'),
	'boundary': config.get('boundary')
})

var promises = [];
for(var i = 0; i < config.get('count'); i++){ promises.push(mockery.makeRequest(fakeData.all())) }

Promise.all(promises)
	.then(function(){
		console.log('Success!')
	})
	.catch(function(err){
		console.log(err)
	})