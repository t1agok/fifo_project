module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
        stock_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        material_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "material",
                key: "material_id",
              },
        },
        location: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        last_updated: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
        },
        length: {
            type: DataTypes.FLOAT,
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        thickness: {
            type: DataTypes.FLOAT,
        }
    }, {
        tableName: 'stock',
        timestamps: false,
    });
    return Stock;
};