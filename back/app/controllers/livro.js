const passport = require('passport');

module.exports = function (app) {

	console.log('model: ' + app);

	let Livro = app.models.livro;

	let controller = {};

	controller.salva = function (req, res) {
		verificaJWT(req, res, function () {
			console.log("Deu certo");
			let livro = new Livro({
				autor: req.body.autor,
				anoPublicacao: req.body.anoPublicacao,
				titulo: req.body.titulo,
				isbn: req.body.isbn
			});
			console.log('adicionar: ' + livro);

			livro.save(function (err) {
				if (err) {
					console.log(err);
				}
				res.send('Livro adicionado.');
			});
		});

	};

	controller.retornaLivro = function (req, res) {
		verificaJWT(req, res, function () {
			console.log("Retorna Livro");
			Livro.findById(req.params.id)
				.then((data) => {
					res.json(data);
				})
				.catch((err) => {
					console.log(err);
				})
		});
	};

	controller.deleta = function (req, res) {
		verificaJWT(req, res, function () {
			Livro.findByIdAndRemove(req.params.id, function (err) {
				if (err) return next(err);
				Livro.find()
					.then((data) => {
						res.json(data);
					})
					.catch((err) => {
						console.log(err);
					})
			})
		});
	};

	controller.retornaLivros = function (req, res) {
		verificaJWT(req, res, function () {
			console.log("Retorna Livros")
			Livro.find()
				.then((data) => {
					res.json(data);
				})
				.catch((err) => {
					console.log(err);
					res.status(403).send({
						success:false,
						message:err
					})
				})
		});
	};

	verificaJWT = function (req, res, executar) {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (err) {
				console.log('err:' + err);
				res.status(403).send({
					success:false,
					message:err
				})				
			}
			if (info !== undefined) {
				console.log('info: ' + info.message);
				res.status(403).send({
					success:false,
					message:info.message
				})
			} else {
				executar();
			}
		})(req, res);
	}

	return controller;
};