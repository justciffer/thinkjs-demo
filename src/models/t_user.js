/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_user', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    c_guid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_role: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    c_login_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_login_pwd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_link: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    c_linktype: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    c_status: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 't_user'
  });
};
