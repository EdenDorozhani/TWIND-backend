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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentLikes`
--

LOCK TABLES `commentLikes` WRITE;
/*!40000 ALTER TABLE `commentLikes` DISABLE KEYS */;
INSERT INTO `commentLikes` VALUES (7,26,21),(8,26,19),(10,26,6),(11,26,5),(19,26,42),(21,26,43),(22,26,44),(25,26,53),(27,26,55),(28,26,65),(31,26,179),(32,26,176),(38,31,180),(39,31,179),(40,31,178),(43,26,178),(45,26,185),(46,26,180),(47,26,186),(48,26,184),(49,26,199),(50,26,200),(51,26,201),(52,26,202),(53,26,226),(59,26,274),(60,32,297),(64,26,298),(65,26,297);
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
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (261,26,47,'EDEN','2024-01-04T16:48:58.667Z',NULL),(262,26,47,'DOROZHANI','2024-01-04T16:49:03.945Z',NULL),(263,26,47,'@edorozhani 1','2024-01-04T16:49:09.373Z','262'),(264,26,47,'@edorozhani 2','2024-01-04T16:49:14.548Z','261'),(265,26,47,'@edorozhani dwadad','2024-01-05T11:03:45.400Z','262'),(266,26,47,'jkihwandawbdawbudahwdbawdbawbdwahdbahbdahbdhaibdaiudbaiaidbakdbajibdwaibdawinajibnawidbnwaidbnawda','2024-01-05T18:57:44.325Z',NULL),(269,26,47,'@edorozhani dwadadadadad','2024-01-09T13:10:21.866Z','262'),(270,26,47,'@edorozhani dwadada','2024-01-09T13:38:06.339Z','262'),(271,26,47,'@edorozhani dwadadawd','2024-01-09T14:03:27.348Z','261'),(272,26,47,'@edorozhani dwadwadwadwa','2024-01-09T14:03:33.740Z','261'),(273,26,47,'awdawdawdawd','2024-01-09T14:16:52.999Z',NULL),(274,26,47,'dwadadawd','2024-01-09T14:19:16.047Z',NULL),(275,26,45,'wdawdwadwad','2024-01-10T09:35:56.593Z',NULL),(277,26,45,'@edorozhani dwadadawd','2024-01-10T09:36:01.409Z','276'),(278,26,45,'@edorozhani dwadadawdawd','2024-01-10T09:36:04.269Z','276'),(290,26,45,'wdadawdawd','2024-01-10T10:17:28.346Z',NULL),(296,32,26,'dwadadawda','2024-01-10T17:26:16.504Z',NULL),(297,32,26,'wdadadadada','2024-01-10T17:26:19.118Z',NULL),(298,32,26,'@rrezja dwadadadad','2024-01-10T17:26:21.888Z','297'),(299,32,26,'@rrezja dwadadadawd','2024-01-10T17:26:35.564Z','297'),(300,32,26,'@rrezja dwadadada','2024-01-10T17:27:31.864Z','296'),(301,32,26,'@rrezja dwadawd','2024-01-10T17:29:32.908Z','296'),(302,32,26,'@rrezja dwadadwad','2024-01-10T17:30:46.127Z','296'),(303,32,26,'@rrezja dwadadwad','2024-01-10T17:32:50.049Z','297'),(304,32,26,'@rrezja dwadadwad','2024-01-10T17:33:33.591Z','297');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `followId` int unsigned NOT NULL AUTO_INCREMENT,
  `followerId` int NOT NULL,
  `followingId` int NOT NULL,
  PRIMARY KEY (`followId`),
  UNIQUE KEY `followId_UNIQUE` (`followId`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (26,32,26),(35,26,31),(74,26,32),(75,26,27),(77,26,32);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (25,'images/2023-12-14T18:00:26.071Z-Screenshot from 2023-12-14 11-17-29.png','dwadadad','2023-12-14T18:00:26.081Z','Dubai',31),(26,'images/2023-12-25T19:06:13.869Z-WhatsApp Image 2023-12-25 at 19.54.39.jpeg','sunset','2023-12-25T19:06:13.887Z','Tirana',32);
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
) ENGINE=InnoDB AUTO_INCREMENT=883 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsLikes`
--

LOCK TABLES `postsLikes` WRITE;
/*!40000 ALTER TABLE `postsLikes` DISABLE KEYS */;
INSERT INTO `postsLikes` VALUES (37,'31','19'),(38,'31','18'),(52,'31','15'),(59,'31','12'),(61,'31','14'),(62,'31','13'),(72,'31','20'),(73,'31','21'),(853,'26','22'),(856,'26','2'),(857,'31','24'),(864,'26','25'),(865,'26','26'),(866,'26','31'),(867,'26','24'),(870,'26','46'),(871,'26','48'),(875,'26','45'),(876,'26','47'),(877,'26','20'),(880,'26','50'),(881,'31','26'),(882,'32','26');
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
INSERT INTO `users` VALUES (26,'eden','dorozhani','edorozhani','','Åland Islands','images/2024-01-10T10:55:01.607Z-WhatsApp Image 2023-11-27 at 14.10.25.jpeg','eden@gmail.com','$2a$12$ZQ8p0Npg1XSPcl8nKxe0Zu7pNNt7QJkk2fGfaiUszNNRmWRXC.hKi'),(27,'ermonela','metushi','ela1',NULL,'Albania','images/Default_pfp.svg.png','ela1@gmail.com','$2a$12$oBOowugiQKyjL0psLWh/MuJ.0WYImdXUkFC2Pxmv5sqn/SlQBisx2'),(28,'aldo','xhafaj','xhafaj1',NULL,'Albania','images/Default_pfp.svg.png','xhafaj@gmail.com','$2a$12$ewP9J5WorRYlqUFlp144teaEAdJVfM4RrZ/Tr.SE/I2K/9wpteize'),(29,'zenel','rrushi','rrushizenel',NULL,'Albania','images/Default_pfp.svg.png','zenel@gmail.com','$2a$12$pxL6EY5TPlBbZclOWolLbe3H.DpWjU/xr74bLTEctVZRL.ox6Nt/K'),(30,'edison','biba','biba10',NULL,'Albania','images/Default_pfp.svg.png','biba10@gmail.com','$2a$12$kqojWqavuZ3jbZu1AKYIWe49czN582flCC9aIbUJ41dEblKbwNcWC'),(31,'ana','metushi','metushi15',NULL,'Albania','images/Default_pfp.svg.png','metushi15@gmail.com','$2a$12$aZVYv5UhFWNBh8KAug6dtO5yf5xxgQo7lNec2fv2jpc8YiGLicSqa'),(32,'rezarta','sadikaj','rrezja',NULL,'Albania','images/2023-12-25T18:57:02.282Z-WhatsApp Image 2023-12-25 at 19.54.39.jpeg','rrezja15@gmail.com','$2a$12$wB4wQdsESo6DNmo7zDBreOEcnKZJoDH06oNrYw3klbbyzt2Fy9wr.'),(33,'fermando','minaj','ferdi',NULL,'Albania','images/Default_pfp.svg.png','ferdi@gmail.com','$2a$12$rMSf4py/h2HOtR6d3rO.M.C488ZuA6YnuzH6oU.ifv/w9/msZ70VC');
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

-- Dump completed on 2024-01-12 21:08:12