'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Skills extends Model {
        static associate(models) {
            // define association here if needed
            Skills.belongsToMany(models.Cvs, {
                through: models.Cv_skill,
                foreignKey: 'skill_id',
                otherKey: 'cv_id',
                as: 'cvs'
            });
        }
    }
    Skills.init(
        {
            name: DataTypes.STRING,
            type: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Skills',
            freezeTableName: true,
            tableName: 'skills',
        }
    );
    return Skills;
};
