/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_code', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    c_ucode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    c_type: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    c_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_pid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_object: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_root: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_other: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_faicon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 't_code'
  });
};
