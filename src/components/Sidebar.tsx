import React from "react";
import { Search, Bookmark, History, Settings, Menu, X } from "lucide-react";
import { useMobile } from "../hooks/useMobile";

export type AppView = "search" | "saved" | "history" | "settings";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeView,
  onViewChange,
}) => {
  const isMobile = useMobile();

  // On mobile, sidebar should be full screen when open
  const sidebarWidth = isMobile
    ? isOpen
      ? "100vw"
      : "0"
    : isOpen
    ? "280px"
    : "80px";
  const sidebarLeft = isMobile ? (isOpen ? "0" : "-100%") : "0";

  const menuItems: { id: AppView; label: string; icon: React.ElementType }[] = [
    { id: "search", label: "Search", icon: Search },
    { id: "saved", label: "Saved Items", icon: Bookmark },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Hamburger Button - Only show on mobile when sidebar is closed */}
      {isMobile && !isOpen && (
        <button
          onClick={onToggle}
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 60,
            padding: "0.75rem",
            background: "rgba(17, 24, 39, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0.75rem",
            color: "var(--text-primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile Overlay - Show on mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarLeft,
          height: "100vh",
          width: sidebarWidth,
          background: "rgba(17, 24, 39, 0.98)",
          backdropFilter: "blur(20px)",
          borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow:
            isMobile && isOpen ? "0 0 50px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: isMobile ? "1rem" : isOpen ? "1.5rem 1.5rem 1rem" : "1rem",
            minHeight: "60px",
            flexShrink: 0,
          }}
        >
          {/* Close button - show on mobile when open, always show on desktop */}
          {(isMobile && isOpen) || !isMobile ? (
            <button
              onClick={onToggle}
              style={{
                padding: "0.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.75rem",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : null}

          {/* Logo/Brand */}
          {(isOpen || isMobile) && (
            <div
              style={{
                background:
                  "linear-gradient(45deg, var(--primary-300), var(--primary-400))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: isMobile ? "1.5rem" : "1.25rem",
                fontWeight: "800",
                whiteSpace: "nowrap",
              }}
            >
              SearchSync
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav
          style={{
            flex: 1,
            padding: isMobile ? "2rem 1rem" : "1rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflowY: "auto",
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (isMobile) onToggle(); // Close sidebar on mobile after selection
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isOpen || isMobile ? "0.75rem" : "0",
                  padding: isMobile ? "1rem 1.25rem" : "0.75rem 1rem",
                  background: isActive
                    ? "rgba(6, 182, 212, 0.2)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(6, 182, 212, 0.3)"
                    : "1px solid transparent",
                  borderRadius: "0.75rem",
                  color: isActive
                    ? "var(--primary-300)"
                    : "var(--text-secondary)",
                  fontSize: isMobile ? "1rem" : "0.9rem",
                  fontWeight: isActive ? "600" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                  justifyContent: isOpen || isMobile ? "flex-start" : "center",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(6, 182, 212, 0.15)"
                    : "none",
                }}
              >
                <Icon size={isMobile ? 24 : 20} />
                {(isOpen || isMobile) && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 0.75rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            SearchSync v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
