/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_file', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    c_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    c_path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    c_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    c_link: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    c_link_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    c_user: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    c_memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 't_file'
  });
};
