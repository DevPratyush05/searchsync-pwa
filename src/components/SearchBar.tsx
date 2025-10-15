import React, { useState } from "react";
import { Search, Mic, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "48rem", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "relative",
            marginBottom: "1rem",
          }}
        >
          {/* Animated Background Effect - Softer Glow, slightly reduced opacity */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100% + 16px)",
              height: "calc(100% + 16px)",
              background:
                "linear-gradient(45deg, var(--primary-500), var(--primary-300), var(--primary-500))",
              borderRadius: "2rem",
              filter: "blur(100px)",
              opacity: 0.25,
              zIndex: 0,
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <Search size={18} color="var(--primary-300)" />{" "}
            {/* Slightly smaller icon */}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... Search across videos, articles, and knowledge"
            style={{
              width: "100%",

              padding: "1rem 1.25rem 1rem 3.5rem",
              fontSize: "1rem",
              border: "1px solid var(--border-secondary)",
              borderRadius: "2rem",

              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(8px)",
              color: "var(--text-primary)",
              outline: "none",
              position: "relative",
              zIndex: 1,
              boxShadow: "var(--shadow-glow)",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              // Softer glow on focus
              e.target.style.boxShadow = "var(--glow-primary)";
              e.target.style.borderColor = "var(--primary-400)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "var(--shadow-glow)";
              e.target.style.borderColor = "var(--border-secondary)";
            }}
            disabled={isLoading}
          />

          <div
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 2,
            }}
          >
            {/* Voice button */}
            <button
              type="button"
              style={{
                padding: "0.5rem", // Slightly smaller padding
                borderRadius: "1.5rem", // Rounder corners
                border: "none",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                color: "var(--primary-300)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Voice search"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-700)";
                e.currentTarget.style.boxShadow = "0 0 5px var(--primary-300)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Mic size={16} /> {/* Slightly smaller icon */}
            </button>

            {/* Search button */}
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              style={{
                padding: "0.6rem 1.25rem", // Smaller padding
                background:
                  query.trim() && !isLoading
                    ? "linear-gradient(45deg, var(--primary-500), var(--primary-400))"
                    : "var(--bg-card)",
                color: "var(--text-primary)",
                border: "none",
                borderRadius: "1.5rem", // Rounder corners
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: query.trim() && !isLoading ? "pointer" : "not-allowed",
                boxShadow:
                  query.trim() && !isLoading ? "var(--glow-primary)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (query.trim() && !isLoading) {
                  // Added a subtle hover-up/ripple effect for the main button
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(0, 188, 212, 0.2), var(--glow-intense)";
                }
              }}
              onMouseLeave={(e) => {
                if (query.trim() && !isLoading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--glow-primary)";
                }
              }}
            >
              <Sparkles size={14} /> {/* Slightly smaller icon */}
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
