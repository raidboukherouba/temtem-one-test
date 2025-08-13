import { PrismaClient, User } from '@prisma/client';
import { Category } from '@prisma/client';

interface SeedProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  createdById: number;
}

export async function seedProducts(
  prisma: PrismaClient,
  users: User[],
  categories: Category[]
) {
  const owner = users.find(u => u.role === 'STORE_OWNER');
  if (!owner) throw new Error('No store owner found for product seeding');

  const products: SeedProduct[] = [
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 799.99,
      imageUrl: '/images/phonex.jpg',
      categoryId: categories.find(c => c.name === 'Electronics')!.id,
      createdById: owner.id
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 199.99,
      imageUrl: '/images/headphones.jpg',
      categoryId: categories.find(c => c.name === 'Electronics')!.id,
      createdById: owner.id
    },
    {
      name: 'Cotton T-Shirt',
      description: '100% cotton crew neck t-shirt',
      price: 24.99,
      imageUrl: '/images/tshirt.jpg',
      categoryId: categories.find(c => c.name === 'Clothing')!.id,
      createdById: owner.id
    },
    {
      name: 'Gardening Tools Set',
      description: 'Complete set for home gardening',
      price: 49.99,
      imageUrl: '/images/garden_tools.jpg',
      categoryId: categories.find(c => c.name === 'Home & Garden')!.id,
      createdById: owner.id
    }
  ];

  const createdProducts = await Promise.all(
    products.map(product =>
      prisma.product.create({
        data: product
      })
    )
  );

  console.log(`Created ${createdProducts.length} products`);
  return createdProducts;
}