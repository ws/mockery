var Promise = require('bluebird')

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

	return new Promise(function(resolve, reject){

		var options = url.parse(self.opts.url)
		options.boundary = self.opts.boundary

		var request = new multiparter.request(http, options)

		for (var k in data){
			if (data.hasOwnProperty(k)) {
				var v = data[k]
				request.setParam(k, v)
			}
		}

		request.send(function(error, response) {

			if(error){ reject(error) }

			else {
				var data = ''
				response.setEncoding('utf8')

				response.on('data', function(chunk) { data += chunk })
				response.on('end', function(chunk) { resolve() })
				response.on('error', function(err){ reject(err) })
			}
		})


	})

}

module.exports = mockery