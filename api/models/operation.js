// models/operation.js
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define(
    "Operation",
    {
      operation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      material_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Material",
          key: "material_id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      quantity: DataTypes.FLOAT,
      location: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: DataTypes.TEXT,
      observation: DataTypes.TEXT,
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nf: DataTypes.STRING,
      operation_type: DataTypes.STRING,
    },
    {
      tableName: "operations",
      timestamps: false,
    }
  );
  return Operation;
};
