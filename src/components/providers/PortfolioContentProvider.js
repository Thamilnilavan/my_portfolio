"use client";

import { createContext, useContext } from "react";

const PortfolioContentContext = createContext(null);

export default function PortfolioContentProvider({ content, children }) {
  return (
    <PortfolioContentContext.Provider value={content}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const content = useContext(PortfolioContentContext);

  if (!content) {
    throw new Error("usePortfolioContent must be used inside PortfolioContentProvider.");
  }

  return content;
}
