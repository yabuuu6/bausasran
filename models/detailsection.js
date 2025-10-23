const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detailsection', {
    ID_DetailSection: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_GroupSection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupsection',
        key: 'ID_GroupSection'
      }
    },
    Deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Urutan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'detailsection',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DetailSection" },
        ]
      },
      {
        name: "idx_detailsection_order",
        using: "BTREE",
        fields: [
          { name: "ID_GroupSection" },
          { name: "Urutan" },
        ]
      },
    ]
  });
};
