import { z } from "zod";

export const createReviewSchema = z.object({
  commentsParagraph: z.string().min(3, { message: "Required" }),
});

export type CreateReview = z.infer<typeof createReviewSchema>;
