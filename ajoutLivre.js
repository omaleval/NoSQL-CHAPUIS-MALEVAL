var express = require('express');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var app = express();
var db = app.db;
var collection = db.collection('livres');
app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views')
app.use(bodyParser())

function errorHandler(err, req, res, next) {
  console.error(err.message);   console.error(err.stack);
  res.status(500);   res.render('error_template', {error: err});
}
app.use(errorHandler);

app.get('/books/', function(req, res, next) {
  res.render("ajoutLivre");
});

app.post('/books/new', function(req, res, next) {
	console.log('enter book successfully...');
	app.db.collection.insert( {
		"_isbn": request.body.isbn,
		"titre": request.body.titre,
		"auteur": request.body.auteur,
		"dateAchat": request.body.dateAchat,
		"etat": request.body.etat,
		"theme": request.body.theme,
	});
});

app.listen(8000);
console.log("Express server started on 8000");