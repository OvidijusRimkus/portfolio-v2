-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "developmentProcess" TEXT,
ADD COLUMN     "lessonsLearned" TEXT,
ADD COLUMN     "methodology" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "problemsSolved" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "projectManagement" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "techDetails" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "testingProcess" TEXT;

-- CreateTable
CREATE TABLE "project_images" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_images_projectId_idx" ON "project_images"("projectId");

-- CreateIndex
CREATE INDEX "project_images_sortOrder_idx" ON "project_images"("sortOrder");

-- CreateIndex
CREATE INDEX "projects_sortOrder_idx" ON "projects"("sortOrder");

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
