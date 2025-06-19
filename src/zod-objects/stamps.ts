import { stampIcon } from "@/lib/types";
import { z } from "zod";

export const stamps = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  color: z.string(),
  icon: z.enum(stampIcon),
});
