import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

interface SeedUser {
  email: string;
  password: string;
  role: Role;
}

export async function seedUsers(prisma: PrismaClient) {
  const password = await hash('password123', 10);
  
  const users: SeedUser[] = [
    {
      email: 'owner@store.com',
      password,
      role: Role.STORE_OWNER
    },
    {
      email: 'customer1@example.com',
      password,
      role: Role.GUEST
    },
    {
      email: 'customer2@example.com',
      password,
      role: Role.GUEST
    }
  ];

  const createdUsers = await Promise.all(
    users.map(user => 
      prisma.user.create({
        data: user
      })
    )
  );

  console.log(`Created ${createdUsers.length} users`);
  return createdUsers;
}