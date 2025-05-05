/*
  Warnings:

  - You are about to drop the `Object3D` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Object3D`;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `stack` VARCHAR(191) NOT NULL,
    `githubUrl` VARCHAR(191) NOT NULL,
    `demoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
