// src/controllers/videoController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { cat } = req.query;
    const videos = await prisma.video.findMany({
      where: cat ? { category: cat as string } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
