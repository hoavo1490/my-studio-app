export type EmbedType = "YOUTUBE" | "VIMEO" | "SPOTIFY" | "SOUNDCLOUD" | "GENERIC";

export interface ParsedEmbed {
  type: EmbedType;
  embedUrl: string;
  originalUrl: string;
}

function getYouTubeId(url: URL) {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.slice(1);
  }
  if (url.searchParams.get("v")) {
    return url.searchParams.get("v");
  }
  const parts = url.pathname.split("/").filter(Boolean);
  return parts.pop();
}

function getVimeoId(url: URL) {
  const parts = url.pathname.split("/").filter(Boolean);
  return parts.pop();
}

export function parseEmbedUrl(link: string): ParsedEmbed {
  try {
    const url = new URL(link);
    if (url.hostname.includes("youtube") || url.hostname.includes("youtu.be")) {
      const id = getYouTubeId(url);
      if (id) {
        return {
          type: "YOUTUBE",
          embedUrl: `https://www.youtube.com/embed/${id}`,
          originalUrl: link
        };
      }
    }
    if (url.hostname.includes("vimeo")) {
      const id = getVimeoId(url);
      if (id) {
        return {
          type: "VIMEO",
          embedUrl: `https://player.vimeo.com/video/${id}`,
          originalUrl: link
        };
      }
    }
    if (url.hostname.includes("spotify")) {
      return {
        type: "SPOTIFY",
        embedUrl: link.includes("embed") ? link : link.replace("spotify.com/", "spotify.com/embed/"),
        originalUrl: link
      };
    }
    if (url.hostname.includes("soundcloud")) {
      return {
        type: "SOUNDCLOUD",
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}`,
        originalUrl: link
      };
    }
    return { type: "GENERIC", embedUrl: link, originalUrl: link };
  } catch {
    return { type: "GENERIC", embedUrl: link, originalUrl: link };
  }
}
