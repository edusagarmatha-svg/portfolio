-- CreateTable
CREATE TABLE "Leadership" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Leadership_portfolioId_displayOrder_idx" ON "Leadership"("portfolioId", "displayOrder");

-- CreateIndex
CREATE INDEX "Leadership_portfolioId_status_idx" ON "Leadership"("portfolioId", "status");

-- CreateIndex
CREATE INDEX "Insight_portfolioId_displayOrder_idx" ON "Insight"("portfolioId", "displayOrder");

-- CreateIndex
CREATE INDEX "Insight_portfolioId_status_idx" ON "Insight"("portfolioId", "status");

-- AddForeignKey
ALTER TABLE "Leadership" ADD CONSTRAINT "Leadership_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
