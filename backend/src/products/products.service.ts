import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createProductDto: CreateProductDto) {
    // Validate that the category exists if categoryId is provided
    if (createProductDto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: createProductDto.categoryId },
      });
      if (!categoryExists) {
        throw new NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
      }
    }

    // Validate that the user exists
    const userExists = await this.prisma.user.findUnique({
      where: { id: createProductDto.createdById },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${createProductDto.createdById} not found`);
    }

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(categoryId?: number, sortByPrice?: 'asc' | 'desc') {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: sortByPrice ? { price: sortByPrice } : undefined,
      include: {
        category: true,
        createdBy: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Ensure product exists before updating
    await this.findOne(id);

    if (updateProductDto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });
      if (!categoryExists) {
        throw new NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    // Ensure product exists before deleting
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
