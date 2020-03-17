/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_role_user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    c_role: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 't_code',
        key: 'id'
      }
    },
    c_user: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 't_user',
        key: 'id'
      }
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 't_role_user'
  });
};
