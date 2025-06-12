'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cv_skill extends Model {
        static associate(models) {
            // define association here if needed
        }
    }
    Cv_skill.init(
        {
            cv_id: DataTypes.STRING,
            skill_id: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Cv_skill',
            freezeTableName: true,
            tableName: 'cv_Skill',
        }
    );
    return Cv_skill;
};
