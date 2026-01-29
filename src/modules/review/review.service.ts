import { prisma } from "../../lib/prisma";
import { ReviewStatus } from "../../../generated/prisma/enums";

const reviewService = {
  //  creates review of customer
  create: async (data: {
    rating: number;
    comment?: string;
    userId: string;
    medicineId: string;
  }) => {
    return prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment ?? null, // 🔥 KEY FIX
        userId: data.userId,
        medicineId: data.medicineId,
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


