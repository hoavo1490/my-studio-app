import type { PostType } from "@/lib/types";

export interface PostSchemaInput {
  type: PostType;
  title?: string;
  content?: string;
  mediaUrls?: string[];
  embedUrl?: string;
  tags?: string[];
  isPinned?: boolean;
}

type RawPayload = Record<string, unknown>;

function toRecord(payload: unknown): RawPayload {
  return payload && typeof payload === "object" ? (payload as RawPayload) : {};
}

function extractStrings(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  return value.filter((item): item is string => typeof item === "string");
}

function sanitizeData(raw: RawPayload): PostSchemaInput {
  return {
    type: raw.type as PostType,
    title: typeof raw.title === "string" ? raw.title : undefined,
    content: typeof raw.content === "string" ? raw.content : undefined,
    mediaUrls: extractStrings(raw.mediaUrls),
    embedUrl: typeof raw.embedUrl === "string" ? raw.embedUrl : undefined,
    tags: extractStrings(raw.tags),
    isPinned: typeof raw.isPinned === "boolean" ? raw.isPinned : undefined
  };
}

export function validatePostPayload(payload: unknown) {
  const raw = toRecord(payload);
  const data = sanitizeData(raw);
  const errors: Record<string, string> = {};
  const allowedTypes: PostType[] = ["IMAGE", "VIDEO", "AUDIO", "TEXT"];
  if (!data.type || !allowedTypes.includes(data.type)) {
    errors.type = "Invalid type";
  }
  if (raw.mediaUrls && !Array.isArray(raw.mediaUrls)) {
    errors.mediaUrls = "mediaUrls must be an array";
  }
  if (raw.tags && !Array.isArray(raw.tags)) {
    errors.tags = "tags must be an array";
  }
  return { success: Object.keys(errors).length === 0, data, errors } as const;
}

export function validatePartialPostPayload(payload: unknown) {
  const raw = toRecord(payload);
  const data = sanitizeData(raw);
  const errors: Record<string, string> = {};
  const allowedTypes: PostType[] = ["IMAGE", "VIDEO", "AUDIO", "TEXT"];
  if (raw.type && (!data.type || !allowedTypes.includes(data.type))) {
    errors.type = "Invalid type";
  }
  if (raw.mediaUrls && !Array.isArray(raw.mediaUrls)) {
    errors.mediaUrls = "mediaUrls must be an array";
  }
  if (raw.tags && !Array.isArray(raw.tags)) {
    errors.tags = "tags must be an array";
  }
  return { success: Object.keys(errors).length === 0, data, errors } as const;
}
