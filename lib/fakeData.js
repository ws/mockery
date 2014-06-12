var Faker = require('faker')

module.exports.emailAddress = function(){ return Faker.Internet.email().toLowerCase() }
module.exports.name = function(){ return Faker.Name.findName() }
module.exports.subject = function() { return Faker.Lorem.sentence() }
module.exports.spamReport = function() { return 'SPAM REPORT' } // TODO
module.exports.headers = function() { return 'HEADERS' } // TODO
module.exports.ip = function() { return Faker.Internet.ip() }
module.exports.body = function() { 

	var b = []
	for(var i = 0; i < randomInt(2, 10); i++){
		var p = ''
		for(var k = 0; k < randomInt(5, 30); k++){ p += sentence() + ' ' }
		b.push(p)
	}

	var html = b.map(function(q){ return '<p>' + q + '</p>' }).join('')
	var text = b.map(function(q){ return q + '\n\n' }).join('')

	return {
		'html': html,
		'text': text
	}

}

module.exports.spamScore = function(){
	var score = Math.round(Math.random() * 1000) / 1000 + ''
	return rPad(score, '0', 5)
}

module.exports.attachments = function(){ // TODO
	return {
		'count': 0
	}
}

module.exports.emailArray = function(size){

	var s = size ? size : randomInt(0, 20)

	var emails = []
	for(var i = 0; i < s; i++){
		emails[i] = this.emailAddress()
	}
	return emails

}

module.exports.all = function(){

	var self = this.emailAddress()
	var to = this.emailArray().concat(self)
	var from = this.emailAddress()
	var body = this.body()

	var data = {
		'spam_report': 'Spam report goes here.',
		'headers': 'Headers go here.',
		'to': to.join(', '),
		'from': this.name() + ' <' + from + '>',
		'envelope': '{"to":["' + self + '"],"from":"' + from + '"}',
		'subject': this.subject(),
		'dkim': dkim(from),
		'spf': 'pass',
		'spam_score': this.spamScore(),
		'sender_ip': this.ip(),
		'attachments': '0', // TODO,
		'charsets': '{"to":"UTF-8","html":"UTF-8","subject":"UTF-8","from":"UTF-8","text":"UTF-8"}',
		'html': body.html,
		'text': body.text
	}

	return data

}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function dkim(email){
	return '{@' + email.split('@').pop() + ' : pass}'
}

function sentence(){
	var endings = ['.', '!', '?']
	var s = Faker.Lorem.sentence()
	return s.charAt(0).toUpperCase() + s.slice(1) + endings[randomInt(0, 2)]
}

// xinotes.net/notes/note/341
function rPad(e,t,n){if(!e||!t||e.length>=n){return e}var r=(n-e.length)/t.length;for(var i=0;i<r;i++){e+=t}return e}