/*
  Warnings:

  - You are about to drop the column `hashPassword` on the `Theme` table. All the data in the column will be lost.
  - Added the required column `emoji` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Theme" DROP COLUMN "hashPassword",
ADD COLUMN     "emoji" TEXT NOT NULL;
