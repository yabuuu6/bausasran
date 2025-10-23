const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pengguna', {
    ID_Pengguna: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Jabatan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Role: {
      type: DataTypes.ENUM('Admin','User'),
      allowNull: false,
      defaultValue: "User"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "uk_username"
    },
    ID_Foto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'foto',
        key: 'ID_Foto'
      }
    }
  }, {
    sequelize,
    tableName: 'pengguna',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Pengguna" },
        ]
      },
      {
        name: "uk_username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "ID_Foto",
        using: "BTREE",
        fields: [
          { name: "ID_Foto" },
        ]
      },
    ]
  });
};
