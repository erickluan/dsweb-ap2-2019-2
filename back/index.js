// carregamento de módulos
var app = require('./config/express')();

require('./config/passport');

require('./config/database')('mongodb://localhost/db_ap2');

// inicialização do servidor
app.listen(app.get('port'), function() {
	console.log('Servidor funcionando na porta ' + app.get('port'));
});
