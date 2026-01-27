import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`);
  console.log("Table User vidée et IDs remis à zéro !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
