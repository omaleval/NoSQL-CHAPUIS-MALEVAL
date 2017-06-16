var express = require('express');
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var app = express();
var db = app.db;
app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views')
app.use(bodyParser())

function errorHandler(err, req, res, next) {
	console.error(err.message);   console.error(err.stack);
	res.status(500);   
	res.render('error_template', {error: err});
}
app.use(errorHandler);

app.get('/books', function(req, res, next) {
	app.db.collection("livres").find().toArray(function (error, results) {
        if (error) throw error;
	console.log(results);
	res.render("listeLivres", {'livres': results});
	})
});

app.get('/books/:id', function(req, res, next) {
	app.db.collection("livres").find({_id: new ObjectId(req.params.id)}).toArray(function (error, results) {
        if (error) throw error;
	console.log(results);
	res.render("livre", {'livre': results[0]});
	})
});

app.get('/booksform/', function(req, res, next) {
	res.render("ajoutLivre");
});

 app.get('/books/delete/:id', function(req, res, next) {
	app.db.collection("livres").remove({_id: new ObjectId(req.params.id)});
	console.log('delete book successfully...');
	res.redirect("/books");
}); 

app.post('/books/new', function(req, res, next) {
	console.log('enter book successfully...');
	app.db.collection("livres").insert( {
		"_isbn": req.body.isbn,
		"titre": req.body.titre,
		"auteur": req.body.auteur,
		"dateAchat": req.body.dateAchat,
		"etat": req.body.etat,
		"theme": req.body.theme,
	});
	app.db.collection("livres").find().toArray(function (error, results) {
        if (error) throw error;
	console.log(results);
	res.redirect("/books");
	});
});


MongoClient.connect('mongodb://localhost:27017/tpnosql', function(err, db) {
	console.log(err);
	app.db = db;
	app.listen(8000);
	console.log("Express server started on 8000");
});