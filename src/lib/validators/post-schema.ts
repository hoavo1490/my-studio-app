import { z } from "zod";

export const postSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "AUDIO", "TEXT"]),
  title: z.string().trim().max(120).optional().nullable(),
  content: z.string().trim().max(4000).optional().nullable(),
  mediaUrls: z.array(z.string().url()).optional().nullable(),
  embedUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string().trim().max(32)).optional().nullable(),
  isPinned: z.boolean().optional(),
});

export type PostInput = z.infer<typeof postSchema>;
