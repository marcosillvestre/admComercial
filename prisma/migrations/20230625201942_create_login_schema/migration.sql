-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);
