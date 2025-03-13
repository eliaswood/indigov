-- CreateEnum
CREATE TYPE "FigureType" AS ENUM ('CONGRESS', 'SENATE', 'HOUSE', 'STATE_SENATE', 'STATE_HOUSE', 'GOVERNOR', 'OTHER');

-- CreateEnum
CREATE TYPE "PoliticalParty" AS ENUM ('DEMOCRATIC', 'REPUBLICAN', 'LIBERTARIAN', 'GREEN', 'CONSTITUTION', 'ALLIANCE', 'AMERICAN_SOLIDARITY', 'FORWARD', 'REFORM', 'SOCIALIST_PARTY_USA', 'WORKING_FAMILIES', 'PEACE_AND_FREEDOM', 'PROHIBITION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "figureType" "FigureType",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constituents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "county" TEXT,
    "partyAffiliation" "PoliticalParty",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVoter" BOOLEAN NOT NULL DEFAULT true,
    "approvalRating" INTEGER,
    "representedById" TEXT,

    CONSTRAINT "Constituents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Constituents_email_key" ON "Constituents"("email");

-- AddForeignKey
ALTER TABLE "Constituents" ADD CONSTRAINT "Constituents_representedById_fkey" FOREIGN KEY ("representedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
