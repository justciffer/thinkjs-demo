/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_login_his', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    c_login: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_user: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    c_ip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_time_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 't_login_his'
  });
};
