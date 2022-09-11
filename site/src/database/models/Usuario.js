module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "Usuario";

  /* Creating the columns of the table. */
  let cols = {
    id: {
      type: dataTypes.INTEGER(5),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    id_category_U: {
      type: dataTypes.INTEGER(5),
      allowNull: false,
    },
  };

  /* Telling Sequelize to not create the createdAt and updatedAt columns. */
  let config = {
    TableName: "Usuario",
    timestamps: false,
    freezeTableName: true,
  };

  /* Creating a table in the database. */
  const Usuario = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.User_category, {
      as: "User_category",
      foreignKey: "id_category_U",
    });

    Usuario.hasMany(models.Venta, {
      as: "Venta",
      foreignKey: "user_id",
    });
  };

  /* Returning the table. */
  return Usuario;
};
