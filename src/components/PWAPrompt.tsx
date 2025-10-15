import React from "react";
import { RefreshCw, CheckCircle, Download } from "lucide-react";
import { usePWA } from "../hooks/usePWA";

const PWAPrompt: React.FC = () => {
  const { needRefresh, offlineReady, updateSW } = usePWA();

  if (!needRefresh && !offlineReady) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "1rem",
        padding: "1rem 1.5rem",
        color: "var(--text-primary)",
        zIndex: 1000,
        maxWidth: "320px",
        animation: "slideUp 0.3s ease-out",
      }}
    >
      {offlineReady && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <CheckCircle size={20} color="var(--primary-400)" />
          <div>
            <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              App ready to work offline
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              SearchSync can work without internet connection
            </div>
          </div>
        </div>
      )}

      {needRefresh && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <RefreshCw size={20} color="var(--primary-400)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              New version available
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Refresh to update the app
            </div>
          </div>
          <button
            onClick={updateSW}
            style={{
              padding: "0.5rem 1rem",
              background: "var(--primary-500)",
              border: "none",
              borderRadius: "0.5rem",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Download size={14} />
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default PWAPrompt;
