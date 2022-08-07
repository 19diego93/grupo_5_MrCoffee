DROP DATABASE IF EXISTS mrcoffeedb;
CREATE DATABASE mrcoffeedb;
USE mrcoffeedb;

DROP TABLE IF EXISTS product;
CREATE TABLE product (
  id int(13) NOT NULL ,
  `name` varchar(40) NOT NULL,
  `image` varchar(21) DEFAULT "default-image.png" ,
  `description` varchar(120) DEFAULT "No se ha proporcionado una descripción", 
  `stock` int(5) DEFAULT "0",
  `price` decimal(6,2) NOT NULL,
  `offer` int(2) DEFAULT "0",
  `rating` decimal(2,1) DEFAULT "0",
  `id_categoryP` int(5),
  PRIMARY KEY (`id`),
  FOREIGN KEY (id_categoryP)REFERENCES product_category(id)  
);

DROP TABLE IF EXISTS product_category;
CREATE TABLE product_category (
  id int(5)  NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `image` varchar(21) DEFAULT "defaultimg.jpg",
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `id_category_U` int(5),
  PRIMARY KEY (id),
  FOREIGN KEY (id_category_U) REFERENCES user_category(id) 
);


DROP TABLE IF EXISTS user_category;
CREATE TABLE user_category (
  id int(5) NOT NULL AUTO_INCREMENT,
  name varchar(15) NOT NULL,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS cart_item;
CREATE TABLE cart_item (
   id int(5) NULL AUTO_INCREMENT,
  `precio_venta` decimal(8,2) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `imagen` varchar(21) NOT NULL,
  `product_id` int(13),
  `ventas_id` int(5),
  PRIMARY KEY (id),
  FOREIGN KEY (ventas_id) REFERENCES ventas(id),
  FOREIGN KEY (product_id) REFERENCES product(id) 
);
DROP TABLE IF EXISTS ventas;
CREATE TABLE ventas (
  id int(5) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `estado` varchar(15) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `cobrado` datetime NOT NULL,
  `user_id` int(5),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES usuario(id) 
);





