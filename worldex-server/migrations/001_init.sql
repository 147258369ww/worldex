-- worldex-server/migrations/001_init.sql
CREATE DATABASE IF NOT EXISTS worldex DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE worldex;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') DEFAULT 'editor',
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_zh VARCHAR(200),
  title_en VARCHAR(200),
  image VARCHAR(500) NOT NULL,
  link VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE exhibitions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('overseas','domestic') NOT NULL,
  name_zh VARCHAR(200) NOT NULL,
  name_en VARCHAR(200) NOT NULL,
  date_from DATE,
  date_to DATE,
  city_zh VARCHAR(100),
  city_en VARCHAR(100),
  country_zh VARCHAR(100),
  country_en VARCHAR(100),
  venue_zh VARCHAR(200),
  venue_en VARCHAR(200),
  image VARCHAR(500),
  intro_zh TEXT,
  intro_en TEXT,
  detail_zh TEXT,
  detail_en TEXT,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT NOW(),
  updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_zh VARCHAR(300) NOT NULL,
  title_en VARCHAR(300) NOT NULL,
  summary_zh VARCHAR(500),
  summary_en VARCHAR(500),
  content_zh TEXT,
  content_en TEXT,
  cover_image VARCHAR(500),
  images JSON,
  published_at DATETIME,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT NOW(),
  updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(200) NOT NULL,
  position VARCHAR(100),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(300),
  message TEXT,
  is_read TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE company_info (
  id INT PRIMARY KEY DEFAULT 1,
  about_zh TEXT,
  about_en TEXT,
  address_zh VARCHAR(300),
  address_en VARCHAR(300),
  phone VARCHAR(50),
  email VARCHAR(100),
  partners_zh TEXT,
  partners_en TEXT,
  updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
);

INSERT INTO company_info (id) VALUES (1);
