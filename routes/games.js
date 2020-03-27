var express = require('express');
var router = express.Router();

const { Game } = require('./../models/game');
const gamesController = require('./../controllers/games.controller');

/* GET games listing. */
router.get('/', gamesController.read);

 //games/delete
router.post('/delete/:id', gamesController.delete);
//GET games/create
router.get('/create', gamesController.create);

router.post('/create', gamesController.createPost);

router.get('/update/:id', gamesController.update);

router.post('/update', gamesController.updatePost);

module.exports = router;
