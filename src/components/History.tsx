import React from "react";
import { History as HistoryIcon } from "lucide-react";

const History: React.FC = () => {
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
        <HistoryIcon size={48} />
      </div>
      <h3
        style={{
          fontSize: "1.5rem",
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        Search History
      </h3>
      <p>Your search history will appear here</p>
    </div>
  );
};

export default History;
