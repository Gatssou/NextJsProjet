import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Récupère tous les users sans email
  const users = await prisma.user.findMany({
    where: { email: null }
  });

  console.log(`${users.length} utilisateurs à mettre à jour`);

  // Génère des emails temporaires
  for (const user of users) {
    const tempEmail = `${user.username}@temp.local`;
    
    await prisma.user.update({
      where: { id: user.id },
      data: { email: tempEmail }
    });
    
    console.log(`✓ ${user.username} → ${tempEmail}`);
  }

  console.log('Mise à jour terminée !');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());