const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    ID_Product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nama: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Harga: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    Diskon: {
      type: DataTypes.DECIMAL(4,3),
      allowNull: false,
      defaultValue: 0.000
    },
    Kategori: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ID_GroupFoto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupfoto',
        key: 'ID_GroupFoto'
      }
    },
    ID_GroupParameter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groupparameter',
        key: 'ID_GroupParameter'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Product" },
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
        name: "ID_GroupParameter",
        using: "BTREE",
        fields: [
          { name: "ID_GroupParameter" },
        ]
      },
      {
        name: "idx_product_nama",
        using: "BTREE",
        fields: [
          { name: "Nama" },
        ]
      },
      {
        name: "idx_product_kategori",
        using: "BTREE",
        fields: [
          { name: "Kategori" },
        ]
      },
    ]
  });
};
