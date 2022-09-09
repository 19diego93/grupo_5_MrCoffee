-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2022 a las 04:41:56
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mrcoffeedb`
--
CREATE DATABASE IF NOT EXISTS `mrcoffeedb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mrcoffeedb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `precio_venta` decimal(8,2) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `imagen` varchar(30) NOT NULL,
  `product_id` int(13) NOT NULL,
  `ventas_id` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_item_product_id_foreign` (`product_id`),
  KEY `cart_item_ventas_id_foreign` (`ventas_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(13) NOT NULL,
  `name` varchar(40) NOT NULL,
  `image` varchar(30) DEFAULT 'default-image.png',
  `description` varchar(120) NOT NULL,
  `stock` int(5) DEFAULT 0,
  `price` decimal(8,2) NOT NULL,
  `offer` int(2) DEFAULT 0,
  `rating` decimal(2,1) DEFAULT 0.0,
  `id_categoryP` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_categoryP_foreign` (`id_categoryP`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_category`
--

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_category`
--

DROP TABLE IF EXISTS `user_category`;
CREATE TABLE IF NOT EXISTS `user_category` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `image` varchar(30) DEFAULT 'defaultimg.jpg',
  `email` varchar(100) NOT NULL,
  `password` varchar(80) NOT NULL,
  `id_category_U` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarios_id_category_U_foreign` (`id_category_U`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

DROP TABLE IF EXISTS `venta`;
CREATE TABLE IF NOT EXISTS `venta` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `cobrado` varchar(60) NOT NULL,
  `cantidad` int(15) NOT NULL,
  `total` decimal(14,2) NOT NULL,
  `metodoDePago` varchar(25) NOT NULL,
  `user_id` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ventas_user_id_foreign` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`ventas_id`) REFERENCES `venta` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_categoryP`) REFERENCES `product_category` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_category_U`) REFERENCES `user_category` (`id`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
