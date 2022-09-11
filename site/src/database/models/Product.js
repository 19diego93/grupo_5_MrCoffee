module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "Product"; // esto debería estar en singular

  /* Creating the columns of the table. */
  let cols = {
    id: {
      type: dataTypes.BIGINT(13),
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: dataTypes.STRING(40),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(21),
      allowNull: true,
    },
    description: {
      type: dataTypes.STRING(120),
      allowNull: true,
    },
    stock: {
      type: dataTypes.INTEGER(5),
      allowNull: true,
    },
    price: {
      type: dataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    offer: {
      type: dataTypes.INTEGER(2),
      allowNull: true,
    },
    rating: {
      type: dataTypes.DECIMAL(2, 1),
      allowNull: true,
    },
    id_categoryP: {
      type: dataTypes.INTEGER(5),
      allowNull: false,
    },
  };

  /* Telling Sequelize to not create the createdAt and updatedAt columns. */
  let config = {
    timestamps: false,
  };

  /* Creating a table in the database. */
  const Product = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  Product.associate = function (models) {
    Product.belongsTo(models.Product_category, {
      as: "Product_category",
      foreignKey: "id_categoryP",
    });

    Product.belongsToMany(models.Venta, {
      as: "Venta",
      through: "venta_detalle",
      foreignKey: "product_id",
      otherKey: "ventas_id",
      timestamps: false,
    });
  };

  /* Returning the table. */
  return Product;
};
