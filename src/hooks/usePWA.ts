import { useEffect, useState } from "react";

export function usePWA() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleSW = (e: any) => {
      setNeedRefresh(true);
      setUpdateSW(() => () => e.detail.skipWaiting());
    };

    const handleOfflineReady = () => {
      setOfflineReady(true);
    };

    window.addEventListener("swNeedRefresh", handleSW);
    window.addEventListener("swOfflineReady", handleOfflineReady);

    return () => {
      window.removeEventListener("swNeedRefresh", handleSW);
      window.removeEventListener("swOfflineReady", handleOfflineReady);
    };
  }, []);

  return {
    needRefresh,
    offlineReady,
    updateSW: updateSW || (() => window.location.reload()),
  };
}
