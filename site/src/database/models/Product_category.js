module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_category'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER(5),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
       
        name: {
            type: dataTypes.STRING(15),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        }
    const Product_category = sequelize.define(alias,cols,config);

    Product_category.associate = function (models) {
        Product_category.hasMany(models.Product, { 
            as: "Product", 
            foreignKey: "id_categoryP"
        })
    }

    return Product_category
};