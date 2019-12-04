// rotas
module.exports = function(app) {
	var controller = app.controllers.livro;

	app.get('/livros', controller.retornaLivros);
	app.get('/livros/:isbn', controller.retornaLivro);
	app.post('/livros', controller.salva);
	app.delete('/livros/:isbn', controller.deleta);
}