import type { SearchResult } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export interface SearchParams {
  query: string;
  types?: ("video" | "article" | "wiki" | "reel")[];
  limit?: number;
}

class SearchService {
  async search(params: SearchParams): Promise<SearchResult[]> {
    try {
      // Try backend API first
      if (API_BASE_URL && !API_BASE_URL.includes("localhost")) {
        const response = await this.searchBackend(params);
        if (response.length > 0) return response;
      }

      // Fallback to direct API calls
      return await this.searchDirectAPIs(params);
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Search failed. Please try again.");
    }
  }

  private async searchBackend(params: SearchParams): Promise<SearchResult[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) throw new Error("Backend search failed");

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.warn("Backend search failed, falling back to direct APIs");
      return [];
    }
  }

  private async searchDirectAPIs(
    params: SearchParams
  ): Promise<SearchResult[]> {
    const { query, types = ["video", "article", "wiki"], limit = 20 } = params;

    const promises: Promise<SearchResult[]>[] = [];

    if (types.includes("video") && YOUTUBE_API_KEY) {
      promises.push(
        this.searchYouTube(query, Math.floor(limit / types.length))
      );
    }

    if (types.includes("article") && NEWS_API_KEY) {
      promises.push(this.searchNews(query, Math.floor(limit / types.length)));
    }

    if (types.includes("wiki")) {
      promises.push(
        this.searchWikipedia(query, Math.floor(limit / types.length))
      );
    }

    // Mock data for reels and fallback
    if (types.includes("reel") || promises.length === 0) {
      promises.push(
        this.getMockResults(query, types.includes("reel") ? 4 : limit)
      );
    }

    const results = await Promise.allSettled(promises);

    return results
      .filter(
        (result): result is PromiseFulfilledResult<SearchResult[]> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value)
      .sort((a, b) => b.confidence_score - a.confidence_score)
      .slice(0, limit);
  }

  private async searchYouTube(
    query: string,
    limit: number
  ): Promise<SearchResult[]> {
    if (!YOUTUBE_API_KEY) return [];

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${encodeURIComponent(
          query
        )}&type=video&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) return [];

      const data = await response.json();

      return data.items.map((item: any, index: number) => ({
        id: `yt_${item.id.videoId}`,
        type: "video" as const,
        title: item.snippet.title,
        description: item.snippet.description,
        source: "YouTube",
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail:
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        published_date: item.snippet.publishedAt,
        confidence_score: Math.max(0.7, 0.9 - index * 0.05), // Higher score for top results
      }));
    } catch (error) {
      console.error("YouTube API error:", error);
      return [];
    }
  }

  private async searchWikipedia(
    query: string,
    limit: number
  ): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*&srlimit=${limit}`
      );

      if (!response.ok) return [];

      const data = await response.json();

      return data.query.search.map((item: any, index: number) => ({
        id: `wiki_${item.pageid}`,
        type: "wiki" as const,
        title: item.title,
        description: item.snippet.replace(/<[^>]*>/g, "") + "...",
        source: "Wikipedia",
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
        published_date: new Date().toISOString().split("T")[0],
        confidence_score: Math.max(0.8, 0.95 - index * 0.03),
      }));
    } catch (error) {
      console.error("Wikipedia API error:", error);
      return [];
    }
  }

  private async searchNews(
    query: string,
    limit: number
  ): Promise<SearchResult[]> {
    if (!NEWS_API_KEY) return [];

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&pageSize=${limit}&sortBy=relevancy&apiKey=${NEWS_API_KEY}`
      );

      if (!response.ok) return [];

      const data = await response.json();

      return data.articles.map((article: any, index: number) => ({
        id: `news_${btoa(article.url)
          .slice(0, 10)
          .replace(/[^a-zA-Z0-9]/g, "")}`, // Use btoa instead of Buffer
        type: "article" as const,
        title: article.title,
        description:
          article.description || article.content?.substring(0, 200) + "...",
        source: article.source.name,
        url: article.url,
        thumbnail: article.urlToImage,
        published_date: article.publishedAt,
        confidence_score: Math.max(0.6, 0.85 - index * 0.04),
      }));
    } catch (error) {
      console.error("News API error:", error);
      return [];
    }
  }

  private async getMockResults(
    query: string,
    limit: number
  ): Promise<SearchResult[]> {
    // Use our existing mock data as fallback
    const { mockSearchResults } = await import("../data/mockData");

    return mockSearchResults
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
      .map((item) => ({
        ...item,
        confidence_score: Math.random() * 0.2 + 0.7, // Randomize scores for variety
      }))
      .slice(0, limit);
  }
}

export const searchService = new SearchService();
