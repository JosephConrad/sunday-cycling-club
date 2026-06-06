"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { translations } from "@/translations";

export default function Footer() {
    const { language, toggleLanguage, theme, toggleTheme } = useApp();
    const t = translations[language].footer;

    return (
        <footer className="bg-background py-16 border-t border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="5.5" cy="17.5" r="3.5"/>
                                    <circle cx="18.5" cy="17.5" r="3.5"/>
                                    <path d="M15 6a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
                                    <path d="M12 17.5V14l-3.5-3.5 2.5-2.5 3 3h4"/>
                                </svg>
                            </div>
                            <div>
                                <span className="text-foreground font-bold text-sm tracking-[0.15em] uppercase">Sunday</span>
                                <span className="text-accent font-bold text-sm tracking-[0.15em] uppercase ml-1">Cycling Club</span>
                            </div>
                        </div>
                        <p className="text-muted max-w-sm leading-relaxed text-sm">
                            {t.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4 text-sm">{t.quickLinks}</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-muted hover:text-accent transition-colors text-sm">{t.home}</Link></li>
                            <li><Link href="#routes" className="text-muted hover:text-accent transition-colors text-sm">{t.routes}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Controls Row */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors border border-border rounded-full text-xs font-semibold uppercase tracking-widest bg-surface hover:bg-surface-hover"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {language === "pl" ? "In English" : "Po polsku"}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors border border-border rounded-full text-xs font-semibold uppercase tracking-widest bg-surface hover:bg-surface-hover"
                    >
                        {theme === "dark" ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Light Mode
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                                Dark Mode
                            </>
                        )}
                    </button>
                </div>

                {/* Social & Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                        {/* Strava */}
                        <a href="https://strava.app.link/2vLbqhCTF3b" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                            </svg>
                        </a>
                        {/* Instagram */}
                        {/* <a href="https://instagram.com/sundaycyclingclub" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a> */}
                    </div>
                    <p className="text-muted text-sm">
                        {t.madeWith} © {new Date().getFullYear()} Sunday Cycling Club
                    </p>
                </div>
            </div>
        </footer>
    );
}
