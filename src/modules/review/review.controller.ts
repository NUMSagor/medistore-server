import { Request, Response } from "express";
import reviewService from "./review.service";
import { ReviewStatus } from "../../../generated/prisma/enums";

const reviewController = {
  //  create review of customer
  create: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { medicineId, rating, comment } = req.body;

      if (!medicineId) {
        return res.status(400).json({ error: "Medicine ID is required" });
      }
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }

      const review = await reviewService.create({
        userId,
        medicineId,
        rating,
        comment,
      });

      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  //  get reviews of a medicine-public
  getByMedicine: async (req: Request, res: Response) => {
    try {
      const medicineId = req.query.medicineId;

      if (!medicineId || typeof medicineId !== "string") {
        return res.status(400).json({ error: "Invalid medicineId" });
      }

      const reviews = await reviewService.getByMedicine(medicineId);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // review approve / reject by admin
 

  updateStatus: async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    if (!status || !(status in ReviewStatus)) {
      return res.status(400).json({ error: "Invalid review status" });
    }

    const review = await reviewService.updateStatus(
      id,
      status as ReviewStatus
    );

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
},



};

export default reviewController;
