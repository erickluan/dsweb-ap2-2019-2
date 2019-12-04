// modelo
console.log('carregando models/livro.js');

var mongoose = require('mongoose');

module.exports = function () {
    console.log('definição de modelo Livro.')
    var schema = mongoose.Schema({
        autor: {
            type: String,
            required: true
        },
        anoPublicacao: {
            type: Number,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }
    });
    return mongoose.model('Livro', schema);

};
