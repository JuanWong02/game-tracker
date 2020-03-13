var express = require('express');
var router = express.Router();

const { Game } = require('./../models/game');

/* GET games listing. */
router.get('/', function (req, res, next) {

    //let games = [
    //   {name: 'Uncharted 4'},
    //  {name: 'Minecraft'},
    //{name: 'The Last of Us'}
    // ]

    Game.findAll()
        .then((games) => {
            res.render('games/index', {
                games: games
            });
        })
        .catch((err) => {
            console.error('Error trying to query games: ', err);
            res.render('games/index', {
                games: []
            });
        });

    console.log('games');

});
router.post('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Game.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/games/');
    })
});
//GET games/create
router.get('/create', (req, res, next) => {
    console.log(req.query);

    res.render('games/form');
});
router.post('/create', (req, res, next) => {
    console.log(req.body);

    let name = req.body.name;

    if (name === undefined || name === null || name === ''){
       return  res.render('games/form',{errorMessage: 'Please type a valid name.'});
    }

    let game = {
        name,
    };
    //Crear nuevo game y guardar en la base de datos
    Game.create(game)
    //caso exito
    .then(() => {
        res.redirect('/games');
    })
    //caso error
    .catch((err) => {
        console.error('Error trying to create Game',err);
        //volver a enviar formulario como HTML
        res.render('games/form');
    });

    //res.send('hola');
});

module.exports = router;
