"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LangType = "ko" | "en";

interface LanguageContextType {
  language: LangType;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 기본값은 'ko' (한국어)
  const [language, setLanguage] = useState<LangType>("ko");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ko" ? "en" : "ko"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 다른 페이지에서 쉽게 갖다 쓰기 위한 훅(Hook)
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}