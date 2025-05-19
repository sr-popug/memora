/*
  Warnings:

  - You are about to drop the column `image` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "image",
DROP COLUMN "link";
