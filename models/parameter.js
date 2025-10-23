const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parameter', {
    ID_Parameter: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nama: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Minimal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Maksimal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ID_GroupParameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupparameter',
        key: 'ID_GroupParameter'
      }
    }
  }, {
    sequelize,
    tableName: 'parameter',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Parameter" },
        ]
      },
      {
        name: "ID_GroupParameter",
        using: "BTREE",
        fields: [
          { name: "ID_GroupParameter" },
        ]
      },
    ]
  });
};
