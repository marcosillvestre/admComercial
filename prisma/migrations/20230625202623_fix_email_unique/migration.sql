/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `login` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "login_email_key" ON "login"("email");
