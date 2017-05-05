'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('BloodSugarRecords', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            blood_sugar: {
                type: Sequelize.INTEGER
            },
            time: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW")

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW")

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW")

            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('BloodSugarRecords');
    }
};
