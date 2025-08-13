import { PrismaClient } from '@prisma/client';

interface SeedCategory {
  name: string;
  description?: string;
}

export async function seedCategories(prisma: PrismaClient) {
  const categories: SeedCategory[] = [
    {
      name: 'Electronics',
      description: 'Electronic devices and accessories'
    },
    {
      name: 'Clothing',
      description: 'Apparel and fashion items'
    },
    {
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies'
    }
  ];

  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category
      })
    )
  );

  console.log(`Created ${createdCategories.length} categories`);
  return createdCategories;
}