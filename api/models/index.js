const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('plate_inventory_db', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
});

const Material = require('./material')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Operation = require('./operation')(sequelize, Sequelize.DataTypes);

Material.hasMany(Operation, { foreignKey: 'material_id' });
User.hasMany(Operation, { foreignKey: 'user_id' });
Operation.belongsTo(Material, { foreignKey: 'material_id' });
Operation.belongsTo(User, { foreignKey: 'user_id' });

sequelize.authenticate().then(() => {
  console.log(`Database connected to discover`)
}).catch((err) => {
  console.log(err)
})

const db = {
  sequelize,
  Sequelize,
  Material,
  User,
  Operation,
};

module.exports = db;