/*
  Warnings:

  - The values [Male,Female] on the enum `UserSex` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endDate` on the `Assignment` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserSex_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "Student" ALTER COLUMN "sex" TYPE "UserSex_new" USING ("sex"::text::"UserSex_new");
ALTER TABLE "Teacher" ALTER COLUMN "sex" TYPE "UserSex_new" USING ("sex"::text::"UserSex_new");
ALTER TYPE "UserSex" RENAME TO "UserSex_old";
ALTER TYPE "UserSex_new" RENAME TO "UserSex";
DROP TYPE "UserSex_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "endDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "supervisorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "birthday" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "birthday" TIMESTAMP(3),
ALTER COLUMN "img" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
