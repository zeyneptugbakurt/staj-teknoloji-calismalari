-- CreateTable
CREATE TABLE "Ogrenci" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL,
    "yas" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ogrenci_email_key" ON "Ogrenci"("email");
