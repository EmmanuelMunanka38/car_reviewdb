import prisma from '../config/prisma.js';
import { slugify } from '../utils/slugify.js';

export const ReviewService = {
  async createReview(payload) {
    const { specs, gallery, ...reviewData } = payload;
    const slugBase = payload.slug || slugify(payload.title || `${payload.manufacturer}-${payload.model}`);
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const data = await prisma.review.create({
      data: {
        ...reviewData,
        slug,
        specs: specs ? { create: specs } : undefined,
        gallery: gallery ? { create: gallery } : undefined
      },
      include: { specs: true, gallery: true }
    });
    return data;
  },

  async updateReview(id, payload) {
    const { specs, gallery, ...reviewData } = payload;

    const data = await prisma.$transaction(async (tx) => {
      if (specs !== undefined) {
        await tx.reviewSpec.deleteMany({ where: { review_id: id } });
        await tx.reviewSpec.create({ data: { ...specs, review_id: id } });
      }
      if (gallery !== undefined) {
        await tx.reviewGallery.deleteMany({ where: { review_id: id } });
        if (gallery.length > 0) {
          await tx.reviewGallery.createMany({ data: gallery.map(g => ({ ...g, review_id: id })) });
        }
      }
      return tx.review.update({
        where: { id },
        data: { ...reviewData, updated_at: new Date() },
        include: { specs: true, gallery: true }
      });
    });
    return data;
  },

  async softDeleteReview(id) {
    const data = await prisma.review.update({
      where: { id },
      data: { deleted_at: new Date(), updated_at: new Date() }
    });
    return data;
  },

  async restoreReview(id) {
    const data = await prisma.review.update({
      where: { id },
      data: { deleted_at: null, updated_at: new Date() }
    });
    return data;
  },

  async getPublishedReviews({ page = 1, limit = 10, search, manufacturer, minYear, maxYear, minRating, featured } = {}) {
    const skip = (page - 1) * limit;
    const where = {
      status: 'published',
      deleted_at: null,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { manufacturer: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(manufacturer && { manufacturer }),
      ...(minYear && { year: { gte: parseInt(minYear) } }),
      ...(maxYear && { year: { lte: parseInt(maxYear) } }),
      ...(minRating && { rating: { gte: parseFloat(minRating) } }),
      ...(featured === 'true' && { featured: true })
    };

    const [data, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { published_at: 'desc' },
        skip,
        take: limit,
        include: {
          specs: true,
          gallery: { orderBy: { sort_order: 'asc' } }
        }
      }),
      prisma.review.count({ where })
    ]);
    return { data, total, page, limit };
  },

  async getReviewBySlug(slug) {
    const data = await prisma.review.findFirst({
      where: { slug, status: 'published', deleted_at: null },
      include: {
        specs: true,
        gallery: { orderBy: { sort_order: 'asc' } }
      }
    });

    if (data) {
      await prisma.review.update({
        where: { id: data.id },
        data: { views: (data.views || 0) + 1 }
      });
    }

    return data;
  },

  async getFeaturedReviews({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const where = { status: 'published', featured: true, deleted_at: null };

    const [data, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { published_at: 'desc' },
        skip,
        take: limit,
        include: {
          specs: true,
          gallery: { orderBy: { sort_order: 'asc' } }
        }
      }),
      prisma.review.count({ where })
    ]);
    return { data, total, page, limit };
  },

  async adminGetAll({ page = 1, limit = 20, status, search, includeDeleted } = {}) {
    const skip = (page - 1) * limit;
    const where = {
      ...(!includeDeleted && { deleted_at: null }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { manufacturer: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const [data, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.review.count({ where })
    ]);
    return { data, total, page, limit };
  },

  async getAllForSitemap() {
    const data = await prisma.review.findMany({
      where: { status: 'published', deleted_at: null },
      select: { slug: true, updated_at: true },
      orderBy: { published_at: 'desc' }
    });
    return data;
  }
};
