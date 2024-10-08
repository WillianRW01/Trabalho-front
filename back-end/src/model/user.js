const database = require('../config/database');

class UserModel {

        constructor() {
            this.model = database.db.define("users", {
                id: {
                    type: database.db.Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false
                },

                email: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                senha: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false
                },
                role: {
                    type: database.db.Sequelize.ENUM('admin', 'viewer'),
                    allowNull: false
                },
                status:{
                    type:database.db.Sequelize.ENUM("ativo","bloqueado"),
                    defaultValue:"ativo",
                }

            })
        }

}

module.exports = new UserModel().model;