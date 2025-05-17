/*
  Warnings:

  - Made the column `userEmail` on table `Theme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "TypesOfBlock" ADD VALUE 'image';

-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "userEmail" SET NOT NULL;
