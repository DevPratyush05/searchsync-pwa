import React from "react";
import {
  ExternalLink,
  Bookmark,
  Play,
  FileText,
  Globe,
  Calendar,
  Star,
} from "lucide-react";
import type { SearchResult } from "../types";
import { saveItem, removeSavedItem, isItemSaved } from "../utils/localStorage";

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [saved, setSaved] = React.useState(isItemSaved(result.id));

  const handleSaveToggle = () => {
    if (saved) {
      removeSavedItem(result.id);
    } else {
      saveItem(result);
    }
    setSaved(!saved);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play size={16} />;
      case "article":
        return <FileText size={16} />;
      case "wiki":
        return <Globe size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "var(--primary-400)";
      case "article":
        return "var(--primary-300)";
      case "wiki":
        return "var(--primary-500)";
      default:
        return "var(--primary-400)";
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return "var(--primary-400)";
    if (score >= 0.7) return "var(--primary-300)";
    return "var(--primary-200)";
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "1.5rem",
        padding: "1.5rem",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--glow-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header with Type and Confidence */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.75rem",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "1rem",
              color: getTypeColor(result.type),
            }}
          >
            {getTypeIcon(result.type)}
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {result.type}
            </span>
          </div>

          {/* Confidence Score with Visual Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.75rem",
              background: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.2)",
              borderRadius: "1rem",
            }}
          >
            <Star
              size={12}
              color={getConfidenceColor(result.confidence_score)}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: getConfidenceColor(result.confidence_score),
              }}
            >
              {Math.round(result.confidence_score * 100)}%
            </span>
          </div>
        </div>

        {/* Source Badge */}
        <div
          style={{
            padding: "0.375rem 0.75rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            fontWeight: "500",
          }}
        >
          {result.source}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Thumbnail with Overlay */}
        {result.thumbnail && (
          <div
            style={{
              flexShrink: 0,
              width: "140px",
              height: "90px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              position: "relative",
              background: "var(--bg-secondary)",
            }}
          >
            <img
              src={result.thumbnail}
              alt={result.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(45deg, rgba(6, 182, 212, 0.1), transparent)",
              }}
            ></div>

            {/* Play Button for Videos */}
            {result.type === "video" && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "32px",
                  height: "32px",
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-600)",
                }}
              >
                <Play size={16} fill="currentColor" />
              </div>
            )}
          </div>
        )}

        {/* Text Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {result.title}
          </h3>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginBottom: "1rem",
              lineHeight: "1.5",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {result.description}
          </p>

          {/* Meta Information */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            {result.published_date && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Calendar size={12} />
                {new Date(result.published_date).toLocaleDateString()}
              </span>
            )}

            {/* Visual Confidence Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${result.confidence_score * 100}%`,
                    height: "100%",
                    background: getConfidenceColor(result.confidence_score),
                    borderRadius: "2px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "rgba(6, 182, 212, 0.1)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            borderRadius: "1rem",
            color: "var(--primary-300)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: "600",
            transition: "all 0.2s ease",
            flex: 1,
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.3)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <ExternalLink size={16} />
          Open {result.type}
        </a>

        <button
          onClick={handleSaveToggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: saved
              ? "rgba(6, 182, 212, 0.2)"
              : "rgba(255, 255, 255, 0.05)",
            border: saved
              ? "1px solid rgba(6, 182, 212, 0.3)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            color: saved ? "var(--primary-300)" : "var(--text-secondary)",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!saved) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "var(--primary-300)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!saved) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
