export interface SearchResult {
  id: string;
  type: "video" | "article" | "wiki" | "reel";
  title: string;
  description: string;
  source: string;
  url: string;
  thumbnail?: string;
  published_date?: string;
  confidence_score: number;
}

export interface SavedItem extends SearchResult {
  savedAt: string;
}

export type FilterType = "all" | "video" | "article" | "wiki" | "reel";
