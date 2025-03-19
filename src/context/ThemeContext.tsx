import { createContext, useContext, useState, ReactNode } from 'react';
import { ITheme } from '../models/ITheme';
import { themes } from '../constants/styles';

type ThemeType = 'primary' | 'secondary';

interface ThemeContextType {
  currentTheme: ThemeType;
  theme: ITheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('primary');

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'primary' ? 'secondary' : 'primary');
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}