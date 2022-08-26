-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2022 a las 03:00:38
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

--
-- Volcado de datos para la tabla `product_category`
--

INSERT INTO `product_category` (`id`, `name`) VALUES
(1, 'coffee'),
(2, 'Food');

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `stock`, `price`, `offer`, `rating`, `id_categoryP`) VALUES
(23557594, 'Café Doble', '1.webp', 'Café 350 ml.', 100, '670.00', 15, '5.0', 1),
(42123331, 'Café Lágrima', '2.webp', 'Lágrima 350 ml.', 100, '430.00', 0, '4.0', 1),
(53643641, 'Café Latte', '3.webp', 'Latte 350 ml.', 100, '614.00', 25, '4.0', 1),
(76343624, 'Café Mocha', '4.webp', 'Leche, espuma, chocolate líquido, café doble, crema, chocolate rallado.', 23, '800.00', 30, '3.5', 1),
(72636464, 'Té', '5.webp', 'Té común de 350 ml.', 0, '290.00', 15, '5.0', 1),
(46346431, 'Café Flat White', '6.webp', 'Dos shot de café y leche cremosa 350 ml.', 0, '671,43', 18, '4.3', 1),
(42634414, 'Limonada Frutos Rojos', '7.webp', 'Limonada Frutos Rojos 340 ml.', 342, '657,14', 38, '4.7', 1),
(42634614, 'Limonada de Menta y Jengibre', '8.webp', 'Limonada de Menta y Jengibre 340 ml.', 0, '657,14', 0, '4.2', 1),
(41216421, 'Pomelada Hibiscous y Pimienta', '9.webp', 'Pomelada Hibiscous y Pimienta 340 ml.', 20, '842,86', 5, '2.2', 1),
(76454264, 'Exprimido de Naranja Grande', '10.webp', 'Exprimido de Naranja Grande 350 ml.', 43, '842,86', 10, '4.6', 1),
(57636811, 'Chocotorta', '11.webp', 'Capas de galletitas chocolinas relleno de dulce de leche. Lingote de 4 x 10 cm.', 100, '928,57', 34, '3.5', 2),
(18653562, 'Crumble de Manzana', '12.webp', 'Base de masa sable, relleno de compota de manzanas granny smith y streussel crocante.', 0, '928,57', 20, '4.0', 2),
(15638763, 'Cheesecake', '13.webp', 'Pastel de crema de queso con arandanos frescos y gelatina de frambuesa.', 100, '928,57', 10, '3.5', 2),
(14250254, 'Lemon Pie', '14.webp', 'Base de masa sablee, crema de limón y merengue italiano. Lingote de 5 x 10 cm.', 234, '928,57', 5, '3.0', 2),
(14343245, 'Brownie Merengue', '15.webp', 'Brownie húmedo, dulce de leche repostero, mousse de chocolate con leche y merengue italiano. Lingote de 4 x 10 cm.', 0, '928,57', 0, '5.0', 2),
(12975646, 'Cuadrado de Brownie con Nuez', '16.webp', 'Cuadrado de brownie con nuez.', 0, '600,00', 0, '4.4', 2),
(14623347, 'Croissant', '17.webp', 'Croissant de masa de hojaldre.', 42, '500,00', 30, '4.7', 2),
(75648238, 'Alfajor', '18.webp', 'Alfajor de maicena.', 52, '300,00', 5, '3.4', 2),
(17650579, 'Alfajor de Nuez', '19.webp', 'Tapas de masa de nuez, relleno de dulce de leche y nuez partida.', 864, '400,00', 10, '3.4', 2),
(26575670, 'Medialuna', '20.webp', 'Medialunas de grasa o manteca.', 72, '200,00', 5, '4.3', 2);

--
-- Volcado de datos para la tabla `user_category`
--

INSERT INTO `user_category` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `first_name`, `last_name`, `image`, `email`, `password`, `id_category_U`) VALUES
(1, 'Santiago', 'boquita', 'img-1660161772572.jpg', 'boquita@santiago.com', '$2a$10$ytRPn.UZRL8V4ZzpIyEPuuG5uSjw4pwP/XoANqLqAuVQyIj8DncMC', 1),
(2, 'Jeremias', 'River', 'img-1660360317331.gif', 'river@jeremias.com', '$2a$10$ytRPn.UZRL8V4ZzpIyEPuuG5uSjw4pwP/XoANqLqAuVQyIj8DncMC', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
