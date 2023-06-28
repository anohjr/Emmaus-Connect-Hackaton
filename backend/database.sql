-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema emmaus
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema emmaus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emmaus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `emmaus` ;
-- -----------------------------------------------------
-- Table `emmaus`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus`.`user` (
  `id` INT NOT NULL,
  `role` TINYINT NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `emmaus`.`phone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus`.`phone` (
  `id` INT NOT NULL,
  `brand` VARCHAR(45) NULL,
  `modele` VARCHAR(45) NULL,
  `storage` VARCHAR(45) NULL,
  `memory` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `year` VARCHAR(45) NULL,
  `replacement value` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `emmaus`.`stockphone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus`.`stockphone` (
  `idstockphone` INT NOT NULL,
  `price` DECIMAL(6,2) NULL,
  `location` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  `condition` VARCHAR(45) NULL,
  `accessories` VARCHAR(45) NULL,
  `phone_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`idstockphone`),
  INDEX `fk_stockphone_phone1_idx` (`phone_id` ASC) VISIBLE,
  INDEX `fk_stockphone_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_stockphone_phone1`
    FOREIGN KEY (`phone_id`)
    REFERENCES `emmaus`.`phone` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stockphone_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `emmaus`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;