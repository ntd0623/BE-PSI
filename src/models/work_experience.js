'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Work_Experiences extends Model {
        static associate(models) {
            // define association here if needed
            Work_Experiences.belongsTo(models.Cvs, { foreignKey: 'cv_id', as: 'cv' });
        }
    }
    Work_Experiences.init(
        {
            cv_id: DataTypes.INTEGER,
            position: DataTypes.STRING,
            company: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            start_date: DataTypes.DATEONLY,
            end_date: DataTypes.DATEONLY
        },
        {
            sequelize,
            modelName: 'Work_Experiences',
            freezeTableName: true,
            tableName: 'work_Experiences',
        }
    );
    return Work_Experiences;
};
