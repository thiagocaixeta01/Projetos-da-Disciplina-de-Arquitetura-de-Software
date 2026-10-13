import { IProductRepository } from './IProductRepository';
import { prisma } from '../lib/prisma';

export class PrismaProductRepository implements IProductRepository {
  async findById(id: number) {
    return prisma.product.findUnique({ where: { id }});
  }
}