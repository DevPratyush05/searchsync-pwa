import React from "react";
import { Bookmark, Trash2 } from "lucide-react";
import type { SavedItem } from "../types";
import { getSavedItems, removeSavedItem } from "../utils/localStorage";

const SavedItems: React.FC = () => {
  const [savedItems, setSavedItems] = React.useState<SavedItem[]>([]);

  React.useEffect(() => {
    setSavedItems(getSavedItems());
  }, []);

  const handleRemoveItem = (id: string) => {
    removeSavedItem(id);
    setSavedItems(getSavedItems());
  };

  if (savedItems.length === 0) {
    return (
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
          <Bookmark size={48} />
        </div>
        <h3
          style={{
            fontSize: "1.5rem",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          No saved items yet
        </h3>
        <p>Save interesting search results to find them here later</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        <Bookmark size={24} color="var(--primary-400)" />
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          Saved Items ({savedItems.length})
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {savedItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "1rem",
              padding: "1.25rem",
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "80px",
                    height: "60px",
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.75rem",
                    lineHeight: "1.4",
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      background: "rgba(6, 182, 212, 0.1)",
                      border: "1px solid rgba(6, 182, 212, 0.2)",
                      borderRadius: "0.5rem",
                      color: "var(--primary-300)",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.type}
                  </span>
                  <span>{item.source}</span>
                  <span>
                    Saved on {new Date(item.savedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  padding: "0.5rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "0.5rem",
                  color: "rgb(239, 68, 68)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
