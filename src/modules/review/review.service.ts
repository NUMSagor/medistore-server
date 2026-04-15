import { ReviewStatus } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";

const reviewService = {
  //  creates review of customer
  // create: async (data: {
  //   rating: number;
  //   comment?: string;
  //   userId: string;
  //   medicineId: string;
  // }) => {
  //   return prisma.review.create({
  //     data: {
  //       rating: data.rating,
  //       comment: data.comment ?? null, // 🔥 KEY FIX
  //       userId: data.userId,
  //       medicineId: data.medicineId,
  //     },
  //   });
  // },

  create: async (data: {
    rating: number;
    comment?: string;
    userId: string;
    medicineId: string;
  }) => {
    return prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment ?? null,
        userId: data.userId,
        medicineId: data.medicineId,
        status: ReviewStatus.APPROVED, // ← add করুন
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });
  },

  //  updates status by admin
  updateStatus: async (id: string, status: ReviewStatus) => {
    return prisma.review.update({
      where: { id },
      data: { status },
    });
  },

  //  get approved reviews
  getByMedicine: async (medicineId: string) => {
    return prisma.review.findMany({
      where: {
        medicineId,
        status: ReviewStatus.APPROVED,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};

export default reviewService;


