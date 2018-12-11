var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.use(morgan('combined')) //Active le middleware de logging
.use(express.static(__dirname + '/public')) //indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) //active la favicon indiquée
/*.use(function(req, res){
    res.send('Hello bruh');
  
})  */
;

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
})

.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
})

.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hé ho, c\'est privé ici !');
})

.get('/etage/:etagenum/chambre/:chambrenum', function(req, res) {
    res.setHeader('Content-type', 'text/plain');
    res.send('Etage n° ' + req.params.etagenum + ' chambre n° ' + req.params.chambrenum);
})
//route dynamique

.get('/etage/:etagenum/chambre', function(req, res){
    res.render('chambre.ejs', {etage: req.params.etagenum});
})
//La balise<%= etage %>sera remplacée par la variable etage que l'on a transmise au template avec {etage: req.params.etagenum}!

.get('/compter/:nombre', function(req, res){
    var noms = ["Robert", "Jean", "Philippe", "Kevin"];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
})

.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);