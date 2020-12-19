-- CreateTable
CREATE TABLE "users" (
"id" SERIAL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.uid_unique" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
