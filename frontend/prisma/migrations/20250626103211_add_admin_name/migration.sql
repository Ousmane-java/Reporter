/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `AdminUser` table. All the data in the column will be lost.
  - Added the required column `name` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL;
