-- CreateTable
CREATE TABLE "Saves" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "originalPath" TEXT NOT NULL,

    CONSTRAINT "Saves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saves" ADD CONSTRAINT "Saves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
