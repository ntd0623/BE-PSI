'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cvs extends Model {
        static associate(models) {
            Cvs.belongsTo(models.Users, {
                foreignKey: 'user_id'
            });
            Cvs.belongsTo(models.Allcodes,
                {
                    foreignKey: 'degree_id',
                    targetKey: "key",
                    as: "dataDegree"
                }
            )
            Cvs.belongsTo(models.Allcodes,
                {
                    foreignKey: 'status_cv',
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
            Cvs.hasMany(models.Projects, { foreignKey: 'cv_id', as: "projects" });
            Cvs.belongsTo(models.Internship_Batches, {
                foreignKey: 'batch_id',
                as: 'internshipBatch'
            });
        }
    }
    Cvs.init(
        {
            user_id: DataTypes.INTEGER,
            full_name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            birth_day: DataTypes.DATEONLY,
            gender_id: DataTypes.STRING,
            address: DataTypes.STRING,
            school_name: DataTypes.STRING,
            major: DataTypes.STRING,
            degree_id: DataTypes.STRING,
            gpa: DataTypes.DECIMAL(3, 2),
            graduation_year: DataTypes.INTEGER,
            status_cv: DataTypes.STRING,
            submission_date: DataTypes.DATEONLY,
            feedback: DataTypes.TEXT('long'),
            image: DataTypes.BLOB('long'),
            career_objective: DataTypes.STRING,
            archivement: DataTypes.STRING,
            references: DataTypes.STRING,
            batch_id: DataTypes.INTEGER,
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
