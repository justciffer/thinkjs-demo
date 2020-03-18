/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_role_user', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    c_role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 't_role_user'
  });
};
