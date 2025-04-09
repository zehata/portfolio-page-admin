import { z } from "zod";

export const blogId = z.object({
  blog_id: z.string(),
});
