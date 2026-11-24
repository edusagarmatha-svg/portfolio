-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[];
