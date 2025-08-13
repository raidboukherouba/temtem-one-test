import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users.seed';
import { seedCategories } from './categories.seed';
import { seedProducts } from './products.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');
  
  // Clear existing data (optional - be careful in production!)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Seed in proper order to maintain relationships
  const users = await seedUsers(prisma);
  const categories = await seedCategories(prisma);
  await seedProducts(prisma, users, categories);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });