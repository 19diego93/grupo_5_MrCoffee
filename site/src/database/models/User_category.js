module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "User_category"; // esto debería estar en singular

  /* Creating the columns of the table. */
  let cols = {
    id: {
      type: dataTypes.INTEGER(5),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: dataTypes.STRING(15),
      allowNull: false,
    },
  };

  /* Telling Sequelize to not create the createdAt and updatedAt columns. */
  let config = {
    timestamps: false,
    freezeTableName: true,
  };

  /* Creating a table in the database. */
  const User_category = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  User_category.associate = function (models) {
    User_category.hasMany(models.Usuario, {
      as: "Usuario",
      foreignKey: "id_category_U",
    });
  };

  /* Returning the table. */
  return User_category;
};
