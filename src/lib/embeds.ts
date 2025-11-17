export type EmbedType = "YOUTUBE" | "VIMEO" | "SPOTIFY" | "SOUNDCLOUD" | "GENERIC";

export interface ParsedEmbed {
  type: EmbedType;
  embedUrl: string;
  originalUrl: string;
}

const YT_REGEX = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/i;
const VIMEO_REGEX = /vimeo\.com\/(\d+)/i;

export function parseEmbedUrl(url: string): ParsedEmbed {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "").toLowerCase();

    if (hostname.includes("youtube") || hostname.includes("youtu.be")) {
      const match = url.match(YT_REGEX);
      if (match?.[1]) {
        return {
          type: "YOUTUBE",
          embedUrl: `https://www.youtube.com/embed/${match[1]}`,
          originalUrl: url,
        };
      }
    }

    if (hostname.includes("vimeo")) {
      const match = url.match(VIMEO_REGEX);
      if (match?.[1]) {
        return {
          type: "VIMEO",
          embedUrl: `https://player.vimeo.com/video/${match[1]}`,
          originalUrl: url,
        };
      }
    }

    if (hostname.includes("spotify")) {
      if (!url.includes("embed")) {
        return {
          type: "SPOTIFY",
          embedUrl: `https://open.spotify.com/embed/${url.split("open.spotify.com/")[1]}`,
          originalUrl: url,
        };
      }
      return { type: "SPOTIFY", embedUrl: url, originalUrl: url };
    }

    if (hostname.includes("soundcloud")) {
      return {
        type: "SOUNDCLOUD",
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`,
        originalUrl: url,
      };
    }
  } catch (error) {
    console.error("Failed to parse embed url", error);
  }

  return { type: "GENERIC", embedUrl: url, originalUrl: url };
}
