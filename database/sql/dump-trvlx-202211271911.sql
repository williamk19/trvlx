-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: trvlx
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kendaraan`
--

DROP TABLE IF EXISTS `kendaraan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kendaraan` (
  `id_kendaraan` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plat_nomor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `merk_mobil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_mobil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah_seat` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_kendaraan`),
  UNIQUE KEY `kendaraan_plat_nomor_unique` (`plat_nomor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kendaraan`
--

LOCK TABLES `kendaraan` WRITE;
/*!40000 ALTER TABLE `kendaraan` DISABLE KEYS */;
INSERT INTO `kendaraan` VALUES (1,'M150DD','Daihatsu','Xenia 2022',5,NULL,NULL),(2,'L472XD','Toyota','Hiace 2019',14,NULL,NULL),(3,'M293XT','Daihatsu','Terios 2022',6,NULL,NULL),(4,'M517BD','Toyota','Hiace 2020',14,NULL,NULL),(5,'S924IP','Suzuki','APV Deluxe 2017',7,NULL,NULL);
/*!40000 ALTER TABLE `kendaraan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `layanan`
--

DROP TABLE IF EXISTS `layanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `layanan` (
  `id_layanan` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kota_asal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kota_tujuan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biaya_jasa` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_layanan`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `layanan`
--

LOCK TABLES `layanan` WRITE;
/*!40000 ALTER TABLE `layanan` DISABLE KEYS */;
INSERT INTO `layanan` VALUES (1,'Surabaya','Malang',100000,NULL,NULL),(2,'Malang','Madura',200000,NULL,NULL),(3,'Jakarta','Malang',700000,NULL,NULL),(4,'Surabaya','Semarang',450000,NULL,NULL),(5,'Yogyakarta','Malang',500000,NULL,NULL);
/*!40000 ALTER TABLE `layanan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lokasi`
--

DROP TABLE IF EXISTS `lokasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lokasi` (
  `id_lokasi` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lat_lng_asal` point NOT NULL,
  `lat_lng_tujuan` point NOT NULL,
  `alamat_lengkap_asal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_lengkap_tujuan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi_lokasi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_lokasi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lokasi`
--

LOCK TABLES `lokasi` WRITE;
/*!40000 ALTER TABLE `lokasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `lokasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_resets_table',1),(2,'2019_08_19_000000_create_failed_jobs_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2022_10_11_105255_create_users_role_table',1),(5,'2022_10_12_000000_create_users_table',1),(6,'2022_11_04_135436_create_kendaraan_table',1),(7,'2022_11_11_095142_create_layanan_table',1),(8,'2022_11_21_174304_create_lokasi_table',1),(9,'2022_11_21_184959_create_orders_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id_order` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint unsigned NOT NULL,
  `id_layanan` bigint unsigned NOT NULL,
  `id_lokasi` bigint unsigned NOT NULL,
  `id_kendaraan` bigint unsigned NOT NULL,
  `nama_penumpang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_pemberangkatan` date NOT NULL,
  `status_pembayaran` enum('pending','rejected','done') COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_seat` int NOT NULL,
  `total_harga` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  KEY `orders_id_user_foreign` (`id_user`),
  KEY `orders_id_kendaraan_foreign` (`id_kendaraan`),
  KEY `orders_id_layanan_foreign` (`id_layanan`),
  KEY `orders_id_lokasi_foreign` (`id_lokasi`),
  CONSTRAINT `orders_id_kendaraan_foreign` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`),
  CONSTRAINT `orders_id_layanan_foreign` FOREIGN KEY (`id_layanan`) REFERENCES `layanan` (`id_layanan`),
  CONSTRAINT `orders_id_lokasi_foreign` FOREIGN KEY (`id_lokasi`) REFERENCES `lokasi` (`id_lokasi`),
  CONSTRAINT `orders_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_kategori` bigint unsigned NOT NULL,
  `email_user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon_user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_user_unique` (`email_user`),
  UNIQUE KEY `users_telepon_user_unique` (`telepon_user`),
  KEY `users_id_kategori_foreign` (`id_kategori`),
  CONSTRAINT `users_id_kategori_foreign` FOREIGN KEY (`id_kategori`) REFERENCES `users_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Travel',1,'admin@travel.com','+628123456789',NULL,'$2y$10$AfPZmRWKLvxHXZjKNeIXxO4wAADtHampbkGoJeo8nDX/pE74q3P7K',NULL,'2022-11-26 08:46:26','2022-11-26 08:46:26'),(2,'Admin Travel 2',2,'admin@travel2.com','+620987654321',NULL,'$2y$10$zwQryfZXpAkRaVKzhtQqHOXcLjr0Y67d5LFFfNWSigYrk1lqaxYVW',NULL,'2022-11-26 08:46:26','2022-11-26 08:46:26'),(3,'Sopir Travel',3,'sopir@travel.com','+628947364983',NULL,'$2y$10$cnkZyhnOgSn585gi3MSjkuYx8M744owxLyyzn5o6uXJly/kx8YACO',NULL,'2022-11-26 08:46:27','2022-11-26 08:46:27'),(4,'Oskar Siregar',4,'zrahayu@example.com','0996 2467 0527','2022-11-26 08:46:27','something_random','yoHW1eA1Yo','2022-11-26 08:46:27','2022-11-26 08:46:27'),(5,'Galih Maryadi',4,'elvin51@example.org','(+62) 971 7017 596','2022-11-26 08:46:27','something_random','LBTLxQJ7lK','2022-11-26 08:46:27','2022-11-26 08:46:27'),(6,'Cengkir Pradana',4,'raisa39@example.org','(+62) 807 8790 789','2022-11-26 08:46:27','something_random','OJ8thOULDX','2022-11-26 08:46:27','2022-11-26 08:46:27'),(7,'Gantar Utama',4,'gkurniawan@example.com','0883 1130 3181','2022-11-26 08:46:27','something_random','buXxEcxaYq','2022-11-26 08:46:27','2022-11-26 08:46:27'),(8,'Kamaria Hilda Suryatmi S.H.',4,'asirwanda21@example.org','0676 7033 439','2022-11-26 08:46:27','something_random','m5pc6yPmus','2022-11-26 08:46:27','2022-11-26 08:46:27'),(9,'Fitria Ina Melani',4,'palastri.jabal@example.org','(+62) 971 9874 872','2022-11-26 08:46:27','something_random','EsRWwYbI9g','2022-11-26 08:46:27','2022-11-26 08:46:27'),(10,'Sabar Uwais',4,'uda12@example.net','(+62) 490 9533 151','2022-11-26 08:46:27','something_random','p64NzuWEKO','2022-11-26 08:46:27','2022-11-26 08:46:27'),(11,'Melinda Sarah Astuti S.Psi',4,'bajragin69@example.org','(+62) 535 9849 206','2022-11-26 08:46:27','something_random','XwsMWsG36a','2022-11-26 08:46:27','2022-11-26 08:46:27'),(12,'Elvina Melani',4,'juwais@example.org','028 3099 3023','2022-11-26 08:46:27','something_random','jUjBqevgsj','2022-11-26 08:46:27','2022-11-26 08:46:27'),(13,'Yance Maria Pratiwi',4,'zulkarnain.ella@example.org','0257 7705 0394','2022-11-26 08:46:27','something_random','QDlrRndJQW','2022-11-26 08:46:27','2022-11-26 08:46:27'),(14,'Wani Pertiwi',4,'martana08@example.org','(+62) 430 7696 841','2022-11-26 08:46:27','something_random','Apa8w58HCb','2022-11-26 08:46:27','2022-11-26 08:46:27'),(15,'Yance Rina Laksmiwati S.Farm',4,'awahyudin@example.net','0715 2143 517','2022-11-26 08:46:27','something_random','uL4uSwMLfI','2022-11-26 08:46:27','2022-11-26 08:46:27'),(16,'Paulin Usada S.Ked',4,'jelita.suartini@example.com','(+62) 27 1944 543','2022-11-26 08:46:27','something_random','vDIV9A7Owr','2022-11-26 08:46:27','2022-11-26 08:46:27'),(17,'Dalima Yuliarti',4,'ypadmasari@example.org','0838 1849 0774','2022-11-26 08:46:27','something_random','YehurLxl8B','2022-11-26 08:46:27','2022-11-26 08:46:27'),(18,'Kamaria Utami',4,'asmadi95@example.com','0568 5719 649','2022-11-26 08:46:27','something_random','7HjEcmHTSA','2022-11-26 08:46:27','2022-11-26 08:46:27'),(19,'Siska Pratiwi',4,'johan28@example.net','(+62) 29 3766 5637','2022-11-26 08:46:27','something_random','HZtxEyzz0c','2022-11-26 08:46:27','2022-11-26 08:46:27'),(20,'Galih Mandala',4,'lnarpati@example.org','(+62) 677 6994 7625','2022-11-26 08:46:27','something_random','030SVfkiAE','2022-11-26 08:46:27','2022-11-26 08:46:27'),(21,'Halim Gunarto',4,'titi72@example.com','(+62) 499 6557 6680','2022-11-26 08:46:27','something_random','lVTs9SGiTx','2022-11-26 08:46:27','2022-11-26 08:46:27'),(22,'Nilam Handayani',4,'hutasoit.karimah@example.org','(+62) 417 5008 4407','2022-11-26 08:46:27','something_random','RnI0mO0c4S','2022-11-26 08:46:27','2022-11-26 08:46:27'),(23,'Langgeng Maulana',4,'jailani.pia@example.net','0746 3051 865','2022-11-26 08:46:27','something_random','7cooD5iKJG','2022-11-26 08:46:27','2022-11-26 08:46:27'),(24,'Makara Sihombing',4,'lwastuti@example.com','(+62) 747 0255 444','2022-11-26 08:46:27','something_random','Qe0ZS2Yq7p','2022-11-26 08:46:27','2022-11-26 08:46:27'),(25,'Langgeng Situmorang',4,'siregar.adikara@example.com','0709 5852 8510','2022-11-26 08:46:27','something_random','bmwEFJIKms','2022-11-26 08:46:27','2022-11-26 08:46:27'),(26,'Viman Maheswara',4,'cindy.mardhiyah@example.org','0587 5171 5977','2022-11-26 08:46:27','something_random','WzV4OPLbOE','2022-11-26 08:46:27','2022-11-26 08:46:27'),(27,'Yulia Natalia Rahayu',4,'ophelia.widiastuti@example.net','0909 5117 310','2022-11-26 08:46:27','something_random','eWGaOCcvUz','2022-11-26 08:46:27','2022-11-26 08:46:27'),(28,'Warsa Sirait',4,'hidayat.titin@example.org','(+62) 905 9641 6403','2022-11-26 08:46:27','something_random','KRIg772gYT','2022-11-26 08:46:27','2022-11-26 08:46:27'),(29,'Rachel Astuti S.Pd',4,'marpaung.ami@example.com','(+62) 25 2297 4466','2022-11-26 08:46:27','something_random','pnj36Z9KNu','2022-11-26 08:46:27','2022-11-26 08:46:27'),(30,'Silvia Mandasari',4,'alaksmiwati@example.net','(+62) 474 6229 495','2022-11-26 08:46:27','something_random','JK9iPEzZ2x','2022-11-26 08:46:27','2022-11-26 08:46:27'),(31,'Balidin Setiawan',4,'hartati.gangsar@example.org','(+62) 775 7089 948','2022-11-26 08:46:27','something_random','L3Z43ZFLxO','2022-11-26 08:46:27','2022-11-26 08:46:27'),(32,'Zahra Wahyuni S.Pt',4,'ckusumo@example.net','(+62) 878 6486 838','2022-11-26 08:46:27','something_random','rn1oFVTWVG','2022-11-26 08:46:27','2022-11-26 08:46:27'),(33,'Ganjaran Hidayanto',4,'elma.gunarto@example.com','0304 5232 1962','2022-11-26 08:46:27','something_random','W5UXXtP9mW','2022-11-26 08:46:27','2022-11-26 08:46:27'),(34,'Hamima Suryatmi',4,'iriana55@example.org','0270 4361 968','2022-11-26 08:46:27','something_random','E12EYSJrdQ','2022-11-26 08:46:27','2022-11-26 08:46:27'),(35,'Sakura Maryati',4,'ami.namaga@example.org','(+62) 866 5799 611','2022-11-26 08:46:27','something_random','L6RgUF0hcR','2022-11-26 08:46:27','2022-11-26 08:46:27'),(36,'Restu Olivia Laksita',4,'permata.jindra@example.com','(+62) 887 521 566','2022-11-26 08:46:27','something_random','e29ads0L9s','2022-11-26 08:46:27','2022-11-26 08:46:27'),(37,'Karsa Nrima Iswahyudi M.Ak',4,'empluk73@example.org','0526 4996 1704','2022-11-26 08:46:27','something_random','IQCQaI4416','2022-11-26 08:46:27','2022-11-26 08:46:27'),(38,'Teddy Sitorus',4,'legawa71@example.com','0871 2675 3909','2022-11-26 08:46:27','something_random','rrAAJcnchs','2022-11-26 08:46:27','2022-11-26 08:46:27'),(39,'Zizi Melinda Laksmiwati S.E.',4,'jamil.yolanda@example.com','(+62) 596 0922 3271','2022-11-26 08:46:27','something_random','82K8qUitOl','2022-11-26 08:46:27','2022-11-26 08:46:27'),(40,'Jamalia Sudiati',4,'karimah.utami@example.net','(+62) 27 6231 408','2022-11-26 08:46:27','something_random','M3Lzh3ACBJ','2022-11-26 08:46:27','2022-11-26 08:46:27'),(41,'Oliva Agustina',4,'wani41@example.net','(+62) 345 1072 4033','2022-11-26 08:46:27','something_random','JQU9oWVNQy','2022-11-26 08:46:27','2022-11-26 08:46:27'),(42,'Prabu Gamanto Prabowo',4,'putra.adhiarja@example.com','020 9055 8558','2022-11-26 08:46:27','something_random','deGvQ6Ik5X','2022-11-26 08:46:27','2022-11-26 08:46:27'),(43,'Vivi Namaga',4,'qprasetya@example.org','(+62) 400 6525 7607','2022-11-26 08:46:27','something_random','MlvyTtd1Wa','2022-11-26 08:46:28','2022-11-26 08:46:28'),(44,'Nurul Alika Zulaika M.M.',4,'dpermadi@example.net','(+62) 381 3590 2658','2022-11-26 08:46:27','something_random','2va3Rw09SD','2022-11-26 08:46:28','2022-11-26 08:46:28'),(45,'Gamani Wibowo',4,'cahya54@example.org','023 3570 434','2022-11-26 08:46:27','something_random','qLS2MOBY6S','2022-11-26 08:46:28','2022-11-26 08:46:28'),(46,'Reksa Waskita',4,'kala.kuswandari@example.org','(+62) 673 4982 724','2022-11-26 08:46:27','something_random','Oi1exInjfD','2022-11-26 08:46:28','2022-11-26 08:46:28'),(47,'Gasti Purwanti',4,'airawan@example.com','0710 2922 0745','2022-11-26 08:46:27','something_random','hdSgaPCBIQ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(48,'Banawi Prasetyo',4,'nugroho.cemani@example.net','0715 6155 990','2022-11-26 08:46:27','something_random','hQvJB2fG8U','2022-11-26 08:46:28','2022-11-26 08:46:28'),(49,'Novi Ghaliyati Maryati S.T.',4,'bakiono.hariyah@example.com','(+62) 781 9988 9970','2022-11-26 08:46:27','something_random','A1ttyprHcg','2022-11-26 08:46:28','2022-11-26 08:46:28'),(50,'Elon Taufan Tarihoran',4,'hyolanda@example.net','(+62) 628 1830 281','2022-11-26 08:46:27','something_random','Gi4EfRO2AU','2022-11-26 08:46:28','2022-11-26 08:46:28'),(51,'Rudi Situmorang',4,'jmayasari@example.net','0849 9979 8527','2022-11-26 08:46:27','something_random','UNSTs2cxJq','2022-11-26 08:46:28','2022-11-26 08:46:28'),(52,'Prabu Rajata',4,'tomi26@example.org','(+62) 298 6124 870','2022-11-26 08:46:27','something_random','pFDG6cdgnL','2022-11-26 08:46:28','2022-11-26 08:46:28'),(53,'Uli Winarsih S.Ked',4,'mustofa.praba@example.net','(+62) 800 7427 202','2022-11-26 08:46:27','something_random','5NJOhngjQZ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(54,'Bagus Makara Sihombing',4,'raina.zulkarnain@example.com','0581 9043 418','2022-11-26 08:46:27','something_random','R8s8Ne5ZdV','2022-11-26 08:46:28','2022-11-26 08:46:28'),(55,'Baktiadi Taufan Irawan S.Psi',4,'olga27@example.com','(+62) 612 9279 1400','2022-11-26 08:46:27','something_random','A7oeQRsj6N','2022-11-26 08:46:28','2022-11-26 08:46:28'),(56,'Cagak Atma Maryadi M.Pd',4,'olga76@example.org','(+62) 820 839 936','2022-11-26 08:46:27','something_random','8cUE1xohfo','2022-11-26 08:46:28','2022-11-26 08:46:28'),(57,'Edward Saefullah',4,'ylaksmiwati@example.net','0634 1288 3004','2022-11-26 08:46:27','something_random','ln9UxPVEn1','2022-11-26 08:46:28','2022-11-26 08:46:28'),(58,'Kala Sirait S.Gz',4,'gangsar30@example.org','0395 2030 756','2022-11-26 08:46:27','something_random','JJxICA1nIf','2022-11-26 08:46:28','2022-11-26 08:46:28'),(59,'Dariati Prakasa',4,'wijayanti.winda@example.com','0992 6374 4093','2022-11-26 08:46:27','something_random','2Te3YUZXnU','2022-11-26 08:46:28','2022-11-26 08:46:28'),(60,'Julia Kani Sudiati',4,'fjanuar@example.com','020 5538 9371','2022-11-26 08:46:27','something_random','paHVD5WE7a','2022-11-26 08:46:28','2022-11-26 08:46:28'),(61,'Hairyanto Xanana Pradipta S.Psi',4,'karja05@example.com','0894 2149 995','2022-11-26 08:46:27','something_random','cLnDMwZWw4','2022-11-26 08:46:28','2022-11-26 08:46:28'),(62,'Luwar Haryanto S.I.Kom',4,'hakim.argono@example.com','0286 6954 0178','2022-11-26 08:46:27','something_random','gMNuyyv6Lg','2022-11-26 08:46:28','2022-11-26 08:46:28'),(63,'Citra Namaga',4,'wibisono.johan@example.org','(+62) 347 8855 118','2022-11-26 08:46:27','something_random','tgV268ykbi','2022-11-26 08:46:28','2022-11-26 08:46:28'),(64,'Zelda Titin Oktaviani',4,'farah27@example.com','0400 6436 9764','2022-11-26 08:46:27','something_random','6hDPw5j2gp','2022-11-26 08:46:28','2022-11-26 08:46:28'),(65,'Okta Megantara',4,'paramita05@example.com','(+62) 366 4615 9609','2022-11-26 08:46:27','something_random','fr2Y1IlXyU','2022-11-26 08:46:28','2022-11-26 08:46:28'),(66,'Talia Hilda Wahyuni',4,'ian.lestari@example.net','026 2697 452','2022-11-26 08:46:27','something_random','zKwGAw5Qj7','2022-11-26 08:46:28','2022-11-26 08:46:28'),(67,'Banawi Lurhur Kusumo',4,'widodo.aswani@example.net','0979 9049 515','2022-11-26 08:46:27','something_random','DkXf1Zo2f3','2022-11-26 08:46:28','2022-11-26 08:46:28'),(68,'Kacung Wasita',4,'syahrini.maheswara@example.org','(+62) 788 7441 6093','2022-11-26 08:46:27','something_random','jx3XjGjX1m','2022-11-26 08:46:28','2022-11-26 08:46:28'),(69,'Umi Eli Padmasari',4,'handriani@example.com','(+62) 246 9496 672','2022-11-26 08:46:27','something_random','TfXatwNsbW','2022-11-26 08:46:28','2022-11-26 08:46:28'),(70,'Murti Kuswoyo',4,'widodo.uchita@example.org','0577 4499 9522','2022-11-26 08:46:27','something_random','g3kfPTdNoJ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(71,'Wira Wibisono',4,'kayla.firgantoro@example.org','0300 3685 152','2022-11-26 08:46:27','something_random','ASTO9Lssfe','2022-11-26 08:46:28','2022-11-26 08:46:28'),(72,'Kayla Hassanah',4,'sadina.hutasoit@example.org','(+62) 832 906 424','2022-11-26 08:46:27','something_random','PZfr2PWOtl','2022-11-26 08:46:28','2022-11-26 08:46:28'),(73,'Rini Nurdiyanti S.Sos',4,'prakasa.jessica@example.com','0932 1537 241','2022-11-26 08:46:27','something_random','oAypzvlc1k','2022-11-26 08:46:28','2022-11-26 08:46:28'),(74,'Kasiyah Hasna Haryanti',4,'aditya80@example.com','0285 5996 884','2022-11-26 08:46:27','something_random','LOnCeeU7ld','2022-11-26 08:46:28','2022-11-26 08:46:28'),(75,'Hartaka Marbun',4,'nugroho.budi@example.org','(+62) 957 5214 9636','2022-11-26 08:46:27','something_random','VjGfkJ7ciy','2022-11-26 08:46:28','2022-11-26 08:46:28'),(76,'Karimah Hani Rahmawati',4,'saragih.jaiman@example.com','(+62) 952 3697 5709','2022-11-26 08:46:27','something_random','LZxW8WhimC','2022-11-26 08:46:28','2022-11-26 08:46:28'),(77,'Cornelia Purwanti',4,'maryanto.pertiwi@example.net','(+62) 272 6989 5263','2022-11-26 08:46:27','something_random','9KYhGOBKkH','2022-11-26 08:46:28','2022-11-26 08:46:28'),(78,'Adhiarja Ajimat Saptono S.Psi',4,'unggul43@example.com','0307 3861 0827','2022-11-26 08:46:27','something_random','8eoowgFu33','2022-11-26 08:46:28','2022-11-26 08:46:28'),(79,'Dina Ghaliyati Rahmawati M.Pd',4,'hastuti.suci@example.com','0896 619 452','2022-11-26 08:46:27','something_random','UJDdRK06xL','2022-11-26 08:46:28','2022-11-26 08:46:28'),(80,'Titi Zaenab Farida M.Pd',4,'dinda28@example.net','0580 0521 966','2022-11-26 08:46:27','something_random','YbLpxFK2Dv','2022-11-26 08:46:28','2022-11-26 08:46:28'),(81,'Rangga Bahuwirya Nababan S.Kom',4,'cagak.namaga@example.com','(+62) 23 7451 1401','2022-11-26 08:46:27','something_random','DmKDDgE8W6','2022-11-26 08:46:28','2022-11-26 08:46:28'),(82,'Puji Puspa Pudjiastuti',4,'kamila.rajata@example.com','0778 1211 024','2022-11-26 08:46:27','something_random','v4urPAhUcF','2022-11-26 08:46:28','2022-11-26 08:46:28'),(83,'Nabila Handayani',4,'lega37@example.com','(+62) 590 2250 6799','2022-11-26 08:46:27','something_random','k64dZuhzuh','2022-11-26 08:46:28','2022-11-26 08:46:28'),(84,'Nurul Suryatmi',4,'maras.halimah@example.org','0659 4316 1957','2022-11-26 08:46:27','something_random','dSyfOZrEr3','2022-11-26 08:46:28','2022-11-26 08:46:28'),(85,'Mila Fujiati',4,'uchita61@example.net','(+62) 24 4226 0220','2022-11-26 08:46:27','something_random','JqDX3WTlYK','2022-11-26 08:46:28','2022-11-26 08:46:28'),(86,'Kemba Prasasta S.H.',4,'ilaksita@example.com','(+62) 23 6309 150','2022-11-26 08:46:27','something_random','4i7mOGUeWf','2022-11-26 08:46:28','2022-11-26 08:46:28'),(87,'Adikara Haryanto',4,'umi20@example.com','(+62) 451 7787 819','2022-11-26 08:46:27','something_random','RYCc0vJhQP','2022-11-26 08:46:28','2022-11-26 08:46:28'),(88,'Hasta Nababan S.Sos',4,'ade69@example.org','0429 3029 9982','2022-11-26 08:46:27','something_random','9yKeGJICJJ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(89,'Bakiono Zulkarnain',4,'chartati@example.net','(+62) 659 2298 082','2022-11-26 08:46:27','something_random','KFiOPPZfz2','2022-11-26 08:46:28','2022-11-26 08:46:28'),(90,'Gamani Hakim',4,'kenzie.pertiwi@example.com','(+62) 23 4039 6993','2022-11-26 08:46:27','something_random','gBEHB7CRh9','2022-11-26 08:46:28','2022-11-26 08:46:28'),(91,'Eka Nova Utami',4,'iramadan@example.com','(+62) 657 9490 800','2022-11-26 08:46:27','something_random','O6KH9hNr4l','2022-11-26 08:46:28','2022-11-26 08:46:28'),(92,'Jasmani Saragih',4,'empluk.wahyuni@example.org','0558 4001 728','2022-11-26 08:46:27','something_random','NtvYPlfynJ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(93,'Farhunnisa Farida',4,'marbun.marsito@example.com','(+62) 572 5054 9848','2022-11-26 08:46:27','something_random','7MYRIX883r','2022-11-26 08:46:28','2022-11-26 08:46:28'),(94,'Puji Yuliarti',4,'upadmasari@example.net','(+62) 864 990 101','2022-11-26 08:46:27','something_random','8I2cUqxYCQ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(95,'Jagaraga Martaka Sihotang',4,'jsudiati@example.org','0431 7218 0819','2022-11-26 08:46:27','something_random','Ibice7rygu','2022-11-26 08:46:28','2022-11-26 08:46:28'),(96,'Daruna Dongoran S.Pd',4,'ksiregar@example.net','0431 2897 4103','2022-11-26 08:46:27','something_random','rFDuLHL70w','2022-11-26 08:46:28','2022-11-26 08:46:28'),(97,'Cakrabuana Simanjuntak',4,'palastri.warji@example.net','(+62) 873 5939 396','2022-11-26 08:46:27','something_random','D2JrWkFWRO','2022-11-26 08:46:28','2022-11-26 08:46:28'),(98,'Carub Siregar',4,'nyolanda@example.net','0640 8552 786','2022-11-26 08:46:27','something_random','Sh5kC99OwU','2022-11-26 08:46:28','2022-11-26 08:46:28'),(99,'Ciaobella Uyainah',4,'vmandasari@example.com','0871 8905 6094','2022-11-26 08:46:27','something_random','SmJpE1buqD','2022-11-26 08:46:28','2022-11-26 08:46:28'),(100,'Uda Tirtayasa Ardianto',4,'edward15@example.com','(+62) 912 3844 7670','2022-11-26 08:46:27','something_random','fuxVHhl8Ww','2022-11-26 08:46:28','2022-11-26 08:46:28'),(101,'Restu Eva Halimah S.Kom',4,'leo.hidayat@example.com','0517 8809 940','2022-11-26 08:46:27','something_random','gPa9z4X2dZ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(102,'Vega Firgantoro',4,'yolanda.hartaka@example.com','0648 1946 810','2022-11-26 08:46:27','something_random','mjNnxdWAGQ','2022-11-26 08:46:28','2022-11-26 08:46:28'),(103,'Wage Jaya Kusumo S.T.',4,'naryani@example.org','0419 8566 0627','2022-11-26 08:46:27','something_random','G8YXboidyc','2022-11-26 08:46:28','2022-11-26 08:46:28'),(104,'William Kurniawan',1,'williamkurniawan1144@gmail.com','+6285156384597',NULL,'$2y$10$D49KbAfvgSZCojqEfy0g4OVTcqkIgAxxnwPxnv8c2BpNrGBaC8N4a',NULL,'2022-11-26 10:54:56','2022-11-26 10:54:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (1,'Super Admin'),(2,'Admin'),(3,'Sopir Travel'),(4,'Pelanggan');
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'trvlx'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-27 19:11:34
