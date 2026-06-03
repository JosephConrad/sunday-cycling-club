"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { translations } from "@/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextRide from "@/components/NextRide";
import RecentRides from "@/components/RecentRides";

function RuleIcon({ icon }: { icon: string }) {
    const icons: Record<string, React.ReactNode> = {
        helmet: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
        hand: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />,
        group: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
        bike: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
        weather: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
        respect: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    };
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[icon]}
        </svg>
    );
}

export default function Home() {
    const { language } = useApp();
    const t = translations[language];

    return (
        <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/hero-cycling.png" alt="Sunday Cycling Club peloton" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                        <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
                            {language === "pl" ? "Każda niedziela, 7:30" : "Every Sunday, 7:30 AM"}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-tight">
                        {t.hero.tagline}
                    </h1>
                    <p className="text-lg md:text-2xl font-light text-white/80 mb-12 tracking-wide">
                        {t.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#routes" className="bg-accent text-accent-contrast px-8 py-4 rounded-full font-semibold hover:bg-accent-hover transition-all duration-300 text-lg shadow-xl hover:scale-105 accent-glow">
                            {t.hero.cta}
                        </a>
                        <a href="https://strava.app.link/2vLbqhCTF3b" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-lg">
                            {t.hero.ctaStrava}
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Next Ride Section */}
            <NextRide />

            {/* Recent Rides from Strava */}
            <RecentRides />

            {/* Rules Section */}
            {/* <section id="rules" className="py-20 bg-surface border-y border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t.rules.title}</h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto font-light">{t.rules.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t.rules.items.map((rule, idx) => (
                            <div key={idx} className="group bg-background rounded-2xl border border-border p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <RuleIcon icon={rule.icon} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{rule.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{rule.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Community Section */}
            {/* <section id="community" className="py-20 bg-background relative noise-overlay">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t.community.title}</h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto font-light">{t.community.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { data: t.community.strava, href: "https://strava.app.link/2vLbqhCTF3b", color: "from-orange-500 to-orange-600", icon: <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/> },
                            { data: t.community.instagram, href: "https://instagram.com/sundaycyclingclub", color: "from-pink-500 to-purple-600", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                            { data: t.community.whatsapp, href: "https://chat.whatsapp.com/example", color: "from-green-500 to-green-600", icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /> },
                        ].map((item, idx) => (
                            <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="group bg-surface rounded-2xl border border-border p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 flex flex-col">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">{item.icon}</svg>
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{item.data.title}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">{item.data.description}</p>
                                <span className="inline-flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all">
                                    {item.data.cta}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* About Section */}
            {/* <section id="about" className="py-20 bg-surface border-t border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t.about.title}</h2>
                            <p className="text-lg text-muted font-light mb-6">{t.about.subtitle}</p>
                            <p className="text-muted leading-relaxed mb-8">{t.about.story}</p>
                            <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl">🚴</div>
                                <div>
                                    <div className="text-foreground font-bold">{t.about.founderName}</div>
                                    <div className="text-muted text-sm">{t.about.founderRole} · {t.about.since}</div>
                                </div>
                            </div>
                            <div className="relative mt-8 rounded-2xl overflow-hidden border border-border">
                                <Image src="/coffee-stop.png" alt="Coffee stop" width={600} height={400} className="w-full h-64 object-cover" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-background rounded-2xl border border-border p-6 md:p-8">
                                <h3 className="text-xl font-bold text-foreground mb-2">{t.about.contactTitle}</h3>
                                <p className="text-muted text-sm mb-6">{t.about.contactDescription}</p>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">{t.about.nameLabel}</label>
                                        <input type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">{t.about.emailLabel}</label>
                                        <input type="email" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">{t.about.messagePlaceholder}</label>
                                        <textarea rows={4} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm resize-none" />
                                    </div>
                                    <button type="submit" className="w-full bg-accent text-accent-contrast py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-accent-hover transition-all hover:scale-[1.02] accent-glow">
                                        {t.about.sendButton}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <Footer />
        </div>
    );
}
