var Q = require('q')

var multiparter = require('multiparter')
var http = require('http')
var url = require('url')

var self = this

var mockery = function(args){

	self.opts = {}

	self.opts.url = args.url

	self.opts.count = args.count || 1
	self.opts.boundary = args.boundary || 'xYzZY'

}

mockery.prototype.makeRequest = function(data) {

	var deferred = Q.defer()

	var options = url.parse(self.opts.url)
	options.boundary = self.opts.boundary
	options.headers = {'User-Agent': 'SendGrid 1.0'}
	options.method = 'POST'

	var request = new multiparter.request(http, options)

	for (var k in data){
		if (data.hasOwnProperty(k)) {
			var v = data[k]
			request.setParam(k, v)
		}
	}

	request.send(function(error, response) {

		if(error){ deferred.reject(error) }

		else {
			var data = ''
			response.setEncoding('utf8')

			response.on('data', function(chunk) { data += chunk })
			response.on('end', function(chunk) { deferred.resolve() })
			response.on('error', function(err){ deferred.reject(err) })
		}
	})

	return deferred.promise

}

module.exports = mockery
