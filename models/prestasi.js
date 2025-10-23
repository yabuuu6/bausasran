const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prestasi', {
    ID_Prestasi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Judul: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Kategori: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ID_GroupFoto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupfoto',
        key: 'ID_GroupFoto'
      }
    }
  }, {
    sequelize,
    tableName: 'prestasi',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Prestasi" },
        ]
      },
      {
        name: "ID_GroupFoto",
        using: "BTREE",
        fields: [
          { name: "ID_GroupFoto" },
        ]
      },
      {
        name: "idx_prestasi_tanggal",
        using: "BTREE",
        fields: [
          { name: "Tanggal" },
        ]
      },
      {
        name: "idx_prestasi_kategori",
        using: "BTREE",
        fields: [
          { name: "Kategori" },
        ]
      },
    ]
  });
};
