'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Evaluations_Criteria extends Model {
        static associate(models) {
            // Định nghĩa quan hệ nếu cần
        }
    }
    Evaluations_Criteria.init(
        {
            evaluationID: DataTypes.INTEGER,
            criterion_name: DataTypes.STRING,
            score: DataTypes.DECIMAL(3, 2),
        },
        {
            sequelize,
            modelName: 'Evaluations_Criteria',
            freezeTableName: true,
            tableName: 'evaluations_criteria',
        }
    );
    return Evaluations_Criteria;
};
