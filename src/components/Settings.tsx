import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

const Settings: React.FC = () => {
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
        <SettingsIcon size={48} />
      </div>
      <h3
        style={{
          fontSize: "1.5rem",
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        Settings
      </h3>
      <p>App settings and preferences</p>
    </div>
  );
};

export default Settings;
