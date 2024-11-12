/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria_tarjeta`
--

DROP TABLE IF EXISTS `categoria_tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_tarjeta` (
  `id_categoria_tarjeta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_tarjeta`
--

LOCK TABLES `categoria_tarjeta` WRITE;
/*!40000 ALTER TABLE `categoria_tarjeta` DISABLE KEYS */;
INSERT INTO `categoria_tarjeta` VALUES (1,'Clásica'),(2,'Oro'),(3,'Platinum'),(4,'Black'),(5,'Debito');
/*!40000 ALTER TABLE `categoria_tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` varchar(50) NOT NULL,
  `dpi` varchar(25) NOT NULL,
  `nombre1` varchar(50) NOT NULL,
  `nombre2` varchar(50) DEFAULT NULL,
  `nombre3` varchar(50) DEFAULT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `apellido3` varchar(50) DEFAULT NULL,
  `fecha_nac` date NOT NULL,
  `status_` tinyint(1) DEFAULT 1,
  `insert_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `dpi` (`dpi`),
  KEY `idx_dpi` (`dpi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES ('3131f94f-d85d-45a8-b99b-55d86560d992','3592859020101','Luis','Fernando','','Guzman','Orozco','','2002-05-21',1,'2024-11-09 19:57:46'),('42416ec6-9019-11ef-a6bc-54bf6402f80c','2712568940101','Hospital La Ezperanza',NULL,NULL,'Zona 3',NULL,NULL,'2024-10-01',1,'2024-10-21 19:59:23'),('5e2d364a-878b-11ef-9452-54bf6402f80c','2558752070801','Jose','Ivan',NULL,'Barreno','Bulux',NULL,'1994-08-19',1,'2024-10-10 22:43:32'),('707c6c5d-94be-11ef-afcd-54bf6402f80c','3216549873211','Oscar','MArio',NULL,'Porras',NULL,NULL,'2024-10-27',0,'2024-10-27 17:51:52'),('7e91063e-94b0-11ef-afcd-54bf6402f80c','1234567897984','Maria','Fernanda',NULL,'Zelda','Akura',NULL,'2024-10-27',1,'2024-10-27 16:12:03'),('8e640f10-969a-11ef-b0d8-54bf6402f80c','7777777777777','José','Maria',NULL,'Castañeda',NULL,NULL,'2024-10-30',0,'2024-10-30 02:40:02'),('af8fc785-878b-11ef-9452-54bf6402f80c','2558752070802','Tiago','Luis',NULL,'Barreno','Bulux',NULL,'1994-08-19',1,'2024-10-10 22:45:48');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas`
--

DROP TABLE IF EXISTS `cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentas` (
  `id_cuenta` varchar(50) NOT NULL,
  `num_cuenta` varchar(20) NOT NULL,
  `id_tipo_cuenta` int(11) NOT NULL,
  `id_estado_cuenta` int(11) NOT NULL,
  `saldo` decimal(15,2) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `id_cliente` varchar(50) NOT NULL,
  `status_` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_cuenta`),
  UNIQUE KEY `num_cuenta` (`num_cuenta`),
  KEY `id_tipo_cuenta` (`id_tipo_cuenta`),
  KEY `id_estado_cuenta` (`id_estado_cuenta`),
  KEY `id_cliente` (`id_cliente`),
  KEY `idx_num_cuenta` (`num_cuenta`),
  CONSTRAINT `cuentas_ibfk_1` FOREIGN KEY (`id_tipo_cuenta`) REFERENCES `tipo_cuenta` (`id_tipo_cuenta`),
  CONSTRAINT `cuentas_ibfk_2` FOREIGN KEY (`id_estado_cuenta`) REFERENCES `estado_cuenta` (`id_estado_cuenta`),
  CONSTRAINT `cuentas_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas`
--

LOCK TABLES `cuentas` WRITE;
/*!40000 ALTER TABLE `cuentas` DISABLE KEYS */;
INSERT INTO `cuentas` VALUES ('162b582d-9761-11ef-aafb-54bf6402f80c','2001883120352',2,1,500.00,'2024-10-31','5e2d364a-878b-11ef-9452-54bf6402f80c',1),('1b00c2ad-975f-11ef-aafb-54bf6402f80c','2008757275834',4,2,1000.00,'2024-10-31','5e2d364a-878b-11ef-9452-54bf6402f80c',1),('5db8f383-9019-11ef-a6bc-54bf6402f80c','2008303377711',4,1,20200.00,'2024-10-21','42416ec6-9019-11ef-a6bc-54bf6402f80c',1),('81df9817-8799-11ef-9452-54bf6402f80c','2002165854166',3,1,3500.00,'2024-10-11','5e2d364a-878b-11ef-9452-54bf6402f80c',1),('953091c6-9758-11ef-aafb-54bf6402f80c','2009908215251',1,1,1500.00,'2024-10-31','5e2d364a-878b-11ef-9452-54bf6402f80c',1),('96c4f38d-8799-11ef-9452-54bf6402f80c','2004271894522',1,1,1810.00,'2024-10-11','5e2d364a-878b-11ef-9452-54bf6402f80c',1),('b271e331-975f-11ef-aafb-54bf6402f80c','2004979199302',4,1,99.00,'2024-10-31','af8fc785-878b-11ef-9452-54bf6402f80c',1),('b4fa27cc-9756-11ef-aafb-54bf6402f80c','2009609572501',4,1,0.00,'2024-10-31','5e2d364a-878b-11ef-9452-54bf6402f80c',0),('cc2b6e7a-94dc-11ef-afcd-54bf6402f80c','2001867625410',1,1,1000.00,'2024-10-27','af8fc785-878b-11ef-9452-54bf6402f80c',1),('e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','2009865297017',4,1,300.00,'2024-10-25','af8fc785-878b-11ef-9452-54bf6402f80c',1);
/*!40000 ALTER TABLE `cuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_cuenta`
--

DROP TABLE IF EXISTS `estado_cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_cuenta` (
  `id_estado_cuenta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_cuenta`
--

LOCK TABLES `estado_cuenta` WRITE;
/*!40000 ALTER TABLE `estado_cuenta` DISABLE KEYS */;
INSERT INTO `estado_cuenta` VALUES (1,'Activa'),(2,'Inactiva'),(3,'Cerrada'),(4,'Procesando ...');
/*!40000 ALTER TABLE `estado_cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca_tarjeta`
--

DROP TABLE IF EXISTS `marca_tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca_tarjeta` (
  `id_marca` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca_tarjeta`
--

LOCK TABLES `marca_tarjeta` WRITE;
/*!40000 ALTER TABLE `marca_tarjeta` DISABLE KEYS */;
INSERT INTO `marca_tarjeta` VALUES (1,'Visa'),(2,'MasterCard');
/*!40000 ALTER TABLE `marca_tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operaciones_bancarias`
--

DROP TABLE IF EXISTS `operaciones_bancarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operaciones_bancarias` (
  `id_operacion` int(11) NOT NULL AUTO_INCREMENT,
  `operacion` varchar(50) NOT NULL,
  `cuenta_origen` tinyint(4) NOT NULL,
  `cuenta_destino` tinyint(4) NOT NULL,
  `ref_producto` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_operacion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operaciones_bancarias`
--

LOCK TABLES `operaciones_bancarias` WRITE;
/*!40000 ALTER TABLE `operaciones_bancarias` DISABLE KEYS */;
INSERT INTO `operaciones_bancarias` VALUES (1,'DEPOSITO',0,1,'Cuenta'),(2,'TRANSFERENCIA',1,1,'Cuenta'),(3,'RETIRO',1,0,'Cuenta'),(4,'PAGO DEBITO',1,1,'Tarjeta de Debito'),(5,'COBRO CREDITO',0,1,'Tarjeta de Credito'),(6,'PAGO CREDITO',1,0,'Tarjeta de Credito'),(7,'RETIRO DEBITO',1,0,'Tarjeta de Debito'),(8,'ACREDITACION TARJETA',1,1,'Cuenta');
/*!40000 ALTER TABLE `operaciones_bancarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `id_tarjeta` varchar(50) NOT NULL,
  `no_tarjeta` varchar(20) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `limite_credito` double DEFAULT NULL,
  `id_tipo_tarjeta` int(11) NOT NULL,
  `id_categoria_tarjeta` int(11) NOT NULL,
  `codigo` varchar(4) NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `id_cliente` varchar(50) NOT NULL,
  `id_ref_cuenta` varchar(50) DEFAULT NULL,
  `status_` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_tarjeta`),
  UNIQUE KEY `no_tarjeta` (`no_tarjeta`),
  KEY `id_marca` (`id_marca`),
  KEY `id_tipo_tarjeta` (`id_tipo_tarjeta`),
  KEY `id_categoria_tarjeta` (`id_categoria_tarjeta`),
  KEY `id_cliente` (`id_cliente`),
  KEY `idx_no_tarjeta` (`no_tarjeta`),
  KEY `FK_TJ_REF_CUENTA` (`id_ref_cuenta`),
  CONSTRAINT `FK_TJ_REF_CUENTA` FOREIGN KEY (`id_ref_cuenta`) REFERENCES `cuentas` (`id_cuenta`),
  CONSTRAINT `tarjetas_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marca_tarjeta` (`id_marca`),
  CONSTRAINT `tarjetas_ibfk_2` FOREIGN KEY (`id_tipo_tarjeta`) REFERENCES `tipo_tarjeta` (`id_tipo_tarjeta`),
  CONSTRAINT `tarjetas_ibfk_3` FOREIGN KEY (`id_categoria_tarjeta`) REFERENCES `categoria_tarjeta` (`id_categoria_tarjeta`),
  CONSTRAINT `tarjetas_ibfk_4` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `CONSTRAINT_1` CHECK (`id_tipo_tarjeta` = 1 and `limite_credito` > 0 or `id_tipo_tarjeta` = 2 and `id_ref_cuenta` is not null)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES ('3b570a4c-935f-11ef-9fc0-54bf6402f80c','5200004041014764',2,NULL,2,1,'279','2030-08-19','af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',1),('6c1c5755-9104-11ef-94af-54bf6402f80c','5100002102808009',2,3000,1,1,'824','2030-08-19','5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,1),('7db2a7bd-90fa-11ef-94af-54bf6402f80c','5200007411044136',2,NULL,2,1,'698','2030-08-19','5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',1),('8f8ca177-90fa-11ef-94af-54bf6402f80c','5100003422534396',2,3000,1,1,'293','2030-08-19','5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,1),('ca62f195-9ee9-11ef-a0b5-54bf6402f80c','4000001204041086',1,NULL,2,5,'476','2028-11-09','af8fc785-878b-11ef-9452-54bf6402f80c','b271e331-975f-11ef-aafb-54bf6402f80c',1),('e05928a6-9104-11ef-94af-54bf6402f80c','5200000882142378',2,NULL,2,1,'480','2032-01-19','5e2d364a-878b-11ef-9452-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',1);
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_cuenta`
--

DROP TABLE IF EXISTS `tipo_cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_cuenta` (
  `id_tipo_cuenta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_cuenta`
--

LOCK TABLES `tipo_cuenta` WRITE;
/*!40000 ALTER TABLE `tipo_cuenta` DISABLE KEYS */;
INSERT INTO `tipo_cuenta` VALUES (1,'Ahorros'),(2,'Corriente'),(3,'Depósito a plazo'),(4,'Monetaria');
/*!40000 ALTER TABLE `tipo_cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_tarjeta`
--

DROP TABLE IF EXISTS `tipo_tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_tarjeta` (
  `id_tipo_tarjeta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_tarjeta`
--

LOCK TABLES `tipo_tarjeta` WRITE;
/*!40000 ALTER TABLE `tipo_tarjeta` DISABLE KEYS */;
INSERT INTO `tipo_tarjeta` VALUES (1,'Crédito'),(2,'Débito');
/*!40000 ALTER TABLE `tipo_tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id_transaccion` varchar(50) NOT NULL,
  `producto` enum('Cuenta','Tarjeta') NOT NULL,
  `id_operacion` int(11) NOT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `monto` decimal(15,2) NOT NULL,
  `id_cliente` varchar(50) DEFAULT NULL,
  `id_cuenta` varchar(50) DEFAULT NULL,
  `id_cuenta_destino` varchar(50) DEFAULT NULL,
  `id_tarjeta` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `id_servidor_transaccion` int(11) DEFAULT NULL,
  `estado_transaccion` tinyint(4) DEFAULT NULL,
  `fecha_transaccion` datetime NOT NULL,
  PRIMARY KEY (`id_transaccion`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_cuenta` (`id_cuenta`),
  KEY `id_tarjeta` (`id_tarjeta`),
  KEY `FK_TRC_OPERACIN` (`id_operacion`),
  KEY `FK_CTA_DESTINO` (`id_cuenta_destino`),
  CONSTRAINT `FK_CTA_DESTINO` FOREIGN KEY (`id_cuenta_destino`) REFERENCES `cuentas` (`id_cuenta`),
  CONSTRAINT `FK_TRC_OPERACIN` FOREIGN KEY (`id_operacion`) REFERENCES `operaciones_bancarias` (`id_operacion`),
  CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`id_cuenta`) REFERENCES `cuentas` (`id_cuenta`),
  CONSTRAINT `transacciones_ibfk_3` FOREIGN KEY (`id_tarjeta`) REFERENCES `tarjetas` (`id_tarjeta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
INSERT INTO `transacciones` VALUES ('0522f6e9-935a-11ef-9fc0-54bf6402f80c','Cuenta',3,'Retiro Cajero B5',-1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,NULL,'Retiro cajero B5',1,1,'2024-10-25 23:20:31'),('1078a375-87a9-11ef-9452-54bf6402f80c','Cuenta',2,'Hospital 1',-350.50,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Consulta medica',NULL,NULL,'2024-10-11 02:16:06'),('16f84ae5-9ec7-11ef-a0b5-54bf6402f80c','Cuenta',1,'Portal BB Bank',1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c',NULL,'cc2b6e7a-94dc-11ef-afcd-54bf6402f80c',NULL,'',1,1,'2024-11-09 12:18:59'),('190513d2-9298-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',-2000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia deuda pendiente',1,1,'2024-10-25 00:12:22'),('19055a82-9298-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',2000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia deuda pendiente',1,1,'2024-10-25 00:12:22'),('1c68c683-929f-11ef-94fb-54bf6402f80c','Tarjeta',4,'Cobro Hospital la paz',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de cita medica',1,1,'2024-10-25 01:02:34'),('1c692d83-929f-11ef-94fb-54bf6402f80c','Cuenta',8,'Cobro Hospital la paz',100.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Pago de cita medica',1,1,'2024-10-25 01:02:34'),('30ef1606-9367-11ef-9fc0-54bf6402f80c','Tarjeta',7,'Retiro Cajero',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,NULL,'e05928a6-9104-11ef-94af-54bf6402f80c','Retiro de cajero',1,1,'2024-10-26 00:54:48'),('47e94ff8-9a3d-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',-99.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','b271e331-975f-11ef-aafb-54bf6402f80c',NULL,'Prueba Desde portal',1,1,'2024-11-03 17:42:26'),('47e95ddc-9a3d-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',99.00,'af8fc785-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','b271e331-975f-11ef-aafb-54bf6402f80c',NULL,'Prueba Desde portal',1,1,'2024-11-03 17:42:26'),('59525a2a-9366-11ef-9fc0-54bf6402f80c','Tarjeta',4,'Pago cuota 1',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota uno',1,1,'2024-10-26 00:48:46'),('5952ad43-9366-11ef-9fc0-54bf6402f80c','Cuenta',8,'Pago cuota 1',100.00,'af8fc785-878b-11ef-9452-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,'Pago de la cuota uno',1,1,'2024-10-26 00:48:46'),('5a36ae22-9297-11ef-94fb-54bf6402f80c','Cuenta',3,'Retiro Cajero',-1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,NULL,'Retiro en cajero automatico',1,1,'2024-10-25 00:07:02'),('5e38b35e-9016-11ef-a6bc-54bf6402f80c','Cuenta',2,'Hospital 1',-350.50,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Consulta medica',NULL,NULL,'2024-10-21 19:38:41'),('6c35f9e5-9359-11ef-9fc0-54bf6402f80c','Cuenta',1,'Deposito en efectivo',5000.00,'af8fc785-878b-11ef-9452-54bf6402f80c',NULL,'e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,'Realiza deposito en efecti en agencia 1',1,1,'2024-10-25 23:16:14'),('782099cc-87aa-11ef-9452-54bf6402f80c','Cuenta',1,'Hospital 1',10.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Primer decuento',NULL,NULL,'2024-10-11 02:26:10'),('7bc19697-901d-11ef-a6bc-54bf6402f80c','Cuenta',2,'Hospital 1',-1300.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Consulta medica',NULL,NULL,'2024-10-21 20:29:37'),('7dc74b1f-9367-11ef-9fc0-54bf6402f80c','Tarjeta',7,'Pago cuota 7',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,NULL,'e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota 7',1,1,'2024-10-26 00:56:57'),('7e5cea66-9a3d-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',-1500.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','953091c6-9758-11ef-aafb-54bf6402f80c',NULL,'Ahorro',1,1,'2024-11-03 17:43:57'),('7e5cfd60-9a3d-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',1500.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','953091c6-9758-11ef-aafb-54bf6402f80c',NULL,'Ahorro',1,1,'2024-11-03 17:43:57'),('8691e5d7-9295-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',-1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia de deuda',1,1,'2024-10-24 23:53:57'),('86929fbf-9295-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia de deuda',1,1,'2024-10-24 23:53:57'),('86df1c53-9298-11ef-94fb-54bf6402f80c','Cuenta',3,'Retiro en cajero 5ta av',-2000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,NULL,'Retiro en cajero',1,1,'2024-10-25 00:15:26'),('889ba362-9367-11ef-9fc0-54bf6402f80c','Tarjeta',7,'Pago cuota 7',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,NULL,'e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota 7',1,1,'2024-10-26 00:57:15'),('8dda49a5-9a42-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',-500.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','162b582d-9761-11ef-aafb-54bf6402f80c',NULL,'Transferenia de prueba desde portal.',1,1,'2024-11-03 18:20:11'),('8dda5e44-9a42-11ef-9d9b-54bf6402f80c','Cuenta',2,'Portal BB Bank',500.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','162b582d-9761-11ef-aafb-54bf6402f80c',NULL,'Transferenia de prueba desde portal.',1,1,'2024-11-03 18:20:11'),('90df27ca-9366-11ef-9fc0-54bf6402f80c','Tarjeta',4,'Pago cuota 1',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota uno',1,1,'2024-10-26 00:50:19'),('90df50e4-9366-11ef-9fc0-54bf6402f80c','Cuenta',8,'Pago cuota 1',100.00,'af8fc785-878b-11ef-9452-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,'Pago de la cuota uno',1,1,'2024-10-26 00:50:19'),('a130a3ad-9295-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',-1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia de deuda',1,1,'2024-10-24 23:54:42'),('a130ec2a-9295-11ef-94fb-54bf6402f80c','Cuenta',2,'Transferencia a cuenta',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia de deuda',1,1,'2024-10-24 23:54:42'),('a2e71b35-9367-11ef-9fc0-54bf6402f80c','Tarjeta',4,'Pago cuota 7',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota 7',1,1,'2024-10-26 00:57:59'),('a2e72b32-9367-11ef-9fc0-54bf6402f80c','Cuenta',8,'Pago cuota 7',100.00,'af8fc785-878b-11ef-9452-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,'Pago de la cuota 7',1,1,'2024-10-26 00:57:59'),('ab2c8340-9018-11ef-a6bc-54bf6402f80c','Cuenta',1,'Cuenta pedro',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Deposito en efectivo',NULL,NULL,'2024-10-21 19:55:09'),('acffd5d7-9359-11ef-9fc0-54bf6402f80c','Cuenta',2,'Transferencia bancaria',-1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia cuota uno prestamo',1,1,'2024-10-25 23:18:03'),('acffe420-9359-11ef-9fc0-54bf6402f80c','Cuenta',2,'Transferencia bancaria',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Transferencia cuota uno prestamo',1,1,'2024-10-25 23:18:03'),('ae6f391a-929f-11ef-94fb-54bf6402f80c','Tarjeta',4,'Cobro Hospital la paz',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de cita medica 2',1,1,'2024-10-25 01:06:39'),('ae6fded3-929f-11ef-94fb-54bf6402f80c','Cuenta',8,'Cobro Hospital la paz',100.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Pago de cita medica 2',1,1,'2024-10-25 01:06:39'),('bb3e06f2-929e-11ef-94fb-54bf6402f80c','Tarjeta',4,'Cobro Hospital la paz',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c','e05928a6-9104-11ef-94af-54bf6402f80c','Pago de cita medica',1,1,'2024-10-25 00:59:51'),('bb8363e8-9297-11ef-94fb-54bf6402f80c','Cuenta',1,'Deposito',10000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Deposito en agencia',1,1,'2024-10-25 00:09:45'),('be047909-9298-11ef-94fb-54bf6402f80c','Cuenta',8,'EGSSA',2000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Cobro mensualidad luz',1,1,'2024-10-25 00:16:59'),('d5eb3dbb-9a3b-11ef-9d9b-54bf6402f80c','Cuenta',3,'Retiro Cajero B5',-1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,NULL,'Retiro cajero B5',1,1,'2024-11-03 17:32:05'),('e286f411-9359-11ef-9fc0-54bf6402f80c','Cuenta',3,'Retiro Cajero B5',-1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,NULL,'Retiro cajero B5',1,1,'2024-10-25 23:19:33'),('e28831f0-9297-11ef-94fb-54bf6402f80c','Cuenta',1,'Transferencia a cuenta',1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Transferencia deuda pendiente',1,1,'2024-10-25 00:10:51'),('e53d3583-9297-11ef-94fb-54bf6402f80c','Cuenta',1,'Transferencia a cuenta',1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Transferencia deuda pendiente',1,1,'2024-10-25 00:10:55'),('e593f6d4-8d08-11ef-975f-54bf6402f80c','Cuenta',1,'Cuenta Pedro',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Transferencia',NULL,NULL,'2024-10-17 22:24:42'),('e6fd3da4-9295-11ef-94fb-54bf6402f80c','Cuenta',3,'Retiro Cajero',-8000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c','5db8f383-9019-11ef-a6bc-54bf6402f80c','96c4f38d-8799-11ef-9452-54bf6402f80c',NULL,'Retiro en cajero automatico',1,1,'2024-10-24 23:56:39'),('e9798a3f-9297-11ef-94fb-54bf6402f80c','Cuenta',1,'Transferencia a cuenta',1000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Transferencia deuda pendiente',1,1,'2024-10-25 00:11:02'),('ebdc88e3-9294-11ef-94fb-54bf6402f80c','Cuenta',1,'Deposito Efectivo',10000.00,'42416ec6-9019-11ef-a6bc-54bf6402f80c',NULL,'5db8f383-9019-11ef-a6bc-54bf6402f80c',NULL,'Deposito en agencia 1',1,1,'2024-10-24 23:49:38'),('ee1e75c3-9ec4-11ef-a0b5-54bf6402f80c','Cuenta',1,'Portal BB Bank',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,'1b00c2ad-975f-11ef-aafb-54bf6402f80c',NULL,'Deposito desde el portal',1,1,'2024-11-09 12:03:31'),('efd4d4a3-9366-11ef-9fc0-54bf6402f80c','Tarjeta',7,'Pago cuota 1',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,NULL,'e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota uno',1,1,'2024-10-26 00:52:59'),('f1315982-87a8-11ef-9452-54bf6402f80c','Cuenta',1,'Transferencia',1000.00,'5e2d364a-878b-11ef-9452-54bf6402f80c','81df9817-8799-11ef-9452-54bf6402f80c',NULL,NULL,'Pago 1',NULL,NULL,'2024-10-11 02:15:14'),('f17c1ceb-9a3b-11ef-9d9b-54bf6402f80c','Cuenta',3,'Retiro Cajero B5',-1000.00,'af8fc785-878b-11ef-9452-54bf6402f80c','e4ac1fe1-9354-11ef-9fc0-54bf6402f80c',NULL,NULL,'Retiro cajero B5',1,1,'2024-11-03 17:32:51'),('f96a475f-9366-11ef-9fc0-54bf6402f80c','Tarjeta',7,'Pago cuota 1',-100.00,'5e2d364a-878b-11ef-9452-54bf6402f80c',NULL,NULL,'e05928a6-9104-11ef-94af-54bf6402f80c','Pago de la cuota uno',1,1,'2024-10-26 00:53:15');
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `user_id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `id_cliente` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role_id` tinyint(4) DEFAULT NULL,
  `datetime_insert` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('19','barreno','5e2d364a-878b-11ef-9452-54bf6402f80c','sdf@sdf.com','$2a$10$N1BlVHciWvcEtdCmrn4Wc.ADmE5RnlW8TTkR2RF7HJfl1LnOlDIuW',2,'2024-10-27 10:52:06'),('2','josei','5e2d364a-878b-11ef-9452-54bf6402f80c','jivan@test.com','$2a$10$3yV4UtkjBmHYv4vyHMLwPeLB/g7jvp8221gzUJ2jRBLvqJctORA6G',1,'2024-10-13 00:48:40'),('6','ivan','5e2d364a-878b-11ef-9452-54bf6402f80c','df@gmail.com','$2a$10$3POynfM5WykIP4YSw6AIh.aI0c8ut4RD9n6YCm7PVDQ3a/nThxruO',2,'2024-10-27 10:14:43');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bancocc6'
--
/*!50003 DROP PROCEDURE IF EXISTS `process_transaction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `process_transaction`(
    IN num_account VARCHAR(50),
    IN type_transaction ENUM('DEPOSITO', 'DESCUENTO'),
    IN amount DOUBLE,
    IN t_product ENUM('Cuenta', 'Tarjeta'),
    IN source VARCHAR(200),
    IN t_description TEXT
)
BEGIN
	DECLARE id_account VARCHAR(50);
    DECLARE current_balance DOUBLE;
    DECLARE id_client VARCHAR(50);

    SELECT c.id_cuenta, c.saldo, e.id_cliente INTO id_account, current_balance, id_client FROM cuentas c
	INNER JOIN clientes e ON e.id_cliente = c.id_cliente WHERE c.num_cuenta = num_account;

    IF current_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cuenta no existe';
    END IF;

    IF type_transaction = 'DEPOSITO' THEN UPDATE cuentas
        SET saldo = saldo + amount WHERE num_cuenta = num_account;

        INSERT INTO transacciones (id_transaccion, producto, origen, monto, id_cliente, id_cuenta, descripcion, fecha_transaccion)
		VALUES(UUID(), t_product, source, amount, id_client, id_account, t_description, NOW());

    ELSEIF type_transaction = 'DESCUENTO' THEN
        IF current_balance < amount THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente';
        ELSE
            UPDATE cuentas SET saldo = saldo - amount WHERE num_cuenta = num_account;

            INSERT INTO transacciones (id_transaccion, producto, origen, monto, id_cliente, id_cuenta, descripcion, fecha_transaccion)
			VALUES(UUID(), t_product, source, amount * -1, id_client, id_account, t_description, NOW());
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de transacción inválido';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `process_transaction_account` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `process_transaction_account`(
    IN num_account VARCHAR(50),
    IN num_account_source VARCHAR(50),
    IN type_transaction INT,
    IN amount DOUBLE,
    IN t_product ENUM('Cuenta'),
    IN source VARCHAR(200),
    IN t_description TEXT,
    IN id_server int,
    IN status_transaction tinyint
)
BEGIN
	DECLARE id_account VARCHAR(50);
    DECLARE id_account_source VARCHAR(50);
    DECLARE current_balance DOUBLE;
    DECLARE source_account TINYINT;
    DECLARE destiny_account TINYINT;
    DECLARE id_client VARCHAR(50);
    DECLARE id_client_source VARCHAR(50);

    SELECT c.id_cuenta, c.saldo, e.id_cliente INTO id_account, current_balance, id_client FROM cuentas c
	INNER JOIN clientes e ON e.id_cliente = c.id_cliente
	WHERE c.num_cuenta = num_account;

    IF current_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cuenta no existe';
    END IF;

    SELECT cuenta_origen, cuenta_destino INTO source_account, destiny_account FROM operaciones_bancarias
    WHERE ref_producto = 'Cuenta' AND id_operacion = type_transaction;

    IF type_transaction IN (1, 8) THEN
        IF source_account = 1 THEN
            SELECT c.id_cuenta, e.id_cliente INTO id_account_source, id_client_source FROM cuentas c
            INNER JOIN clientes e ON e.id_cliente = c.id_cliente
            WHERE c.num_cuenta = num_account_source;

            IF id_account_source IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cuenta origen no existe';
            END IF;
        END IF;

        UPDATE cuentas SET saldo = saldo + amount WHERE num_cuenta = num_account;

        INSERT INTO transacciones (id_transaccion, producto, id_operacion, origen, monto, id_cliente, id_cuenta, id_cuenta_destino, descripcion, id_servidor_transaccion, estado_transaccion, fecha_transaccion)
		VALUES(UUID(), t_product, type_transaction, source, amount, id_client, id_account_source, id_account, t_description, id_server, status_transaction, NOW());

    ELSEIF type_transaction IN (2, 3) THEN
        IF destiny_account = 1 THEN
            SELECT c.id_cuenta, e.id_cliente INTO id_account_source, id_client_source FROM cuentas c
            INNER JOIN clientes e ON e.id_cliente = c.id_cliente
            WHERE c.num_cuenta = num_account_source;
            
            IF id_account_source IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cuenta destino no existe';
            END IF;
        END IF;

        IF current_balance < amount THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente';
        ELSE
            UPDATE cuentas SET saldo = saldo - amount WHERE num_cuenta = num_account;

            INSERT INTO transacciones (id_transaccion, producto, id_operacion, origen, monto, id_cliente, id_cuenta, id_cuenta_destino, descripcion, id_servidor_transaccion, estado_transaccion, fecha_transaccion)
            VALUES(UUID(), t_product, type_transaction, source, amount * -1, id_client, id_account, id_account_source, t_description, id_server, status_transaction, NOW());

            IF destiny_account = 1 THEN 
                UPDATE cuentas SET saldo = saldo + amount WHERE num_cuenta = num_account_source;

                INSERT INTO transacciones (id_transaccion, producto, id_operacion, origen, monto, id_cliente, id_cuenta, id_cuenta_destino, descripcion, id_servidor_transaccion, estado_transaccion, fecha_transaccion)
                VALUES(UUID(), t_product, type_transaction, source, amount, id_client_source, id_account, id_account_source, t_description, id_server, status_transaction, NOW());
            END IF;
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de transacción inválido';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `process_transaction_card` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `process_transaction_card`(
    IN num_debit_card VARCHAR(16),
    IN num_account_destiny VARCHAR(50),
    IN t_product ENUM('Tarjeta'),
    IN source VARCHAR(200),
    IN type_transaction INT,
    IN amount DOUBLE,
    IN t_description VARCHAR(255),
    IN id_server int,
    IN status_transaction tinyint
)
BEGIN
    DECLARE id_account VARCHAR(50);
    DECLARE id_card VARCHAR(50);
    DECLARE num_account VARCHAR(50);
    DECLARE id_account_destiny VARCHAR(50);
    DECLARE current_balance DOUBLE;
    DECLARE source_account TINYINT;
    DECLARE destiny_account TINYINT;
    DECLARE id_client VARCHAR(50);
    
    SELECT c.num_cuenta, t.id_tarjeta, c.saldo, e.id_cliente INTO num_account, id_card, current_balance, id_client FROM tarjetas t
    INNER JOIN clientes e ON e.id_cliente = t.id_cliente
    INNER JOIN cuentas c ON c.id_cuenta = t.id_ref_cuenta 
    WHERE t.id_tipo_tarjeta = 2 AND t.no_tarjeta = num_debit_card;
    
    IF id_card IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La tarjeta de debito no existe.';
    END IF;

    SELECT cuenta_origen, cuenta_destino INTO source_account, destiny_account FROM operaciones_bancarias
    WHERE ref_producto = 'Tarjeta de debito' AND id_operacion = type_transaction;

    IF source_account IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de transacción para tarjeta de debito inválida.';
    END IF;
    
    IF current_balance < amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente.';
    ELSE

        IF destiny_account = 1 THEN
            SELECT c.id_cuenta INTO id_account_destiny FROM cuentas c
            INNER JOIN clientes e ON e.id_cliente = c.id_cliente
            WHERE c.num_cuenta = num_account_destiny;
            
            IF id_account_destiny IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cuenta a acreditar no existe.';
            END IF;
        END IF;

        UPDATE cuentas SET saldo = saldo - amount WHERE num_cuenta = num_account;
        
        INSERT INTO transacciones (id_transaccion, producto, id_operacion, origen, monto, id_cliente, id_cuenta, id_cuenta_destino, id_tarjeta, descripcion, id_servidor_transaccion, estado_transaccion, fecha_transaccion)
        VALUES(UUID(), t_product, type_transaction, source, amount * -1, id_client, id_account, id_account_destiny, id_card, t_description, id_server, status_transaction, NOW());        

        IF destiny_account = 1 THEN
            CALL process_transaction_account(num_account_destiny, num_account, 8, amount, 'Cuenta', source, t_description, id_server, status_transaction);
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;