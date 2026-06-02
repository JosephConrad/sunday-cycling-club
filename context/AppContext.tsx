"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "pl";
type Theme = "light" | "dark";

interface AppContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("pl");
    const [theme, setTheme] = useState<Theme>("dark");

    const toggleLanguage = () => {
        setLanguage(language === "pl" ? "en" : "pl");
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <AppContext.Provider value={{ language, setLanguage, toggleLanguage, theme, setTheme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
