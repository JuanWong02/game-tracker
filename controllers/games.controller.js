const { Game } = require('./../models/game');

let controller = {};

    controller.read = function(req, res, next) {
        
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

};
controller.delete = (req, res, next) => {
    let id = req.params.id;
    //DELETE FROM games WHERE id=4;
    Game.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/games/');
    }).catch((err) => {
        console.error('Error trying to delete Game',err);
        res.redirect('/games/');
    })
};
controller.create = (req, res, next) => {
    console.log(req.query);

    res.render('games/form', {
        title: 'Create Game',
        action: 'create'
    });
};
controller.createPost = (req, res, next) => {
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
};
controller.update = (req, res, next) => {
    let id = req.params.id;
   //SELECT * FROM games WHERE id = 4; 
    Game.findAll({
        where: {
            id: id
        }
    }).then((games) => {
        let game = games[0];

        res.render('games/form',{
            game: game,
            title: 'Update Game',
            action: 'update'
        });
    }).catch((err) => {
        console.error('Error trying to render update form',err);
        res.redirect('/games');
    });

    
};
controller.updatePost = (req, res, next) => {
    let game = req.body;

    //game.name
    //game.id

    //UPDATE games SET name = 'Uncharted 4 WHERE id = 1'
    Game.update(game, {
        where: {
            id: game.id
        }
    }).then(() => {
        res.redirect('/games');
    }).catch((err) => {
        console.error('Error trying to update game',err);
        res.redirect('/games')

    })
};
module.exports = controller;
 