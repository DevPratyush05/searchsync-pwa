import React from "react";
import type { FilterType } from "../types";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  resultCounts: {
    all: number;
    video: number;
    article: number;
    wiki: number;
    reel: number;
  };
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  resultCounts,
}) => {
  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: "all", label: "All Results", icon: "🌐" },
    { key: "video", label: "Videos", icon: "🎥" },
    { key: "article", label: "Articles", icon: "📄" },
    { key: "wiki", label: "Wiki", icon: "📚" },
    { key: "reel", label: "Reels", icon: "🎬" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        padding: "0.75rem",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "1.5rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            background:
              activeFilter === filter.key
                ? "rgba(6, 182, 212, 0.2)"
                : "rgba(255, 255, 255, 0.05)",
            border:
              activeFilter === filter.key
                ? "1px solid rgba(6, 182, 212, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            color:
              activeFilter === filter.key
                ? "var(--primary-300)"
                : "var(--text-secondary)",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            if (activeFilter !== filter.key) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeFilter !== filter.key) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }
          }}
        >
          <span style={{ fontSize: "1rem" }}>{filter.icon}</span>
          {filter.label}
          <span
            style={{
              marginLeft: "0.25rem",
              padding: "0.125rem 0.5rem",
              background:
                activeFilter === filter.key
                  ? "rgba(6, 182, 212, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
              borderRadius: "1rem",
              fontSize: "0.75rem",
              fontWeight: "600",
              minWidth: "1.5rem",
              textAlign: "center",
            }}
          >
            {resultCounts[filter.key]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
