import { z } from "zod";

export const blog = z.object({
  blog_id: z.string(),
  blog_title: z.string(),
  blog_created: z.string(),
  blog_modified: z.string(),
  blog_content: z.string(),
  blog_slug: z.string(),
});
