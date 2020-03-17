/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_login', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    c_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 't_user',
        key: 'id'
      }
    },
    c_ip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_time_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    c_time_last: {
      type: DataTypes.DATE,
      allowNull: true
    },
    c_url_last: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_sub_system: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 't_login'
  });
};
