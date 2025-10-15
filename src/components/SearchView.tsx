import { useState } from "react";
import SearchBar from "./SearchBar";
import ResultCard from "./ResultCard";
import FilterTabs from "./FilterTabs";
import Visualization from "./Visualization";
import { quickSuggestions } from "../data/mockData";
import { searchService, type SearchParams } from "../services/api";
import type { SearchResult, FilterType } from "../types";

const SearchView: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleResults, setVisibleResults] = useState(8);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setActiveFilter("all");
    setVisibleResults(8);
    setLastQuery(query);

    try {
      const searchParams: SearchParams = {
        query: query.trim(),
        types: ["video", "article", "wiki", "reel"],
        limit: 30,
      };

      const results = await searchService.search(searchParams);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      // Error handling will be added in the next step
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleResults((prev) => prev + 8);
  };

  const filteredResults =
    activeFilter === "all"
      ? searchResults
      : searchResults.filter((result) => result.type === activeFilter);

  const resultCounts = {
    all: searchResults.length,
    video: searchResults.filter((r) => r.type === "video").length,
    article: searchResults.filter((r) => r.type === "article").length,
    wiki: searchResults.filter((r) => r.type === "wiki").length,
    reel: searchResults.filter((r) => r.type === "reel").length,
  };

  return (
    <div>
      {/* Header */}
      {!hasSearched && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            animation: "fadeIn 1s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
              padding: "0.5rem 1.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "2rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "var(--primary-400)",
                borderRadius: "50%",
                animation: "glow-pulse 2s ease-in-out infinite",
              }}
            ></div>
            <span
              style={{
                color: "var(--primary-300)",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              SEARCH SYNC
            </span>
          </div>

          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: "800",
              background:
                "linear-gradient(45deg, var(--primary-200), var(--primary-400), var(--primary-300))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "1rem",
              textShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
            }}
          >
            Search Reimagined
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Intelligent search across videos, articles, and knowledge bases with
            AI-powered results
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ marginBottom: "3rem" }}>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Quick Suggestions */}
      {!hasSearched && (
        <div
          style={{
            textAlign: "center",
            animation: "fadeIn 0.8s ease-out 0.3s both",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Try searching for
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              maxWidth: "40rem",
              margin: "0 auto",
            }}
          >
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "1.5rem",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
                  e.currentTarget.style.borderColor = "var(--primary-500)";
                  e.currentTarget.style.color = "var(--primary-300)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--glow-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            textAlign: "center",
            marginTop: "4rem",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.5rem 2rem",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "1.5rem",
            }}
          >
            <div
              style={{
                width: "1.5rem",
                height: "1.5rem",
                border: "2px solid var(--primary-500)",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p
              style={{
                color: "var(--primary-300)",
                fontWeight: "500",
              }}
            >
              Searching across platforms...
            </p>
          </div>
        </div>
      )}

      {/* Results and Filters */}
      {hasSearched && !isLoading && searchResults.length > 0 && (
        <>
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            resultCounts={resultCounts}
          />

          <Visualization results={searchResults} />

          <div
            style={{
              marginBottom: "2rem",
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            Showing {Math.min(visibleResults, filteredResults.length)} of{" "}
            {filteredResults.length} results for "{lastQuery}"
          </div>

          {/* Results Grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {filteredResults.slice(0, visibleResults).map((result, index) => (
              <div
                key={result.id}
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <ResultCard result={result} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleResults < filteredResults.length && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={handleLoadMore}
                style={{
                  padding: "0.75rem 2rem",
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "1rem",
                  color: "var(--primary-300)",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
                  e.currentTarget.style.boxShadow = "var(--glow-primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Load More ({filteredResults.length - visibleResults} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* No Results State */}
      {hasSearched && !isLoading && searchResults.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              opacity: 0.5,
            }}
          >
            🔍
          </div>
          <h3
            style={{
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            No results found for "{lastQuery}"
          </h3>
          <p>Try different keywords or check your spelling</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchView;
