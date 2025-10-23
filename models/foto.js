const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foto', {
    ID_Foto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Foto: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'foto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Foto" },
        ]
      },
      {
        name: "ID_GroupFoto",
        using: "BTREE",
        fields: [
          { name: "ID_GroupFoto" },
        ]
      },
    ]
  });
};
