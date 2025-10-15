import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchView from "./components/SearchView";
import SavedItems from "./components/SavedItems";
import History from "./components/History";
import Settings from "./components/Settings";
import PWAPrompt from "./components/PWAPrompt";
import { useMobile } from "./hooks/useMobile";

type AppView = "search" | "saved" | "history" | "settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<AppView>("search");
  const isMobile = useMobile();

  const mainContentMargin = isMobile ? "0" : sidebarOpen ? "280px" : "80px";

  const renderActiveView = () => {
    switch (activeView) {
      case "search":
        return <SearchView />;
      case "saved":
        return <SavedItems />;
      case "history":
        return <History />;
      case "settings":
        return <Settings />;
      default:
        return <SearchView />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements - hide on mobile for performance */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, var(--primary-500) 0%, transparent 70%)",
              opacity: 0.1,
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
              filter: "blur(40px)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "15%",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, var(--primary-400) 0%, transparent 70%)",
              opacity: 0.05,
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite reverse",
              filter: "blur(50px)",
            }}
          ></div>
        </>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <div
        style={{
          marginLeft: mainContentMargin,
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          minHeight: "100vh",
          padding: isMobile ? "1rem" : "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {renderActiveView()}
        </div>
      </div>

      {/* PWA Update Prompt */}
      <PWAPrompt />

      <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Mobile optimizations */
                @media (max-width: 768px) {
                    body {
                        font-size: 14px;
                    }
                }
            `}</style>
    </div>
  );
}

export default App;
