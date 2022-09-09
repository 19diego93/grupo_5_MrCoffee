module.exports = (sequelize, dataTypes) => {
  let alias = "Venta"; // esto debería estar en singular
  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cobrado: {
      type: dataTypes.STRING(15),
      allowNull: false,
    },
    cantidad: {
      type: dataTypes.INTEGER(15),
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metodoDePago: {
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    user_id: {
      type: dataTypes.INTEGER(5),
      allowNull: false,
    },
  };
  let config = {
    TableName: "Venta",
    timestamps: false,
    freezeTableName: true,
    
  };
  const Venta = sequelize.define(alias, cols, config);

  Venta.associate = (models) => {
    Venta.belongsTo(models.Usuario, {
      as: "Usuario",
      foreignKey: "user_id",
    });

    Venta.belongsToMany(models.Product, {
      as: "Product",
      through: "cart_item",
      foreignKey: "ventas_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };

  return Venta;
};
  