import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing products
  await prisma.product.deleteMany();

  // Insert sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Gaming Mouse',
        description: 'High precision wireless gaming mouse.',
        price: 49.99,
        category: 'Electronics',
        image: 'https://example.com/images/mouse.jpg',
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with blue switches.',
        price: 89.99,
        category: 'Electronics',
        image: 'https://example.com/images/keyboard.jpg',
      },
      {
        name: 'Office Chair',
        description: 'Ergonomic office chair with lumbar support.',
        price: 199.99,
        category: 'Furniture',
        image: 'https://example.com/images/chair.jpg',
      },
    ],
  });

  console.log('✅ Products inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
