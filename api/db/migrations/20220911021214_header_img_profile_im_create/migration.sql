-- AlterTable
ALTER TABLE "User" ADD COLUMN     "headerImgId" INTEGER,
ADD COLUMN     "profileImgId" INTEGER;

-- CreateTable
CREATE TABLE "ProfileImg" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "ProfileImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeaderImg" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "HeaderImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileImgId_fkey" FOREIGN KEY ("profileImgId") REFERENCES "ProfileImg"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_headerImgId_fkey" FOREIGN KEY ("headerImgId") REFERENCES "HeaderImg"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImg" ADD CONSTRAINT "ProfileImg_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeaderImg" ADD CONSTRAINT "HeaderImg_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
