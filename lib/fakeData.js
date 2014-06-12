var Faker = require('faker')
var dimsum = require('dimsum')

module.exports.emailAddress = function(){ return Faker.Internet.email().toLowerCase() }
module.exports.name = function(){ return Faker.Name.findName() }
module.exports.subject = function() { return Faker.Lorem.sentence() }
module.exports.spamReport = function() { return 'SPAM REPORT' } // TODO
module.exports.headers = function() { return 'HEADERS' } // TODO
module.exports.ip = function() { return Faker.Internet.ip() }
module.exports.htmlBody = function() { return dimsum(randomInt(3, 7), { format: 'html' }) }
module.exports.textBody = function() { return dimsum(randomInt(3, 7), { format: 'text' }) }

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
		'html': this.htmlBody(),
		'text': this.textBody()
	}

	return data

}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function dkim(email){
	return '{@' + email.split('@').pop() + ' : pass}'
}

// xinotes.net/notes/note/341
function rPad(e,t,n){if(!e||!t||e.length>=n){return e}var r=(n-e.length)/t.length;for(var i=0;i<r;i++){e+=t}return e}