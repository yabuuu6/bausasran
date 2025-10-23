const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kegiatan', {
    ID_Kegiatan: {
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
    Status: {
      type: DataTypes.ENUM('Upcoming','Past'),
      allowNull: false,
      defaultValue: "Upcoming"
    },
    ID_GroupFoto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupfoto',
        key: 'ID_GroupFoto'
      }
    },
    ID_GroupSection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupsection',
        key: 'ID_GroupSection'
      }
    }
  }, {
    sequelize,
    tableName: 'kegiatan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Kegiatan" },
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
        name: "ID_GroupSection",
        using: "BTREE",
        fields: [
          { name: "ID_GroupSection" },
        ]
      },
      {
        name: "idx_kegiatan_tanggal",
        using: "BTREE",
        fields: [
          { name: "Tanggal" },
        ]
      },
      {
        name: "idx_kegiatan_status",
        using: "BTREE",
        fields: [
          { name: "Status" },
        ]
      },
      {
        name: "idx_kegiatan_kategori",
        using: "BTREE",
        fields: [
          { name: "Kategori" },
        ]
      },
    ]
  });
};
