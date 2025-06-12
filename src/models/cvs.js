'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cvs extends Model {
        static associate(models) {
            Cvs.belongsTo(models.Users, {
                foreignKey: 'userID'
            });
            Cvs.belongsTo(models.Allcodes,
                {
                    foreignKey: 'statusCv',
                    targetKey: "key",
                    as: "dataStatus"
                }
            )
            Cvs.hasMany(models.Work_Experiences, { foreignKey: 'cv_id', as: 'experiences' });
            Cvs.belongsToMany(models.Skills, {
                through: models.Cv_skill,
                foreignKey: 'cv_id',
                otherKey: 'skill_id',
                as: 'skills'
            });
            Cvs.hasMany(models.Projects, { foreignKey: 'cv_id' });
            Cvs.belongsTo(models.Internship_Batches, {
                foreignKey: 'batchID',
                as: 'internshipBatch'
            });
        }
    }
    Cvs.init(
        {
            userID: DataTypes.INTEGER,
            fullName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            birthDay: DataTypes.DATEONLY,
            genderID: DataTypes.STRING,
            address: DataTypes.STRING,
            schoolName: DataTypes.STRING,
            major: DataTypes.STRING,
            degreeID: DataTypes.STRING,
            gpa: DataTypes.DECIMAL(3, 2),
            graduationYear: DataTypes.INTEGER,
            statusCv: DataTypes.STRING,
            submission_date: DataTypes.DATEONLY,
            feedback: DataTypes.TEXT('long'),
            image: DataTypes.BLOB('long'),
            career_objective: DataTypes.STRING,
            archivement: DataTypes.STRING,
            references: DataTypes.STRING,
            batchID: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Cvs',
            freezeTableName: true,
            tableName: 'cvs',
        }
    );
    return Cvs;
};
