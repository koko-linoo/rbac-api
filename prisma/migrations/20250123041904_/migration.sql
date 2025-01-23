/*
  Warnings:

  - A unique constraint covering the columns `[module_id,name]` on the table `actions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `actions_name_key` ON `actions`;

-- CreateIndex
CREATE UNIQUE INDEX `actions_module_id_name_key` ON `actions`(`module_id`, `name`);
