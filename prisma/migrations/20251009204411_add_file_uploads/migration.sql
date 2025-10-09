/*
  Warnings:

  - You are about to drop the column `fileName` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `presentationName` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "fileName",
DROP COLUMN "fileUrl",
DROP COLUMN "presentationName",
ADD COLUMN     "documentUrl" TEXT;
