"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/translations";

export default function Header() {
    const { language, toggleLanguage, theme, toggleTheme } = useApp();
    const t = translations[language].header;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    }, [isMenuOpen]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled || isMenuOpen
                    ? "bg-surface/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
                    : "bg-transparent border-b border-transparent"
            }`}
            id="navbar"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 md:h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {/* Bicycle icon */}
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <svg className="w-5 h-5 md:w-5.5 md:h-5.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="5.5" cy="17.5" r="3.5"/>
                                <circle cx="18.5" cy="17.5" r="3.5"/>
                                <path d="M15 6a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
                                <path d="M12 17.5V14l-3.5-3.5 2.5-2.5 3 3h4"/>
                            </svg>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-foreground font-bold text-xs tracking-[0.15em] uppercase">
                                Sunday
                            </span>
                            <span className="text-accent font-bold text-xs tracking-[0.15em] uppercase ml-1">
                                CC
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="#routes" className="text-muted hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">
                            {t.routes}
                        </Link>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-2 md:space-x-3">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Language toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-all text-xs font-bold uppercase tracking-wider"
                        >
                            {language === "pl" ? "EN" : "PL"}
                        </button>

                        {/* Desktop CTA */}
                        <a
                            href="https://strava.app.link/2vLbqhCTF3b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 bg-accent text-accent-contrast px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-hover transition-all duration-300 hover:scale-105 accent-glow"
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                            </svg>
                            {t.joinStrava}
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-foreground hover:bg-surface-hover rounded-lg transition-colors z-50"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 bg-background z-40 transition-transform duration-500 ease-in-out md:hidden
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}
                style={{ top: "3.5rem" }}
            >
                <div className="flex flex-col h-full p-8">
                    <div className="space-y-6 mt-4">
                        {[
                            { href: "#routes", label: t.routes },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-2xl font-light text-foreground tracking-tight hover:text-accent transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8">
                        <a
                            href="https://strava.app.link/2vLbqhCTF3b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-accent-contrast px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-accent-hover transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                            </svg>
                            {t.joinStrava}
                        </a>
                    </div>

                    <div className="mt-auto pb-12 flex items-center gap-4">
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-2 text-muted font-bold uppercase tracking-widest text-xs hover:text-foreground transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {language === "en" ? "Po polsku" : "In English"}
                        </button>

                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-2 text-muted font-bold uppercase tracking-widest text-xs hover:text-foreground transition-colors"
                        >
                            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
