"use client";

// Importamos como 'NextThemesProvider' para não chocar com o nome da nossa função
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}