CREATE DATABASE  IF NOT EXISTS `ezgotranslate` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ezgotranslate`;
-- MySQL dump 10.14  Distrib 5.5.33-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ezgotranslate
-- ------------------------------------------------------
-- Server version	5.5.33-MariaDB

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
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infos`
--

DROP TABLE IF EXISTS `infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infos` (
  `info_id` varchar(128) NOT NULL DEFAULT '',
  `info_content` text,
  `info_language` varchar(45) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infos`
--

LOCK TABLES `infos` WRITE;
/*!40000 ALTER TABLE `infos` DISABLE KEYS */;
INSERT INTO `infos` VALUES ('14104441145411ab52054d23.99321960','',NULL,'2014-09-20 03:40:14',NULL,'2014-09-20 03:40:14'),('141044610615411b31aab1fd','hahaha','en','2014-10-14 03:40:51','2014-09-11 06:35:06','2014-10-14 03:40:51'),('141068563354155ac1a9da31.91101597','hi','en','2014-09-14 01:07:13','2014-09-14 01:07:13',NULL),('1413286885543d0be54de0b8.51770617','hehe','en','2014-10-14 03:41:25','2014-10-14 03:41:25',NULL);
/*!40000 ALTER TABLE `infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `roles_id` varchar(128) NOT NULL,
  `role_name` varchar(128) NOT NULL,
  PRIMARY KEY (`roles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translates`
--

DROP TABLE IF EXISTS `translates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translates` (
  `translate_id` varchar(128) NOT NULL,
  `info_id` varchar(128) DEFAULT NULL,
  `translate_language` varchar(128) DEFAULT NULL,
  `translate_result` text,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`translate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translates`
--

LOCK TABLES `translates` WRITE;
/*!40000 ALTER TABLE `translates` DISABLE KEYS */;
INSERT INTO `translates` VALUES ('1413287190543d0d16792825.01343826','141068563354155ac1a9da31.91101597','cn','嗨','2014-10-14 03:51:08','2014-10-14 03:46:30','2014-10-14 03:51:08'),('1413287394543d0de2f14222.06357417','141068563354155ac1a9da31.91101597','cns','嗨','2014-10-14 03:49:54','2014-10-14 03:49:54',NULL),('1413287921543d0ff17601b1.38465458','141068563354155ac1a9da31.91101597','cns','嗨','2014-10-14 03:58:41','2014-10-14 03:58:41',NULL);
/*!40000 ALTER TABLE `translates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(128) NOT NULL,
  `user_nickname` varchar(1024) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL,
  `user_email` varchar(1024) DEFAULT NULL,
  `remember_token` varchar(128) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `user_location` varchar(45) DEFAULT NULL,
  `user_translate` text,
  `user_adout` text,
  `user_sex` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'a','啊','$2y$10$GUfkA1AfmFljPg6nkTjQR.YPlT.4WW8UdbtxYYfBLwXbqM2uerXd2','a@ezgotranslate.com',NULL,NULL,NULL,'重庆','中文','关于我','男'),(2,'ff',NULL,'$2y$10$CrnlMtDf6QE6XtCkvvi/WeGSG9VEvaKwqjax.8Oq77KSMuW8IgSVK','das',NULL,'2014-07-14 05:25:06','2014-07-14 05:25:06',NULL,NULL,NULL,NULL),(3,'aaa',NULL,'$2y$10$GUfkA1AfmFljPg6nkTjQR.YPlT.4WW8UdbtxYYfBLwXbqM2uerXd2',NULL,NULL,'2014-10-14 04:12:27','2014-10-14 04:12:27',NULL,NULL,NULL,NULL),(4,'ada',NULL,'$2y$10$l.LVGIe3.eNlQTMcGRIMLu16WyS/1PpvxRq5O89oqDypR7YZJ61Hy',NULL,NULL,'2014-10-14 04:14:50','2014-10-14 04:14:50','四川','中文',NULL,'女'),(6,'adaaa','啊大','$2y$10$bFlADc85A2mvsU8r3tIBfOGSW8nCGyj/eyWcfOiuGFviPaC8paJuS',NULL,NULL,'2014-10-14 04:15:37','2014-10-14 04:15:37','四川','中文',NULL,'女');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-02 16:55:20
