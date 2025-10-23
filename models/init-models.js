var DataTypes = require("sequelize").DataTypes;
var _detailsection = require("./detailsection");
var _foto = require("./foto");
var _groupfoto = require("./groupfoto");
var _groupparameter = require("./groupparameter");
var _groupsection = require("./groupsection");
var _kegiatan = require("./kegiatan");
var _parameter = require("./parameter");
var _pengguna = require("./pengguna");
var _prestasi = require("./prestasi");
var _product = require("./product");
var _review = require("./review");

function initModels(sequelize) {
  var detailsection = _detailsection(sequelize, DataTypes);
  var foto = _foto(sequelize, DataTypes);
  var groupfoto = _groupfoto(sequelize, DataTypes);
  var groupparameter = _groupparameter(sequelize, DataTypes);
  var groupsection = _groupsection(sequelize, DataTypes);
  var kegiatan = _kegiatan(sequelize, DataTypes);
  var parameter = _parameter(sequelize, DataTypes);
  var pengguna = _pengguna(sequelize, DataTypes);
  var prestasi = _prestasi(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);

  pengguna.belongsTo(foto, { as: "ID_Foto_foto", foreignKey: "ID_Foto"});
  foto.hasMany(pengguna, { as: "penggunas", foreignKey: "ID_Foto"});
  foto.belongsTo(groupfoto, { as: "ID_GroupFoto_groupfoto", foreignKey: "ID_GroupFoto"});
  groupfoto.hasMany(foto, { as: "fotos", foreignKey: "ID_GroupFoto"});
  kegiatan.belongsTo(groupfoto, { as: "ID_GroupFoto_groupfoto", foreignKey: "ID_GroupFoto"});
  groupfoto.hasMany(kegiatan, { as: "kegiatans", foreignKey: "ID_GroupFoto"});
  prestasi.belongsTo(groupfoto, { as: "ID_GroupFoto_groupfoto", foreignKey: "ID_GroupFoto"});
  groupfoto.hasMany(prestasi, { as: "prestasis", foreignKey: "ID_GroupFoto"});
  product.belongsTo(groupfoto, { as: "ID_GroupFoto_groupfoto", foreignKey: "ID_GroupFoto"});
  groupfoto.hasMany(product, { as: "products", foreignKey: "ID_GroupFoto"});
  parameter.belongsTo(groupparameter, { as: "ID_GroupParameter_groupparameter", foreignKey: "ID_GroupParameter"});
  groupparameter.hasMany(parameter, { as: "parameters", foreignKey: "ID_GroupParameter"});
  product.belongsTo(groupparameter, { as: "ID_GroupParameter_groupparameter", foreignKey: "ID_GroupParameter"});
  groupparameter.hasMany(product, { as: "products", foreignKey: "ID_GroupParameter"});
  detailsection.belongsTo(groupsection, { as: "ID_GroupSection_groupsection", foreignKey: "ID_GroupSection"});
  groupsection.hasMany(detailsection, { as: "detailsections", foreignKey: "ID_GroupSection"});
  kegiatan.belongsTo(groupsection, { as: "ID_GroupSection_groupsection", foreignKey: "ID_GroupSection"});
  groupsection.hasMany(kegiatan, { as: "kegiatans", foreignKey: "ID_GroupSection"});
  review.belongsTo(kegiatan, { as: "ID_Kegiatan_kegiatan", foreignKey: "ID_Kegiatan"});
  kegiatan.hasMany(review, { as: "reviews", foreignKey: "ID_Kegiatan"});
  review.belongsTo(pengguna, { as: "ID_Pengguna_pengguna", foreignKey: "ID_Pengguna"});
  pengguna.hasMany(review, { as: "reviews", foreignKey: "ID_Pengguna"});
  review.belongsTo(product, { as: "ID_Product_product", foreignKey: "ID_Product"});
  product.hasMany(review, { as: "reviews", foreignKey: "ID_Product"});

  return {
    detailsection,
    foto,
    groupfoto,
    groupparameter,
    groupsection,
    kegiatan,
    parameter,
    pengguna,
    prestasi,
    product,
    review,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
