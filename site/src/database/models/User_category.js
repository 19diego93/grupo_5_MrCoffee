module.exports = (sequelize, dataTypes) => {
    let alias = 'User_category'; // esto debería estar en singular
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
        freezeTableName: true,
        }
    const User_category = sequelize.define(alias,cols,config);

    User_category.associate = function (models) {
        User_category.hasMany(models.Usuario, { 
            as: "Usuario", 
            foreignKey: "id_category_U"
        })

    }

    return User_category
};