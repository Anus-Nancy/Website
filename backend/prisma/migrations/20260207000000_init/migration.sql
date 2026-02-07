-- Initial schema for FixIt Now
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'PROVIDER', 'ADMIN');
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Category" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "description" TEXT
);

CREATE TABLE "Service" (
  "id" TEXT PRIMARY KEY,
  "providerId" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "Request" (
  "id" TEXT PRIMARY KEY,
  "customerId" TEXT NOT NULL,
  "providerId" TEXT,
  "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "imageUrls" TEXT[] NOT NULL,
  "schedule" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Payment" (
  "id" TEXT PRIMARY KEY,
  "requestId" TEXT NOT NULL UNIQUE,
  "amount" DECIMAL(10,2) NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "transactionId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Review" (
  "id" TEXT PRIMARY KEY,
  "customerId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Message" (
  "id" TEXT PRIMARY KEY,
  "requestId" TEXT NOT NULL,
  "senderId" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "Service" ADD CONSTRAINT "Service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id");
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id");
ALTER TABLE "Request" ADD CONSTRAINT "Request_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id");
ALTER TABLE "Request" ADD CONSTRAINT "Request_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id");
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id");
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id");
ALTER TABLE "Review" ADD CONSTRAINT "Review_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id");
ALTER TABLE "Message" ADD CONSTRAINT "Message_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id");
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id");
