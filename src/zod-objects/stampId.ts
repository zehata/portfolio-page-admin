import { z } from "zod";

export const stampId = z.object({
  id: z.string(),
});
