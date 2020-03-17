/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    c_module: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    c_desc: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    c_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    c_link: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    c_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    c_group: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    c_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 't_log'
  });
};
