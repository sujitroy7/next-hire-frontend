import { z } from "zod";

const uuidSchema = z.object({
  id: z.string().uuid(),
});

export const validateUUID = (uuid: string) => {
  const parsed = uuidSchema.safeParse(uuid);
  return parsed.success;
};
