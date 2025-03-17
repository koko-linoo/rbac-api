/*
  Warnings:

  - The `deleted_at` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "deleted_at",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
