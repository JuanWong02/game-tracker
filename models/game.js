const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');
const Model = Sequelize.Model;

class Game extends Model {};

Game.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'game',

    //to set a custom table name
    // freezeTableName: true,
    // tableName: 'games'

});

//Game.sync();

module.exports = {Game};