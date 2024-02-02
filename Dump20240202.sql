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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentLikes`
--

LOCK TABLES `commentLikes` WRITE;
/*!40000 ALTER TABLE `commentLikes` DISABLE KEYS */;
INSERT INTO `commentLikes` VALUES (109,49,387,'2024-02-02T16:41:07.981Z');
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
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (386,49,292,'DDDDDDDDDDDDDDDD','2024-02-02T15:57:11.838Z',NULL),(387,49,292,'aaaaaaaaaaaaaaaaaaaaaaaaaaa','2024-02-02T15:57:14.097Z',NULL),(391,49,292,'@eden dwadwadawd','2024-02-02T17:30:33.094Z',387);
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
) ENGINE=InnoDB AUTO_INCREMENT=2112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2098,49,51,'2024-02-01T10:25:04.449Z'),(2099,55,49,'2024-02-01T14:29:21.546Z'),(2100,52,49,'2024-02-01T14:30:43.121Z'),(2101,53,49,'2024-02-01T14:31:34.773Z'),(2102,54,49,'2024-02-01T14:33:13.896Z'),(2103,51,49,'2024-02-01T14:35:28.148Z'),(2104,50,49,'2024-02-01T15:01:16.172Z'),(2105,49,54,'2024-02-01T15:05:19.899Z'),(2106,49,53,'2024-02-01T15:05:20.266Z'),(2107,49,52,'2024-02-01T15:05:20.642Z'),(2109,49,55,'2024-02-01T16:46:02.010Z'),(2110,49,50,'2024-02-01T17:11:49.534Z'),(2111,56,49,'2024-02-02T17:33:22.018Z');
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
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (292,'images/2024-02-01T13-17-48.889Z-combe-pullup.webp','dwadadaadadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','2024-01-31T17:28:42.047Z','Afghanistan',49),(308,'images/2024-02-02T11-38-53.460Z-combe-pullup.webp',NULL,'2024-02-02T11:38:53.467Z',NULL,49),(309,'images/2024-02-02T11-38-56.495Z-Screenshot from 2024-01-24 15-15-40.png',NULL,'2024-02-02T11:38:56.497Z',NULL,49),(310,'images/2024-02-02T11-39-02.256Z-Screenshot from 2024-01-10 12-03-56.png',NULL,'2024-02-02T11:39:02.258Z',NULL,49),(311,'images/2024-02-02T11-39-05.445Z-Screenshot from 2024-01-24 15-15-40.png',NULL,'2024-02-02T11:39:05.446Z',NULL,49),(312,'images/2024-02-02T11-39-09.560Z-Screenshot from 2024-01-24 15-15-40.png',NULL,'2024-02-02T11:39:09.563Z',NULL,49),(313,'images/2024-02-02T11-39-13.343Z-Screenshot from 2024-01-23 18-36-03.png',NULL,'2024-02-02T11:39:13.346Z',NULL,49);
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
) ENGINE=InnoDB AUTO_INCREMENT=913 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsLikes`
--

LOCK TABLES `postsLikes` WRITE;
/*!40000 ALTER TABLE `postsLikes` DISABLE KEYS */;
INSERT INTO `postsLikes` VALUES (904,55,292,'2024-02-01T14:29:10.118Z'),(905,52,292,'2024-02-01T14:30:51.571Z'),(906,53,292,'2024-02-01T14:31:44.417Z'),(907,54,292,'2024-02-01T14:33:19.292Z'),(908,51,292,'2024-02-01T14:35:31.551Z'),(909,50,292,'2024-02-01T15:01:11.283Z'),(911,49,308,'2024-02-02T13:53:35.179Z'),(912,56,292,'2024-02-02T17:33:26.053Z');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (49,'eden','dorozhani','eden','','Albania','images/2024-02-02T11-00-52.923Z-Screenshot from 2024-01-10 12-03-56.png','eden@gmail.com','$2a$12$ZVDwv07ZriVZIvMa2uD.m.H9XiGmR3S.qdl2ZDqlUnF1m5DUFXVjy'),(50,'ferdi','minaj','fermando_m',NULL,'Albania','images/2024-02-01T14-38-05.547Z-combe-pullup.webp','fermando@gmail.com','$2a$12$9wHaZCkec.AA/GcVNmt65u094FRbZvYKZhSo765xaEsjilRdlXPC.'),(51,'fermando','minaj','ferdi',NULL,'Afghanistan','images/2024-02-01T14-35-20.152Z-Screenshot from 2024-01-23 09-15-52.png','ferdi@gmail.com','$2a$12$46P.Dnklc4WSEMNq7VL9aOqbSUAoU5kuXCXHqCxZtlr/8A0a2DN3.'),(52,'zenel','rrushi','zenel',NULL,'Albania','defaultImg/Default_pfp.svg.png','zenel@gmail.com','$2a$12$77gEr9qRndzhqGzLpPseU.pTWT3j9EBdlgusF7.nu.kks8exHGVJK'),(53,'edison','biba','edison',NULL,'Albania','defaultImg/Default_pfp.svg.png','edison@gmail.com','$2a$12$VU9TIr/krYfUNDZ1UPxHV.GsKfDdeeGqowfNAj9nGJbjD31NZnaRq'),(54,'ermonela','metushi','ermonela',NULL,'Albania','defaultImg/Default_pfp.svg.png','ermonela@gmail.com','$2a$12$C8Doml3Cua3h38ebjjUGIut6aiQD6CiZIwZa27gK7D6d5IfN5ZAFS'),(55,'rezarta','sadikaj','rrezja',NULL,'Albania','defaultImg/Default_pfp.svg.png','rezarta@gmail.com','$2a$12$9dBvMc14rFrhzL3iVRu4lObHUci6srNPIc2XW9uffKpp1VxeIJjcG'),(56,'eno','hoxha','enohoxha','asdmjidi','Afghanistan','defaultImg/Default_pfp.svg.png','enohoxha@gmail.com','$2a$12$PLyjqqLcHp597Cl9FkxLWOtL0CzQirbv.7STZOiD0K81bEKl0X8ea');
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

-- Dump completed on 2024-02-02 18:42:05
