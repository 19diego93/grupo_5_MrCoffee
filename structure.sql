-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2022 a las 02:42:41
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

CREATE DATABASE mrcoffeedb;
USE mrcoffeedb;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_item`
--

CREATE TABLE `cart_item` (
  `id` int(5) NOT NULL,
  `precio_venta` decimal(8,2) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `imagen` varchar(21) NOT NULL,
  `product_id` int(13) DEFAULT NULL,
  `ventas_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(13) NOT NULL,
  `name` varchar(40) NOT NULL,
  `image` varchar(21) DEFAULT 'default-image.png',
  `description` varchar(120) DEFAULT 'No se ha proporcionado una descripción',
  `stock` int(5) DEFAULT 0,
  `price` decimal(6,2) NOT NULL,
  `offer` int(2) DEFAULT 0,
  `rating` decimal(2,1) DEFAULT 0.0,
  `id_categoryP` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `stock`, `price`, `offer`, `rating`, `id_categoryP`) VALUES
(1, 'Vainilla Latte', '1.png', 'Café espresso con leche al vapor y toques de vainilla.', 100, '753.00', 0, '5.0', 1),
(2, 'Latte', '2.png', 'Café espresso con leche vaporizada.', 100, '896.00', 0, '5.0', 1),
(3, 'Dulce de leche Latte', '3.png', 'Café espresso con dulce de leche, leche al vapor con crema batida y salsa de caramelo.', 100, '735.00', 0, '4.0', 1),
(4, 'Cappuccino', '4.png', 'Café espresso, leche vaporizada y abundante espuma de leche.', 100, '985.00', 0, '2.0', 1),
(5, 'Americano', '5.png', 'Café espresso combinado con agua al mejor estilo americano.', 0, '531.00', 0, '2.0', 1),
(6, 'Croissant Relleno con Crema de Avellanas', '6.png', 'Croissant con masa de hojaldre y cubierto con una salsa de cacao y avellanas.', 100, '300.00', 0, '2.5', 2),
(7, 'Croissant', '7.png', 'Elaborado con masa de hojaldre crujiente y salada, nuestro Croissant se hornea especialmente para vos.', 100, '400.00', 0, '4.0', 2),
(8, 'Chocolate Croissant', '8.png', 'Exquisita masa de hojaldre rellena de chocolate semiamargo y horneado especialmente para vos.', 100, '250.00', 0, '3.5', 2),
(9, 'Medialuna', '9.png', 'La clásica medialuna reversionada a la manera de MrCoffee: Crujiente, esponjosa, de mayor tamaño y ¡recién horneada!', 100, '489.00', 0, '2.0', 2),
(10, 'Medialuna rellena con jamón y queso', '10.png', 'Nuestra Mezzaluna recién horneada, rellena con queso tybo y jamón cocido.', 0, '999.00', 0, '1.0', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_category`
--

CREATE TABLE `product_category` (
  `id` int(5) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_category`
--

INSERT INTO `product_category` (`id`, `name`) VALUES
(1, 'coffee'),
(2, 'Food');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_category`
--

CREATE TABLE `user_category` (
  `id` int(5) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_category`
--

INSERT INTO `user_category` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(5) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `image` varchar(21) DEFAULT 'defaultimg.jpg',
  `email` varchar(100) NOT NULL,
  `password` varchar(65) NOT NULL,
  `id_category_U` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `first_name`, `last_name`, `image`, `email`, `password`, `id_category_U`) VALUES
(1, 'Santiago', 'Boquita', 'defaultimg.jpg', 'boquita@santiago.com', '$2a$10$GKqiBlH2rFKT0YrZEpEZPOT4jqGJ1MtmOsuA3N7yC4u4E74feCLd6', 1),
(2, 'Jeremias', 'River', 'defaultimg.jpg', 'river@jeremias.com', '$2a$10$GKqiBlH2rFKT0YrZEpEZPOT4jqGJ1MtmOsuA3N7yC4u4E74feCLd6', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(5) NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` varchar(15) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `cobrado` datetime NOT NULL,
  `user_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_item_product_id_foreign` (`product_id`),
  ADD KEY `cart_item_ventas_id_foreign` (`ventas_id`) USING BTREE;

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id_categoryP_foreign` (`id_categoryP`) USING BTREE;

--
-- Indices de la tabla `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_category`
--
ALTER TABLE `user_category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarios_id_category_U_foreign` (`id_category_U`) USING BTREE;

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ventas_user_id_foreign` (`user_id`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_category`
--
ALTER TABLE `user_category`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`ventas_id`) REFERENCES `ventas` (`id`);

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
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
