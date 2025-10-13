'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Allcodes extends Model {
        static associate(models) {
            // define association here if needed
            Allcodes.hasMany(models.Cvs,
                {
                    foreignKey: 'status_cv',
                    sourceKey: "key",
                    as: "dataStatus"
                }

            )
            Allcodes.hasMany(models.Cvs,
                {
                    foreignKey: 'degree_id',
                    sourceKey: "key",
                    as: "dataDegree"
                }

            )
            Allcodes.hasMany(models.Internship_Batches,
                {
                    foreignKey: 'name',
                    sourceKey: "key",
                    as: "dataInternship"
                }

            )
            Allcodes.hasMany(models.Quizzes_Questions,
                {
                    foreignKey: 'type',
                    sourceKey: "key",
                    as: "type_question"
                }

            )
            Allcodes.hasMany(models.Quiz_Attempt,
                {
                    foreignKey: 'status',
                    sourceKey: "key",
                    as: "status_attempt"
                }

            )
        }
    }
    Allcodes.init(
        {
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            value_en: DataTypes.STRING,
            value_vi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Allcodes',
            freezeTableName: true,
            tableName: 'allcodes',
        }
    );
    return Allcodes;
};
