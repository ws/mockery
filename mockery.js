var multiparter = require('../multiparter/index.js')
var http = require('http')
var Faker = require('faker')
var dimsum = require('dimsum')
var config = require('nconf').argv().env().file({ file: 'config.json' });

config.defaults({
	'count': 1,
	'boundary': 'xYzZY'
})

var hitError = false;

var opts = { 'url': config.get('url'), 'boundary': config.get('boundary') }

for(var i = 0; i < parseInt(config.get('count')) && hitError == false; i++){

	var params = getParameters()

	makeRequest(opts, params, function(err){
		if(err){
			console.log(err);
			hitError = true;
		}
		else { console.log('Test ' + i + ' succeeded') }
	})

}

function makeRequest(options, params, cb){

	var request = new multiparter.request(http, options);

	for (var k in params){
	    if (params.hasOwnProperty(k)) {
	    	var v = params[k];
	    	request.setParam(k, v);
	    }
	}

	request.send(function(error, response) {

		if(error){ reject(error); }
		else {
			var data = '';
			response.setEncoding('utf8');

			response.on('data', function(chunk) {
				data += chunk;
			})

			response.on('end', function(chunk) {
				cb(null);
			})

			response.on('error', function(err){

			});
		}

	})

}

function fakeEmail(){
	var email = Faker.Internet.email();
	return {
		email: email,
		domain: email.split('@')[1]
	}
}

function fakeBody(format, paragraphs){
	return dimsum(paragraphs, { format: format });
}

http://www.xinotes.net/notes/note/341/
function rPad(e,t,n){if(!e||!t||e.length>=n){return e}var r=(n-e.length)/t.length;for(var i=0;i<r;i++){e+=t}return e}

function fakeSpamScore(){
	var score = Math.round(Math.random() * 1000) / 1000 + '';
	return rPad(score, '0', 5)
}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBool(){
	return (Math.random()<.5);
}

function getParameters(){

	var params = {};

	var from = fakeEmail();
	var to = 'test@example.com';

	params.to = to;
	params.from = Faker.Name.findName() + ' <' + from.email + '>';
	params.envelope = '{"to":["' + to + '"],"from":"' + from.email + '"}';
	params.subject = Faker.Lorem.sentence();
	params.dkim = '{@' + from.domain + ' : pass}';
	params.spf = 'pass';
	params.spam_score = fakeSpamScore();
	params.spam_report = 'This isn\'t a real spam report.'; // TODO
	params.sender_ip = Faker.Internet.ip();
	params.attachments = '0'; // I don't feel like dealing with faking this right now.
	params.headers = 'These aren\'t real headers.'; // I don't feel like dealing with faking this right now.
	params.charsets = '{"to":"UTF-8","html":"UTF-8","subject":"UTF-8","from":"UTF-8","text":"UTF-8"}';

	if(randomBool()){
		params.text = fakeBody('text', randomInt(3, 7))
	}
	else {
		params.html = fakeBody('html', randomInt(3, 7))
	}

	return params;

}