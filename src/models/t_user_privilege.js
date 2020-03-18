/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_user_privilege', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    c_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_privilege: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_allow: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    c_deny: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 't_user_privilege'
  });
};
