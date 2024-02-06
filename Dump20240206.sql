-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: twind
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
  `userId` int unsigned NOT NULL,
  `commentId` int unsigned NOT NULL,
  `createdAt` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likeId_UNIQUE` (`likeId`),
  KEY `fk_commentLikesCreator_id` (`userId`),
  KEY `fk_commentsId_id` (`commentId`),
  CONSTRAINT `fk_commentLikesCreator_id` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `fk_commentsId_id` FOREIGN KEY (`commentId`) REFERENCES `comments` (`commentId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentLikes`
--

LOCK TABLES `commentLikes` WRITE;
/*!40000 ALTER TABLE `commentLikes` DISABLE KEYS */;
INSERT INTO `commentLikes` VALUES (114,52,414,'2024-02-06T11:06:40.296Z'),(115,53,416,'2024-02-06T11:16:53.545Z'),(116,52,418,'2024-02-06T11:22:17.407Z'),(117,63,414,'2024-02-06T11:32:28.540Z'),(118,54,414,'2024-02-06T11:37:24.029Z'),(119,63,416,'2024-02-06T13:24:02.002Z'),(120,63,418,'2024-02-06T13:24:02.523Z'),(121,60,414,'2024-02-06T13:58:40.235Z');
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
  `userId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  `description` text NOT NULL,
  `createdAt` text NOT NULL,
  `reply` int unsigned DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `fk_commentCreator_id` (`userId`),
  KEY `fk_postId_id` (`postId`),
  KEY `FK_replyId` (`reply`),
  CONSTRAINT `fk_commentCreator_id` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `fk_postId_id` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE,
  CONSTRAINT `FK_replyId` FOREIGN KEY (`reply`) REFERENCES `comments` (`commentId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (413,55,335,'<3','2024-02-06T11:00:37.717Z',NULL),(414,51,335,'E ke vra vlla ;)','2024-02-06T11:02:07.973Z',NULL),(416,52,335,'@ferdi leje ca bo kot ktu ntwind se i marum esht :p','2024-02-06T11:07:33.921Z',414),(418,53,335,'@zenel hahahahha fiks e ke thon','2024-02-06T11:10:58.647Z',414),(419,63,341,'paske avancu, skapke me cadra','2024-02-06T11:32:01.622Z',NULL),(420,63,328,'kryesor je','2024-02-06T11:34:43.706Z',NULL);
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
  `followerId` int unsigned NOT NULL,
  `followingId` int unsigned NOT NULL,
  `createdAt` varchar(245) NOT NULL,
  PRIMARY KEY (`followId`),
  UNIQUE KEY `followId_UNIQUE` (`followId`),
  KEY `fk_following_id` (`followingId`),
  KEY `fk_follower_id` (`followerId`),
  CONSTRAINT `fk_follower_id` FOREIGN KEY (`followerId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `fk_following_id` FOREIGN KEY (`followingId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2112,51,50,'2024-02-05T17:34:30.614Z'),(2114,51,54,'2024-02-05T17:34:36.903Z'),(2115,51,57,'2024-02-05T17:34:37.939Z'),(2116,51,56,'2024-02-05T17:34:38.661Z'),(2117,51,58,'2024-02-05T17:34:39.565Z'),(2118,51,59,'2024-02-05T17:34:40.030Z'),(2119,51,60,'2024-02-05T17:34:40.782Z'),(2120,51,61,'2024-02-05T17:34:41.303Z'),(2121,51,62,'2024-02-05T17:34:42.182Z'),(2122,51,52,'2024-02-05T17:34:43.151Z'),(2123,51,53,'2024-02-05T17:34:59.639Z'),(2124,55,63,'2024-02-06T10:59:35.315Z'),(2125,51,63,'2024-02-06T11:01:49.185Z'),(2126,51,55,'2024-02-06T11:02:21.353Z'),(2127,54,51,'2024-02-06T11:03:52.560Z'),(2128,54,63,'2024-02-06T11:04:02.010Z'),(2129,52,63,'2024-02-06T11:06:42.133Z'),(2130,53,63,'2024-02-06T11:10:27.802Z'),(2131,53,52,'2024-02-06T11:20:18.373Z'),(2133,63,53,'2024-02-06T11:33:35.842Z'),(2135,63,56,'2024-02-06T11:33:37.274Z'),(2136,63,57,'2024-02-06T11:33:38.515Z'),(2137,63,58,'2024-02-06T11:33:39.501Z'),(2138,63,59,'2024-02-06T11:33:39.984Z'),(2139,63,60,'2024-02-06T11:33:40.399Z'),(2140,63,61,'2024-02-06T11:33:41.419Z'),(2141,63,62,'2024-02-06T11:33:41.843Z'),(2142,63,50,'2024-02-06T11:33:42.985Z'),(2143,63,51,'2024-02-06T11:33:43.452Z'),(2144,63,54,'2024-02-06T11:36:03.541Z'),(2145,63,55,'2024-02-06T13:23:52.427Z'),(2147,60,63,'2024-02-06T13:58:35.195Z');
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
  `creatorId` int unsigned NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `id_UNIQUE` (`postId`),
  KEY `fk_user_id` (`creatorId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`creatorId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=344 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (328,'images/2024-02-06T09-42-37.262Z-WhatsApp Image 2024-02-06 at 10.34.51.jpeg','Me vllain ;) \r\nViti 2018\r\n','2024-02-06T09:42:37.266Z','Afghanistan',51),(330,'images/2024-02-06T09-51-50.672Z-WhatsApp Image 2024-02-06 at 10.51.23.jpeg',NULL,'2024-02-06T09:51:50.677Z','Albania',63),(331,'images/2024-02-06T09-52-20.308Z-WhatsApp Image 2024-02-06 at 10.34.46.jpeg','Syri kalter\r\n','2024-02-06T09:52:20.319Z','Albania',63),(332,'images/2024-02-06T09-53-51.878Z-WhatsApp Image 2024-02-06 at 10.34.50 (1).jpeg',NULL,'2024-02-06T09:53:51.884Z',NULL,63),(333,'images/2024-02-06T09-54-54.355Z-WhatsApp Image 2024-02-06 at 10.34.51 (4).jpeg',NULL,'2024-02-06T09:54:54.356Z',NULL,63),(334,'images/2024-02-06T09-55-27.250Z-WhatsApp Image 2024-02-06 at 10.34.51 (3).jpeg',NULL,'2024-02-06T09:55:27.252Z',NULL,63),(335,'images/2024-02-06T09-56-27.824Z-WhatsApp Image 2024-02-06 at 10.34.52 (1).jpeg','Flying over Berat!!!','2024-02-06T09:56:27.832Z','Albania',63),(336,'images/2024-02-06T10-50-47.168Z-WhatsApp Image 2024-02-06 at 10.34.54 (3).jpeg',NULL,'2024-02-06T09:57:37.953Z','Albania',63),(338,'images/2024-02-06T10-52-21.280Z-WhatsApp Image 2024-02-06 at 10.34.54 (1).jpeg','Korcaaa!!','2024-02-06T10:52:21.284Z','Albania',63),(339,'images/2024-02-06T10-54-29.713Z-WhatsApp Image 2024-02-06 at 10.34.53 (2).jpeg','Over Tiranaa','2024-02-06T10:54:29.715Z','Albania',63),(340,'images/2024-02-06T10-58-05.610Z-WhatsApp Image 2024-02-06 at 10.34.45.jpeg','Sunset!\r\n','2024-02-06T10:58:05.613Z','Albania',55),(341,'images/2024-02-06T11-24-56.038Z-WhatsApp Image 2024-02-06 at 10.34.46 (1).jpeg','Ulje jo e kendshme','2024-02-06T11:24:56.042Z','Albania',52),(342,'images/2024-02-06T11-25-54.508Z-WhatsApp Image 2024-02-06 at 10.36.22.jpeg','Praktik ne fark','2024-02-06T11:25:54.519Z',NULL,52),(343,'images/2024-02-06T11-26-22.551Z-WhatsApp Image 2024-02-06 at 10.34.46 (2).jpeg','Duke ber progres','2024-02-06T11:26:22.553Z',NULL,52);
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
  `userId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  `createdAt` varchar(245) NOT NULL,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likesId_UNIQUE` (`likeId`),
  KEY `fk_postsLikesCreator_id` (`userId`),
  KEY `fk_postsLikesPostId_id` (`postId`),
  CONSTRAINT `fk_postsLikesCreator_id` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `fk_postsLikesPostId_id` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=934 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsLikes`
--

LOCK TABLES `postsLikes` WRITE;
/*!40000 ALTER TABLE `postsLikes` DISABLE KEYS */;
INSERT INTO `postsLikes` VALUES (919,55,335,'2024-02-06T10:59:41.518Z'),(920,55,330,'2024-02-06T10:59:43.243Z'),(921,55,332,'2024-02-06T10:59:48.103Z'),(922,55,334,'2024-02-06T10:59:49.820Z'),(923,51,335,'2024-02-06T11:01:52.606Z'),(924,54,328,'2024-02-06T11:03:55.600Z'),(925,54,335,'2024-02-06T11:04:15.536Z'),(926,52,335,'2024-02-06T11:06:39.295Z'),(928,63,341,'2024-02-06T11:31:40.884Z'),(929,63,335,'2024-02-06T11:33:19.953Z'),(930,63,328,'2024-02-06T11:34:38.805Z'),(931,54,339,'2024-02-06T11:37:47.482Z'),(932,53,335,'2024-02-06T13:17:32.314Z'),(933,60,335,'2024-02-06T13:58:38.693Z');
/*!40000 ALTER TABLE `postsLikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `tokenId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expireTime` varchar(255) NOT NULL,
  PRIMARY KEY (`tokenId`),
  UNIQUE KEY `tokenId_UNIQUE` (`tokenId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (50,'ferdi','minaj','fermando_m',NULL,'Albania','images/2024-02-01T14-38-05.547Z-combe-pullup.webp','fermando@gmail.com','$2a$12$9wHaZCkec.AA/GcVNmt65u094FRbZvYKZhSo765xaEsjilRdlXPC.'),(51,'fermando','minaj','ferdi',NULL,'Afghanistan','images/2024-02-06T09-39-59.173Z-WhatsApp Image 2024-02-06 at 10.39.24.jpeg','ferdi@gmail.com','$2a$12$volcxXqnFTi8I2NHYKg2kOd5CHRGf6EceSOz2HzBRSMBe/5vcKmzm'),(52,'zenel','rrushi','zenel',NULL,'Albania','images/2024-02-06T11-23-50.126Z-WhatsApp Image 2024-02-06 at 10.34.52 (6).jpeg','zenel@gmail.com','$2a$12$77gEr9qRndzhqGzLpPseU.pTWT3j9EBdlgusF7.nu.kks8exHGVJK'),(53,'edison','biba','edison',NULL,'Albania','images/2024-02-06T11-12-59.877Z-Screenshot from 2024-02-06 12-12-27.png','edison@gmail.com','$2a$12$VU9TIr/krYfUNDZ1UPxHV.GsKfDdeeGqowfNAj9nGJbjD31NZnaRq'),(54,'ermonela','metushi','ermonela',NULL,'Albania','images/2024-02-06T11-05-42.407Z-Default_pfp.svg.png','ermonela@gmail.com','$2a$12$C8Doml3Cua3h38ebjjUGIut6aiQD6CiZIwZa27gK7D6d5IfN5ZAFS'),(55,'rezarta','sadikaj','rrezja',NULL,'Albania','images/2024-02-06T10-57-37.584Z-WhatsApp Image 2024-02-06 at 10.34.45.jpeg','rezarta@gmail.com','$2a$12$9dBvMc14rFrhzL3iVRu4lObHUci6srNPIc2XW9uffKpp1VxeIJjcG'),(56,'eno','hoxha','enohoxha','asdmjidi','Afghanistan','defaultImg/Default_pfp.svg.png','enohoxha@gmail.com','$2a$12$PLyjqqLcHp597Cl9FkxLWOtL0CzQirbv.7STZOiD0K81bEKl0X8ea'),(57,'emi','bla','emi1',NULL,'Afghanistan','defaultImg/Default_pfp.svg.png','emi@gmail.com','$2a$12$KR0.MVTbqBw3ZH03hh75H.b9Vkm1Ee/kBvIZAPmSpVQttYI9lcxQq'),(58,'emanuel','huhu','emanuel',NULL,'Åland Islands','defaultImg/Default_pfp.svg.png','emanuel@gmail.com','$2a$12$Wxyph4yglp/ep99xxkukN.88DhrW7wbsjNXnDslJobRXUpVzn3Hy.'),(59,'elektra','hihi','elektra',NULL,'Antarctica','defaultImg/Default_pfp.svg.png','elektra@gmail.com','$2a$12$Em1NGJDDVe72FnqPt/PTHOkyjuyhuBvtw52pYc1cWGfOuiTXHczmK'),(60,'enea','kuku','enea','dadaw','Bolivia, Plurinational State of','defaultImg/Default_pfp.svg.png','enea@gmail.com','$2a$12$6Z4IbPGq03bctLBd3WAjO.vq0xWR9dnBIShRhC7PIFSYWgvmcXDuO'),(61,'erza','erza','erza','wdadadwadwad','Aruba','defaultImg/Default_pfp.svg.png','erza@gmail.com','$2a$12$19f7KrVtREE/f/sQOuaoHOpfETCJjT1RvPycFJQRDJgq39HZFa6fi'),(62,'etalon','eraw','etalon','dwadadad','Congo, Democratic Republic of the','defaultImg/Default_pfp.svg.png','etalon@gmail.com','$2a$12$yavj.ferLB59LI73MSfCceYhbF4HLupeBUavvL6Uz3B.KRmDwDAjS'),(63,'eden','dorozhani','eden','1-sh','Albania','images/2024-02-06T09-47-48.637Z-WhatsApp Image 2024-02-06 at 10.34.50.jpeg','eden@gmail.com','$2a$12$9o2s2uYS1tzIGccOnXnIzuSM9D16J2kS0N0G6TBPV9od4MDn7SjM6');
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

-- Dump completed on 2024-02-06 19:18:42
