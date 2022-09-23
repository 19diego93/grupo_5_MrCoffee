module.exports = (sequelize, dataTypes) => {
  /* Creating an alias */
  let alias = "Venta_estado";

  /* Creating the columns of the table. */
  let cols = {
    id: {
      type: dataTypes.INTEGER(5),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estado: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
  };

  /* Telling Sequelize to not create the createdAt and updatedAt columns. */
  let config = {
    TableName: "Venta_estado",
    timestamps: false,
    freezeTableName: true,
  };

  /* Creating a table in the database. */
  const Venta_estado = sequelize.define(alias, cols, config);

  /* Creating a relationship between the tables. */
  Venta_estado.associate = (models) => {
    Venta_estado.hasMany(models.Venta, {
      as: "Venta",
      foreignKey: "estado_id",
    });
  };

  /* Returning the table. */
  return Venta_estado;
};
