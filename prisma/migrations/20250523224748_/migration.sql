-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "isVip" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
