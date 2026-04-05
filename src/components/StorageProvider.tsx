"use client";

import { useEffect } from "react";
import { initializeStorage } from "@/lib/storage";

export default function StorageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      initializeStorage();
    } catch (error) {
      console.error("Failed to initialize storage data:", error);
    }
  }, []);

  return <>{children}</>;
}
