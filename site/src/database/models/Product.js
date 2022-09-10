module.exports = (sequelize, dataTypes) => {
  let alias = "Product"; // esto debería estar en singular

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
    }
  };

  let config = {
    timestamps: false,
  };
  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Product_category, {
      // models.Product_category -> Product_category es el valor de alias en Product_category.js
      as: "product_category",
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

  return Product;
};
