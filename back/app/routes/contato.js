// rotas
module.exports = function(app) {
	var controller = app.controllers.contato;

	app.get('/contatos', controller.contatos);
	app.get('/contatos/:id', controller.retorna_contato);
	app.post('/contatos', controller.novo_salva);
	app.put('/contatos/:id', controller.atualiza);
	app.delete('/contatos/:id', controller.deleta);
}