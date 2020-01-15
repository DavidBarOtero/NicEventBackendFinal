-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: finalDb
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cities`
--

DROP TABLE IF EXISTS `Cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cities` (
  `idCity` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text,
  PRIMARY KEY (`idCity`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cities`
--

LOCK TABLES `Cities` WRITE;
/*!40000 ALTER TABLE `Cities` DISABLE KEYS */;
INSERT INTO `Cities` VALUES (1,'Alaba'),(2,'Albacete'),(3,'Alicante'),(4,'Almeria'),(5,'Avila'),(6,'Badajoz'),(7,'Baleares'),(8,'Barcelona'),(9,'Burgos'),(10,'Cáceres'),(11,'Cádiz'),(12,'Castellón'),(13,'Ciudad Real'),(14,'Córdoba'),(15,'Coruña,A'),(16,'Cuenca'),(17,'Girona'),(18,'Granada'),(19,'Guadalajara'),(20,'Gipuzkoa'),(21,'Huelva'),(22,'Huesca'),(23,'Jaén'),(24,'León'),(25,'Llevaluea'),(26,'La Rioja'),(27,'Lugo'),(28,'Madrid'),(29,'Malaga'),(30,'Murcia'),(31,'Navarra'),(32,'Ourense'),(33,'Asturias'),(34,'Palencia'),(35,'Palmas,Las'),(36,'Pontevedra'),(37,'Salamanca'),(38,'Santa Cruz de Tenerife'),(39,'Cantabria'),(40,'Segovia'),(41,'Sevilla'),(42,'Soria'),(43,'Tarragona'),(44,'Teruel'),(45,'Toledo'),(46,'Valencia'),(47,'Valladolid'),(48,'Bizkaia'),(49,'Zamora'),(50,'Zaragoza'),(51,'Ceuta'),(52,'Melilla');
/*!40000 ALTER TABLE `Cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `idEvents` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Date` varchar(45) DEFAULT NULL,
  `idCity` int(11) DEFAULT NULL,
  `idOrganizer` int(11) DEFAULT NULL,
  `Description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEvents`),
  KEY `fk_Events_1_idx` (`idCity`),
  KEY `fk_EventsUser_2_idx` (`idOrganizer`),
  CONSTRAINT `fk_EventsUser_1` FOREIGN KEY (`idCity`) REFERENCES `Cities` (`idCity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_EventsUser_2` FOREIGN KEY (`idOrganizer`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EventsProfessional`
--

DROP TABLE IF EXISTS `EventsProfessional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventsProfessional` (
  `idEventsProfessional` int(11) NOT NULL AUTO_INCREMENT,
  `idProfessional` int(11) DEFAULT NULL,
  `IdEvent` int(11) DEFAULT NULL,
  `Paid` bit(1) DEFAULT NULL,
  `Confirmed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idEventsProfessional`),
  KEY `fk_EventsProfessional_1_idx` (`IdEvent`),
  KEY `fk_EventsProfessional_2_idx` (`idProfessional`),
  CONSTRAINT `fk_EventsProfessional_1` FOREIGN KEY (`idProfessional`) REFERENCES `Professionals` (`idProfessional`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_EventsProfessional_2` FOREIGN KEY (`IdEvent`) REFERENCES `Events` (`idEvents`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventsProfessional`
--

LOCK TABLES `EventsProfessional` WRITE;
/*!40000 ALTER TABLE `EventsProfessional` DISABLE KEYS */;
/*!40000 ALTER TABLE `EventsProfessional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profession`
--

DROP TABLE IF EXISTS `Profession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profession` (
  `idProfession` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`idProfession`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profession`
--

LOCK TABLES `Profession` WRITE;
/*!40000 ALTER TABLE `Profession` DISABLE KEYS */;
INSERT INTO `Profession` VALUES (1,'Artistas'),(2,'Animación'),(3,'Cathering'),(4,'Fotografía'),(5,'Iluminación'),(6,'Sonorización');
/*!40000 ALTER TABLE `Profession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Professionals`
--

DROP TABLE IF EXISTS `Professionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Professionals` (
  `idProfessional` int(11) NOT NULL AUTO_INCREMENT,
  `idProfession` int(11) DEFAULT NULL,
  `idCity` int(11) DEFAULT NULL,
  `Fee` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfessional`),
  KEY `fk_Professionals_1_idx` (`idCity`),
  KEY `fk_Professionals_2_idx` (`idProfession`),
  KEY `fk_Professionals_4_idx` (`idUser`),
  CONSTRAINT `fk_Professionals_1` FOREIGN KEY (`idCity`) REFERENCES `Cities` (`idCity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Professionals_2` FOREIGN KEY (`idProfession`) REFERENCES `Profession` (`idProfession`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Professionals_3` FOREIGN KEY (`idProfessional`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Professionals_4` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Professionals`
--

LOCK TABLES `Professionals` WRITE;
/*!40000 ALTER TABLE `Professionals` DISABLE KEYS */;
/*!40000 ALTER TABLE `Professionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProfessionalsEvents`
--

DROP TABLE IF EXISTS `ProfessionalsEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ProfessionalsEvents` (
  `idProfessionalsEvents` int(11) NOT NULL,
  `idProfessional` int(11) NOT NULL,
  `idEvent` int(11) NOT NULL,
  `Paid` int(11) DEFAULT NULL,
  `Confirmed` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProfessionalsEvents`),
  KEY `fk_ProfessionalsEvents_Professional_idx` (`idProfessional`),
  KEY `fk_ProfessionalsEvents_Event_idx` (`idEvent`),
  CONSTRAINT `fk_ProfessionalsEvents_Event` FOREIGN KEY (`idEvent`) REFERENCES `Events` (`idEvents`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProfessionalsEvents_Professional` FOREIGN KEY (`idProfessional`) REFERENCES `Professionals` (`idProfessional`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProfessionalsEvents`
--

LOCK TABLES `ProfessionalsEvents` WRITE;
/*!40000 ALTER TABLE `ProfessionalsEvents` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProfessionalsEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ratings`
--

DROP TABLE IF EXISTS `Ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ratings` (
  `idRatings` int(11) NOT NULL AUTO_INCREMENT,
  `idEvent` int(11) DEFAULT NULL,
  `Evaluator` int(11) DEFAULT NULL,
  `Rated` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRatings`),
  KEY `fk_Ratings_1_idx` (`idEvent`),
  KEY `fk_Ratings_2_idx` (`Rated`),
  KEY `fk_Ratings_3_idx` (`Evaluator`),
  CONSTRAINT `fk_Ratings_1` FOREIGN KEY (`idEvent`) REFERENCES `Events` (`idEvents`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ratings_2` FOREIGN KEY (`Rated`) REFERENCES `Professionals` (`idProfessional`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ratings_3` FOREIGN KEY (`Evaluator`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ratings`
--

LOCK TABLES `Ratings` WRITE;
/*!40000 ALTER TABLE `Ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Password` char(60) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `CreatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (3,'Manuel','Rogriguez Marte','$2b$10$R5NICWyOSKkv.LnZUygqmuKwmmp0EVf6HwcEOHNYDpdapNCkcLF6S','Rodri43@gmail.com','2020-01-09 03:48:10'),(4,'Alejandro','Rogriguez Garcia','$2b$10$d9vs0UZ8Okn5S3LXYmzJrOiL0N/jZ5i4lPPYMozubW6EIkD/xBpDO','alexsito@gmail.com','2020-01-09 03:48:48'),(5,'Ana','Vidal Sanchez','$2b$10$iaYjsT/xOH9.1T9YS0Oe7Osv4CANYkN13WrOiYx1buYBCZBffAQE.','fresida87@gmail.com','2020-01-09 03:54:57');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-09 14:45:41
