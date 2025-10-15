import React from "react";
import type { SearchResult } from "../types";

interface VisualizationProps {
  results: SearchResult[];
}

const Visualization: React.FC<VisualizationProps> = ({ results }) => {
  const typeDistribution = results.reduce((acc, result) => {
    acc[result.type] = (acc[result.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalResults = results.length;
  const typeColors = {
    video: "var(--primary-400)",
    article: "var(--primary-300)",
    wiki: "var(--primary-500)",
    reel: "var(--primary-200)",
  };

  const typeIcons = {
    video: "🎥",
    article: "📄",
    wiki: "📚",
    reel: "🎬",
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "1.5rem",
        padding: "1.5rem",
        marginBottom: "2rem",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      <h3
        style={{
          color: "var(--text-primary)",
          fontSize: "1.1rem",
          fontWeight: "600",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        📊 Search Insights
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Type Distribution */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "1rem",
            padding: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h4
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.75rem",
            }}
          >
            Content Types
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {Object.entries(typeDistribution).map(([type, count]) => (
              <div
                key={type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>
                    {typeIcons[type as keyof typeof typeIcons]}
                  </span>
                  <span
                    style={{
                      color: "var(--text-primary)",
                      textTransform: "capitalize",
                    }}
                  >
                    {type}
                  </span>
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    {count}
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${(count / totalResults) * 100}%`,
                        height: "100%",
                        background: typeColors[type as keyof typeof typeColors],
                        borderRadius: "2px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Score Distribution */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "1rem",
            padding: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h4
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.75rem",
            }}
          >
            Match Quality
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `conic-gradient(
                var(--primary-400) 0% ${
                  (results.filter((r) => r.confidence_score >= 0.9).length /
                    totalResults) *
                  100
                }%,
                var(--primary-300) ${
                  (results.filter((r) => r.confidence_score >= 0.9).length /
                    totalResults) *
                  100
                }% ${
                  (results.filter((r) => r.confidence_score >= 0.7).length /
                    totalResults) *
                  100
                }%,
                var(--primary-200) ${
                  (results.filter((r) => r.confidence_score >= 0.7).length /
                    totalResults) *
                  100
                }% 100%
              )`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--bg-card)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "var(--primary-300)",
                }}
              >
                {Math.round(
                  (results.reduce((acc, r) => acc + r.confidence_score, 0) /
                    totalResults) *
                    100
                )}
                %
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "0.5rem",
            }}
          >
            <span>
              High: {results.filter((r) => r.confidence_score >= 0.9).length}
            </span>
            <span>
              Med:{" "}
              {
                results.filter(
                  (r) => r.confidence_score >= 0.7 && r.confidence_score < 0.9
                ).length
              }
            </span>
            <span>
              Low: {results.filter((r) => r.confidence_score < 0.7).length}
            </span>
          </div>
        </div>
      </div>

      {/* Sources Breakdown */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "1rem",
          padding: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <h4
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            fontWeight: "500",
            marginBottom: "0.75rem",
          }}
        >
          Sources
        </h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {Array.from(new Set(results.map((r) => r.source))).map((source) => (
            <div
              key={source}
              style={{
                padding: "0.375rem 0.75rem",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                borderRadius: "0.75rem",
                fontSize: "0.75rem",
                color: "var(--primary-300)",
                fontWeight: "500",
              }}
            >
              {source}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visualization;
