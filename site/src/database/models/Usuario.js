module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario"; // esto debería estar en singular
  let cols = {
    id: {
      type: dataTypes.INTEGER(5),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    first_name: {
      type: dataTypes.STRING(40),
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING(40),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(21),
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(65),
      allowNull: false,
    },
    id_category_U:{
      type: dataTypes.BIGINT(5),
      allowNull: true,
    },
  };
  let config = {
    timestamps: false,
    freezeTableName: true,
  };
  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(models.User_category, {
      as: "User_category",
      foreignKey: "id_category_U",
    });
  };

  return Usuario;
};
