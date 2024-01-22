-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: twind
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `commentlikes`
--

DROP TABLE IF EXISTS `commentlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentlikes` (
  `likeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `commentId` int NOT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likeId_UNIQUE` (`likeId`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentlikes`
--

LOCK TABLES `commentlikes` WRITE;
/*!40000 ALTER TABLE `commentlikes` DISABLE KEYS */;
INSERT INTO `commentlikes` VALUES (7,26,21),(8,26,19),(10,26,6),(11,26,5),(19,26,42),(21,26,43),(22,26,44),(25,26,53),(27,26,55),(28,26,65),(31,26,179),(32,26,176),(38,31,180),(39,31,179),(40,31,178),(43,26,178),(45,26,185),(46,26,180),(47,26,186),(48,26,184),(49,26,199),(50,26,200),(51,26,201),(52,26,202),(53,26,226),(59,26,274),(60,32,297),(64,26,298),(65,26,297);
/*!40000 ALTER TABLE `commentlikes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (261,26,47,'EDEN','2024-01-04T16:48:58.667Z',NULL),(262,26,47,'DOROZHANI','2024-01-04T16:49:03.945Z',NULL),(263,26,47,'@edorozhani 1','2024-01-04T16:49:09.373Z','262'),(264,26,47,'@edorozhani 2','2024-01-04T16:49:14.548Z','261'),(265,26,47,'@edorozhani dwadad','2024-01-05T11:03:45.400Z','262'),(266,26,47,'jkihwandawbdawbudahwdbawdbawbdwahdbahbdahbdhaibdaiudbaiaidbakdbajibdwaibdawinajibnawidbnwaidbnawda','2024-01-05T18:57:44.325Z',NULL),(269,26,47,'@edorozhani dwadadadadad','2024-01-09T13:10:21.866Z','262'),(270,26,47,'@edorozhani dwadada','2024-01-09T13:38:06.339Z','262'),(271,26,47,'@edorozhani dwadadawd','2024-01-09T14:03:27.348Z','261'),(272,26,47,'@edorozhani dwadwadwadwa','2024-01-09T14:03:33.740Z','261'),(273,26,47,'awdawdawdawd','2024-01-09T14:16:52.999Z',NULL),(274,26,47,'dwadadawd','2024-01-09T14:19:16.047Z',NULL),(275,26,45,'wdawdwadwad','2024-01-10T09:35:56.593Z',NULL),(277,26,45,'@edorozhani dwadadawd','2024-01-10T09:36:01.409Z','276'),(278,26,45,'@edorozhani dwadadawdawd','2024-01-10T09:36:04.269Z','276'),(290,26,45,'wdadawdawd','2024-01-10T10:17:28.346Z',NULL),(296,32,26,'dwadadawda','2024-01-10T17:26:16.504Z',NULL),(297,32,26,'wdadadadada','2024-01-10T17:26:19.118Z',NULL),(298,32,26,'@rrezja dwadadadad','2024-01-10T17:26:21.888Z','297'),(299,32,26,'@rrezja dwadadadawd','2024-01-10T17:26:35.564Z','297'),(300,32,26,'@rrezja dwadadada','2024-01-10T17:27:31.864Z','296'),(301,32,26,'@rrezja dwadawd','2024-01-10T17:29:32.908Z','296'),(302,32,26,'@rrezja dwadadwad','2024-01-10T17:30:46.127Z','296'),(303,32,26,'@rrezja dwadadwad','2024-01-10T17:32:50.049Z','297'),(304,32,26,'@rrezja dwadadwad','2024-01-10T17:33:33.591Z','297'),(306,36,26,'shum bkr','2024-01-15T16:28:24.908Z',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2026 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (26,32,26),(75,26,27),(76,26,33),(77,26,30),(78,26,29),(167,26,28),(187,26,34),(199,26,35),(201,36,26),(202,26,36),(203,26,37),(204,36,30),(205,36,32),(206,26,38),(207,38,27),(209,26,41),(2015,26,39),(2018,26,43),(2019,26,31),(2020,45,26),(2021,45,36),(2023,26,45),(2024,26,32),(2025,26,40);
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (25,'images/2023-12-14T18:00:26.071Z-Screenshot from 2023-12-14 11-17-29.png','dwadadad','2023-12-14T18:00:26.081Z','Dubai',31),(26,'images\\2024-01-20T12-36-32.234Z-WhatsApp Image 2023-12-25 at 19.54.37.jpeg','sunset','2023-12-25T19:06:13.887Z','Tirana',32),(53,'images/2024-01-15T09:51:44.609Z-Screenshot from 2024-01-10 12-03-56.png',NULL,'2024-01-15T09:51:44.620Z','Albania',26),(54,'images/2024-01-15T10:39:37.907Z-Screenshot from 2024-01-10 12-03-56.png',NULL,'2024-01-15T10:39:37.913Z',NULL,26),(55,'images/2024-01-15T10:39:49.748Z-Screenshot from 2023-12-06 10-58-55.png',NULL,'2024-01-15T10:39:49.755Z',NULL,26),(57,'images/2024-01-16T13:12:13.575Z-Screenshot from 2023-11-28 15-37-14.png',NULL,'2024-01-16T13:12:13.578Z',NULL,26),(58,'images/2024-01-16T13:12:17.659Z-Screenshot from 2023-11-28 15-37-14.png',NULL,'2024-01-16T13:12:17.661Z',NULL,26),(59,'images/2024-01-16T13:12:20.996Z-Screenshot from 2024-01-10 12-03-56.png',NULL,'2024-01-16T13:12:20.999Z',NULL,26),(60,'images/2024-01-16T13:12:25.866Z-Screenshot from 2023-12-06 10-58-55.png',NULL,'2024-01-16T13:12:25.869Z',NULL,26),(62,'images/2024-01-16T13:12:37.043Z-Screenshot from 2023-12-06 10-58-55.png',NULL,'2024-01-16T13:12:37.046Z',NULL,26),(65,'images\\2024-01-20T10-41-43.929Z-assignments.py.png','2dwdadwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2dwdadwaaaaaaaaaaaa','2024-01-20T10:41:43.943Z',NULL,40),(66,'images\\2024-01-20T12-02-30.492Z-assignments.py (2).png',NULL,'2024-01-20T12:02:30.499Z',NULL,45);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postslikes`
--

DROP TABLE IF EXISTS `postslikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postslikes` (
  `likeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `postId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likesId_UNIQUE` (`likeId`)
) ENGINE=InnoDB AUTO_INCREMENT=897 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postslikes`
--

LOCK TABLES `postslikes` WRITE;
/*!40000 ALTER TABLE `postslikes` DISABLE KEYS */;
INSERT INTO `postslikes` VALUES (37,'31','19'),(38,'31','18'),(52,'31','15'),(59,'31','12'),(61,'31','14'),(62,'31','13'),(72,'31','20'),(73,'31','21'),(853,'26','22'),(856,'26','2'),(857,'31','24'),(866,'26','31'),(867,'26','24'),(870,'26','46'),(871,'26','48'),(875,'26','45'),(876,'26','47'),(877,'26','20'),(880,'26','50'),(881,'31','26'),(882,'32','26'),(884,'36','53'),(885,'36','26'),(886,'26','53'),(888,'26','62'),(889,'45','53'),(890,'26','67'),(892,'26','65'),(895,'26','26'),(896,'26','25');
/*!40000 ALTER TABLE `postslikes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (26,'eden','dorozhani','edorozhani','','Albania','images\\2024-01-20T12-38-06.116Z-WhatsApp Image 2024-01-20 at 13.37.51.jpeg','eden@gmail.com','$2a$12$ZQ8p0Npg1XSPcl8nKxe0Zu7pNNt7QJkk2fGfaiUszNNRmWRXC.hKi'),(27,'ermonela','metushi','ela1',NULL,'Albania','images/Default_pfp.svg.png','ela1@gmail.com','$2a$12$oBOowugiQKyjL0psLWh/MuJ.0WYImdXUkFC2Pxmv5sqn/SlQBisx2'),(28,'aldo','xhafaj','xhafaj1',NULL,'Albania','images/Default_pfp.svg.png','xhafaj@gmail.com','$2a$12$ewP9J5WorRYlqUFlp144teaEAdJVfM4RrZ/Tr.SE/I2K/9wpteize'),(29,'zenel','rrushi','rrushizenel',NULL,'Albania','images/Default_pfp.svg.png','zenel@gmail.com','$2a$12$pxL6EY5TPlBbZclOWolLbe3H.DpWjU/xr74bLTEctVZRL.ox6Nt/K'),(30,'edison','biba','biba10',NULL,'Albania','images/Default_pfp.svg.png','biba10@gmail.com','$2a$12$kqojWqavuZ3jbZu1AKYIWe49czN582flCC9aIbUJ41dEblKbwNcWC'),(31,'ana','metushi','metushi15',NULL,'Albania','images/Default_pfp.svg.png','metushi15@gmail.com','$2a$12$aZVYv5UhFWNBh8KAug6dtO5yf5xxgQo7lNec2fv2jpc8YiGLicSqa'),(32,'rezarta','sadikaj','rrezja',NULL,'Albania','images\\2024-01-20T12-36-42.449Z-WhatsApp Image 2023-12-25 at 19.54.37.jpeg','rrezja15@gmail.com','$2a$12$wB4wQdsESo6DNmo7zDBreOEcnKZJoDH06oNrYw3klbbyzt2Fy9wr.'),(33,'fermando','minaj','ferdi',NULL,'Albania','images/Default_pfp.svg.png','ferdi@gmail.com','$2a$12$rMSf4py/h2HOtR6d3rO.M.C488ZuA6YnuzH6oU.ifv/w9/msZ70VC'),(34,'beni','lalo','beni',NULL,'Albania','images/Default_pfp.svg.png','beni@gmail.com','$2a$12$Bv9HXnGRBwPpE98KUnrJnuKtZqhuTZM/qszLm5g/v1WPrycVWBmIu'),(35,'ani','marku','marku31',NULL,'Albania','images/Default_pfp.svg.png','marku@gmail.com','$2a$12$yD./DuEsiaPozqYX9y2kP.s8GUr6.CrW4rBqoTenSBv3ZpyvJF0Pu'),(36,'ilda','biba','ilda1',NULL,'Afghanistan','images/2024-01-15T15:34:46.865Z-Screenshot from 2024-01-10 12-03-56.png','ilda@gmail.com','$2a$12$Fhhe5YVGbtRDNRP.1m1R2e0f1P9MHvLYqSYNR0H/W63ldoW8iehn6'),(37,'Aleks','dervishi','aleks1',NULL,'Albania','images/Default_pfp.svg.png','aleks@gmail.com','$2a$12$xuA6Vb8BnV.sBGvT4kZv9u6mSg8QQ4CU8bhgjsiigYu5ZJa1LYFj6'),(38,'luend','golemi','juli1',NULL,'Albania','images/Default_pfp.svg.png','juli@gmail.com','$2a$12$HN7Rf9TswVRjs3pFDmel0eD7.d3KkVYGTE/guQkZxmOFjckBbnG4G'),(39,'roland','dorozhani','dorozhani',NULL,'Åland Islands','images/Default_pfp.svg.png','roland@gmail.com','$2a$12$513d9.50T8aR4DPcaA9CK.StVw1Djb7hAE1hSvxwKs9mECrakbFQi'),(40,'romeda','dorozhani','romi',NULL,'Åland Islands','images/Default_pfp.svg.png','romi@gmail.com','$2a$12$M5P8PgeZQ5Mxy3vsBn.JaeKQCOkperjGLnLkujLNXMS6XcpO9ywoq'),(41,'riko','ruki','riko',NULL,'Albania','images/Default_pfp.svg.png','riko@gmail.com','$2a$12$qGuBL0NArYVvoW0R0IeRs.vujJE.A88bUIrkJKe6DRo5lTd5zHk5m'),(42,'loli','muca','loli',NULL,'Albania','images/Default_pfp.svg.png','loli@gmail.com','$2a$12$3G.B9/lm/DeAkMjE0KID.e72h3d0X0Qx5ag5lLWIKkK/nTOap5bZ6'),(43,'rucb','rucb','rucb',NULL,'Albania','images/Default_pfp.svg.png','rucb@gmail.com','$2a$12$/xBE80/tGHsTvkT2xwrAt.LGK.XfT1PIql88SnFOsrO6wk6sD7yCW'),(44,'ruca','ruca','ruca',NULL,'Åland Islands','images/Default_pfp.svg.png','ruca@gmail.com','$2a$12$XLyraQnkKwH8euPOAz9kbuWqenIqLFAsVXnp.bKqhfEBoa2Tspv3m'),(45,'Henia','Dorozhani','heniaaad','juifekopqrpqiowhgiwe','Albania','images/Default_pfp.svg.png','maumau@gmail.com','$2a$12$qjSMWKltDjZj6rxt0jsrce1Jb4ze6LuEPWAJCxsUxdPqdQYR7GIhe');
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

-- Dump completed on 2024-01-22  2:22:56
