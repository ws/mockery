var Q = require('q')
var config = require('nconf').argv().env().file({ file: 'config.json' })

var Mockery = require('./lib/mockery.js')
var fakeData = require('./lib/fakeData.js')

config.defaults({
	'count': 1,
	'boundary': 'xYzZY',
	'retries': 5
})

var mockery = new Mockery({
	'url': config.get('url'),
	'count': config.get('count'),
	'boundary': config.get('boundary')
})

var promises = []
for(var i = 1; i <= config.get('count'); i++){ promises.push(mockery.makeRequestAndRetry(fakeData.all(), config.get('retries'))) }

Q.all(promises)
	.fin(function(){
		console.log('Success.')
	})
	.catch(function(err){
		console.log(err)
	})