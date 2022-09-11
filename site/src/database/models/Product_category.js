module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "Product_category"; // esto debería estar en singular

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
  };

  /* Creating a table in the database. */
  const Product_category = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  Product_category.associate = function (models) {
    Product_category.hasMany(models.Product, {
      as: "Product",
      foreignKey: "id_categoryP",
    });
  };

  /* Returning the table. */
  return Product_category;
};
