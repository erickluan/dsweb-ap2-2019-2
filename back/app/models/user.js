// modelo
console.log('carregando models/user.js');

var mongoose = require('mongoose');

module.exports = function () {
	console.log('definição de modelo User.')
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		},
		username: {
			type: String,
			index: true,
			unique: true,
			dropDups: true,
			required: true,
		},
		password: { //salted and hashed using bcrypt
			type: String,
			required: true,
		},
	});
	return mongoose.model('User', schema);

};
