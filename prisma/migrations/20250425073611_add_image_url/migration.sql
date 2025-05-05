/*
  Warnings:

  - Added the required column `imageUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techStack` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `techStack` VARCHAR(191) NOT NULL;
