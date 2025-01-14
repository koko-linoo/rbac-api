/*
  Warnings:

  - You are about to drop the `chatroom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `chatroom`;

-- CreateTable
CREATE TABLE `chat_rooms` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `user_list` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
