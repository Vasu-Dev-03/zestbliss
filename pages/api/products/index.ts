import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        let where: Prisma.ProductWhereInput = {};
        
        // Add category filter if provided
        if (category) {
          where.category = category as any; // Cast to Category enum
        }
        
        // Add search filter if provided
        if (search) {
          where.OR = [
            { 
              name: { 
                contains: search as string, 
                mode: 'insensitive' as Prisma.QueryMode 
              } 
            },
            { 
              description: { 
                contains: search as string, 
                mode: 'insensitive' as Prisma.QueryMode 
              } 
            },
          ];
        }

        const [products, total] = await Promise.all([
          prisma.product.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { createdAt: 'desc' },
          }),
          prisma.product.count({ where }),
        ]);

        res.status(200).json({
          products,
          totalPages: Math.ceil(total / Number(limit)),
          currentPage: Number(page),
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    case 'POST':
      try {
        const product = await prisma.product.create({
          data: req.body,
        });
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: 'Error creating product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 