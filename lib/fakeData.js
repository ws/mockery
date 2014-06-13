var flake = require('flake')

module.exports.email_array = function(size){
	var emails = []
	for(var i = 0; i < (size || flake.integer(0, 20)); i++){ emails[i] = flake.email_address() }
	return emails
}

module.exports.spam_score = function(){
	var spam_score = '0.';
	for(var i = 0; i < 3; i++){ spam_score += flake.integer(0, 9) }
	return spam_score
}

module.exports.dkim = function(email){
	return '{@' + email.split('@').pop() + ' : pass}'
}

module.exports.all = function(){

	var self = flake.email_address()
	var to = this.email_array().concat(self)
	var from = flake.email_address()
	var body = flake.body()

	var data = {
		'spam_report': 'Spam report goes here.',
		'headers': 'Headers go here.',
		'to': to.join(', '),
		'from': flake.full_name() + ' <' + from + '>',
		'envelope': '{"to":["' + self + '"],"from":"' + from + '"}',
		'subject': flake.lorem_sentence(),
		'dkim': this.dkim(from),
		'spf': 'pass',
		'spam_score': this.spam_score(),
		'sender_ip': flake.ip_address(),
		'attachments': '0', // TODO,
		'charsets': '{"to":"UTF-8","html":"UTF-8","subject":"UTF-8","from":"UTF-8","text":"UTF-8"}',
		'html': body.html,
		'text': body.plaintext
	}

	return data

}