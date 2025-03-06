
import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme", // Cambié la clave para evitar posibles conflictos
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Obtenemos el tema desde localStorage
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      // Si el valor es 'true' o 'false', lo mapeamos a 'dark' o 'light'
      return storedTheme === 'true' ? 'dark' : 'light';
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    console.log('Setting theme to:', newTheme);  // Verifica si esta línea se ejecuta
    // Guardamos 'true' o 'false' en lugar de 'dark' y 'light'
    localStorage.setItem(storageKey, newTheme === 'dark' ? 'true' : 'false');
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}


export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

