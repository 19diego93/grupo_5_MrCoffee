module.exports = (sequelize, dataTypes) => {
    /* Creating an alias */
    let alias = "venta_detalle";
  
    /* Creating the columns of the table. */
    let cols = {
      id: {
        type: dataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      precio_venta: {
        type: dataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      articulos: {
        type: dataTypes.INTEGER(5),
        allowNull: false,
      },
      nombre: {
        type: dataTypes.STRING(40),
        allowNull: false,
      },
      categoria: {
        type: dataTypes.STRING(15),
        allowNull: false,
      },
      imagen: {
        type: dataTypes.STRING(30),
        allowNull: false,
      },
      product_id: {
        type: dataTypes.INTEGER(13),
        allowNull: false,
      },
      ventas_id: {
        type: dataTypes.INTEGER(5),
        allowNull: false,
      }
    };
  
    /* Telling Sequelize to not create the createdAt and updatedAt columns. */
    let config = {
      TableName: "venta_detalle",
      timestamps: false,
      freezeTableName: true,
    };
  
    /* Creating a table in the database. */
    const venta_detalle = sequelize.define(alias, cols, config);
  
    /* Creating a relationship between the tables. */
    // venta_detalle.associate = (models) => {
    //     venta_detalle.belongsTo(models.Usuario, {
    //     as: "Product",
    //     foreignKey: "product_id",
    //   });

    //   venta_detalle.belongsTo(models.Usuario, {
    //     as: "Venta",
    //     foreignKey: "ventas_id",
    //   });
  
    //   Venta.belongsToMany(models.Product, {
    //     as: "Product",
    //     through: "venta_detalle",
    //     foreignKey: "ventas_id",
    //     otherKey: "product_id",
    //     timestamps: false,
    //   });
    // };
  
    /* Returning the table. */
    return venta_detalle;
  };
  