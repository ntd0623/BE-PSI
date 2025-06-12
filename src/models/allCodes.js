'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Allcodes extends Model {
        static associate(models) {
            // define association here if needed
            Allcodes.hasMany(models.Cvs,
                {
                    foreignKey: 'statusCv',
                    sourceKey: "key",
                    as: "dataStatus"
                }

            )
            Allcodes.hasMany(models.Internship_Batches,
                {
                    foreignKey: 'name',
                    sourceKey: "key",
                    as: "dataInternship"
                }

            )
        }
    }
    Allcodes.init(
        {
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            value_EN: DataTypes.STRING,
            value_VI: DataTypes.STRING,
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
