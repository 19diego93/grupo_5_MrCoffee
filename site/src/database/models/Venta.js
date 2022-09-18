module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "Venta";

  /* Creating the columns of the table. */
  let cols = {
    id: {
      type: dataTypes.INTEGER(5),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cobrado: {
      type: dataTypes.STRING(60),
      allowNull: false,
    },
    cantidad: {
      type: dataTypes.INTEGER(15),
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(14, 2),
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

  /* Telling Sequelize to not create the createdAt and updatedAt columns. */
  let config = {
    TableName: "Venta",
    timestamps: false,
    freezeTableName: true,
  };

  /* Creating a table in the database. */
  const Venta = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  Venta.associate = (models) => {
    Venta.belongsTo(models.Usuario, {
      as: "Usuario",
      foreignKey: "user_id",
    });

    Venta.belongsToMany(models.Product, {
      as: "Detail",
      through: "venta_detalle",
      foreignKey: "ventas_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };

  /* Returning the table. */
  return Venta;
};
