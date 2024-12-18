const { DataTypes } = require("sequelize");

//Material model definition to sequelize
module.exports = (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
        material_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: DataTypes.STRING,
        thickness: DataTypes.FLOAT,
        height: DataTypes.FLOAT, 
        length: DataTypes.FLOAT, 
        weight: DataTypes.FLOAT, 
        coe: DataTypes.STRING
    }, {
        tableName: 'material',
        timestamps: false,
    });
    return Material;
};