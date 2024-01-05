-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: twind
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentLikes`
--

DROP TABLE IF EXISTS `commentLikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentLikes` (
  `likeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `commentId` int NOT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likeId_UNIQUE` (`likeId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentLikes`
--

LOCK TABLES `commentLikes` WRITE;
/*!40000 ALTER TABLE `commentLikes` DISABLE KEYS */;
INSERT INTO `commentLikes` VALUES (7,26,21),(8,26,19),(10,26,6),(11,26,5),(19,26,42),(21,26,43),(22,26,44),(25,26,53),(27,26,55),(28,26,65),(31,26,179),(32,26,176),(38,31,180),(39,31,179),(40,31,178),(43,26,178),(45,26,185),(46,26,180),(47,26,186),(48,26,184),(49,26,199),(50,26,200),(51,26,201),(52,26,202),(53,26,226);
/*!40000 ALTER TABLE `commentLikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `description` text NOT NULL,
  `createdAt` text NOT NULL,
  `reply` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (261,26,47,'EDEN','2024-01-04T16:48:58.667Z',NULL),(262,26,47,'DOROZHANI','2024-01-04T16:49:03.945Z',NULL),(263,26,47,'@edorozhani 1','2024-01-04T16:49:09.373Z','262'),(264,26,47,'@edorozhani 2','2024-01-04T16:49:14.548Z','261'),(265,26,47,'@edorozhani dwadad','2024-01-05T11:03:45.400Z','262');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userId` int NOT NULL,
  `followerId` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` int unsigned NOT NULL AUTO_INCREMENT,
  `postImage` text NOT NULL,
  `caption` text,
  `createdAt` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `creatorId` int NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `id_UNIQUE` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (20,'images/2023-12-01T16:42:34.084Z-Screenshot from 2023-11-16 17-18-58.png','dawwaaw','2023-12-01T16:42:34.089Z','Al Ain',31),(24,'images/2023-12-09T14:45:31.047Z-like-a-bird.jpg','egfsefewrw','2023-12-09T14:45:31.054Z','Vlorë',26),(25,'images/2023-12-14T18:00:26.071Z-Screenshot from 2023-12-14 11-17-29.png','dwadadad','2023-12-14T18:00:26.081Z','Dubai',31),(26,'images/2023-12-25T19:06:13.869Z-WhatsApp Image 2023-12-25 at 19.54.39.jpeg','sunset','2023-12-25T19:06:13.887Z','Tirana',32),(45,'images/2023-12-28T11:26:25.304Z-combe-pullup.webp',NULL,'2023-12-28T11:26:25.307Z',NULL,26),(46,'images/2023-12-28T11:26:30.880Z-Screenshot from 2023-12-14 11-17-29.png',NULL,'2023-12-28T11:26:30.882Z',NULL,26),(47,'images/2023-12-29T17:53:41.545Z-Screenshot from 2023-12-14 11-21-23.png',NULL,'2023-12-29T12:36:52.056Z',NULL,26),(50,'images/2024-01-04T16:27:50.011Z-WhatsApp Image 2023-12-20 at 10.08.07.jpeg',NULL,'2024-01-04T16:27:50.021Z',NULL,26),(51,'images/2024-01-04T16:27:53.926Z-combe-pullup.webp',NULL,'2024-01-04T16:27:53.929Z',NULL,26);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postsLikes`
--

DROP TABLE IF EXISTS `postsLikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postsLikes` (
  `likeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `postId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likesId_UNIQUE` (`likeId`)
) ENGINE=InnoDB AUTO_INCREMENT=877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsLikes`
--

LOCK TABLES `postsLikes` WRITE;
/*!40000 ALTER TABLE `postsLikes` DISABLE KEYS */;
INSERT INTO `postsLikes` VALUES (37,'31','19'),(38,'31','18'),(52,'31','15'),(59,'31','12'),(61,'31','14'),(62,'31','13'),(72,'31','20'),(73,'31','21'),(851,'26','20'),(853,'26','22'),(856,'26','2'),(857,'31','24'),(864,'26','25'),(865,'26','26'),(866,'26','31'),(867,'26','24'),(870,'26','46'),(871,'26','48'),(875,'26','45'),(876,'26','47');
/*!40000 ALTER TABLE `postsLikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(35) NOT NULL,
  `lastname` varchar(35) NOT NULL,
  `username` varchar(70) NOT NULL,
  `about` text,
  `country` varchar(35) NOT NULL,
  `userImgURL` text,
  `email` varchar(55) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (26,'eden','dorozhani','edorozhani','','Åland Islands','images/2023-12-25T18:36:25.635Z-combe-pullup.webp','eden@gmail.com','$2a$12$ZQ8p0Npg1XSPcl8nKxe0Zu7pNNt7QJkk2fGfaiUszNNRmWRXC.hKi'),(27,'ermonela','metushi','ela1',NULL,'Albania','images/Default_pfp.svg.png','ela1@gmail.com','$2a$12$oBOowugiQKyjL0psLWh/MuJ.0WYImdXUkFC2Pxmv5sqn/SlQBisx2'),(28,'aldo','xhafaj','xhafaj1',NULL,'Albania','images/Default_pfp.svg.png','xhafaj@gmail.com','$2a$12$ewP9J5WorRYlqUFlp144teaEAdJVfM4RrZ/Tr.SE/I2K/9wpteize'),(29,'zenel','rrushi','rrushizenel',NULL,'Albania','images/Default_pfp.svg.png','zenel@gmail.com','$2a$12$pxL6EY5TPlBbZclOWolLbe3H.DpWjU/xr74bLTEctVZRL.ox6Nt/K'),(30,'edison','biba','biba10',NULL,'Albania','images/Default_pfp.svg.png','biba10@gmail.com','$2a$12$kqojWqavuZ3jbZu1AKYIWe49czN582flCC9aIbUJ41dEblKbwNcWC'),(31,'ana','metushi','metushi15',NULL,'Albania','images/Default_pfp.svg.png','metushi15@gmail.com','$2a$12$aZVYv5UhFWNBh8KAug6dtO5yf5xxgQo7lNec2fv2jpc8YiGLicSqa'),(32,'rezarta','sadikaj','rrezja',NULL,'Albania','images/2023-12-25T18:57:02.282Z-WhatsApp Image 2023-12-25 at 19.54.39.jpeg','rrezja15@gmail.com','$2a$12$wB4wQdsESo6DNmo7zDBreOEcnKZJoDH06oNrYw3klbbyzt2Fy9wr.'),(33,'fermando','minaj','ferdi',NULL,'Albania','images/Default_pfp.svg.png','ferdi@gmail.com','$2a$12$rMSf4py/h2HOtR6d3rO.M.C488ZuA6YnuzH6oU.ifv/w9/msZ70VC');
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

-- Dump completed on 2024-01-05 19:32:47
