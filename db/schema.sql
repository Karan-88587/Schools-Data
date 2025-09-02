-- Run this script to create the database and table
-- Create database (safe if already exists)
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- Create table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT(10) NOT NULL, 
  email_id TEXT NOT NULL,
  image TEXT NOT NULL,         
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);