"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { translations } from "@/translations";

interface StravaClubEvent {
    id: string | number;
    title: string;
    description: string;
    club_id: number;
    activity_type: string;
    address: string;
    upcoming_occurrences: string[];
    start_latlng: [number, number] | null;
    route?: {
        distance: number;
        elevation_gain: number;
    };
}

export default function NextRide() {
    const { language } = useApp();
    const t = translations[language];
    const [event, setEvent] = useState<StravaClubEvent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await fetch("/api/strava");
                if (res.ok) {
                    const result = await res.json();
                    const events: StravaClubEvent[] = result.events || [];
                    
                    // Filter for upcoming events with future occurrences
                    const upcoming = events
                        .filter(e => e.upcoming_occurrences && e.upcoming_occurrences.length > 0)
                        .sort((a, b) => new Date(a.upcoming_occurrences[0]).getTime() - new Date(b.upcoming_occurrences[0]).getTime());

                    if (upcoming.length > 0) {
                        setEvent(upcoming[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch next ride event:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, []);

    if (loading) {
        return (
            <section id="routes" className="py-20 bg-background relative noise-overlay">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="animate-pulse">
                        <div className="h-10 bg-border rounded w-1/3 mx-auto mb-4" />
                        <div className="h-4 bg-border rounded w-1/2 mx-auto mb-16" />
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-2 h-64 lg:h-96 bg-border rounded-2xl" />
                            <div className="lg:col-span-3 space-y-6">
                                <div className="h-6 bg-border rounded w-1/4" />
                                <div className="h-10 bg-border rounded w-3/4" />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-20 bg-border rounded-xl" />
                                    <div className="h-20 bg-border rounded-xl" />
                                    <div className="h-20 bg-border rounded-xl" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-border rounded w-full" />
                                    <div className="h-4 bg-border rounded w-5/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Determine the source of content (Strava event or fallback translation)
    const hasStravaEvent = !!event;
    const eventOccurrence = event?.upcoming_occurrences[0];
    
    // Format Date & Time
    let displayDate = t.calendar.nextDate;
    let displayTime = t.calendar.nextTime;
    
    if (eventOccurrence) {
        const dateObj = new Date(eventOccurrence);
        
        // Date formatting
        const formattedDate = dateObj.toLocaleDateString(language === "pl" ? "pl-PL" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        // Time formatting
        displayTime = dateObj.toLocaleTimeString(language === "pl" ? "pl-PL" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: language === "en",
        });
    }

    const title = event?.title || t.calendar.nextRoute;
    const description = event?.description || t.calendar.nextDescription;
    const location = event?.address || t.calendar.nextLocation;
    
    // Stats calculation (only display distance/elevation if route is attached)
    const distance = hasStravaEvent
        ? (event?.route ? `${Math.round(event.route.distance / 1000)} km` : null)
        : t.calendar.nextDistance;

    const elevation = hasStravaEvent
        ? (event?.route ? `${Math.round(event.route.elevation_gain)} m` : null)
        : t.calendar.nextElevation;

    const pace = "10–15 km/h";

    // Build the stats array dynamically
    const stats = [];
    if (distance) {
        stats.push({ label: t.calendar.distance, value: distance });
    }
    if (elevation) {
        stats.push({ label: t.calendar.elevation, value: elevation });
    }
    stats.push({ label: t.calendar.pace, value: pace });

    const gridColsClass = stats.length === 3 
        ? "grid-cols-1 sm:grid-cols-3" 
        : stats.length === 2 
            ? "grid-cols-1 sm:grid-cols-2" 
            : "grid-cols-1";

    // Maps link
    const mapUrl = event?.start_latlng 
        ? `https://maps.google.com/?q=${event.start_latlng[0]},${event.start_latlng[1]}`
        : `https://maps.google.com/?q=${encodeURIComponent(location)}`;

    // Strava Event link
    const stravaEventUrl = event
        ? `https://www.strava.com/clubs/${event.club_id}/group_events/${event.id}`
        : `https://www.strava.com/clubs/${process.env.NEXT_PUBLIC_STRAVA_CLUB_ID || "2176032"}`;

    return (
        <section id="routes" className="py-20 bg-background relative noise-overlay">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        {t.calendar.title}
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto font-light">
                        {t.calendar.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Route Image */}
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border relative min-h-[250px]">
                        <Image 
                            src="/next-ride.jpg" 
                            alt="Route" 
                            fill
                            className="object-cover" 
                        />
                    </div>
                    {/* Ride Details */}
                    <div className="lg:col-span-3 bg-surface rounded-2xl border border-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse-dot" />
                            <span className="text-accent font-bold text-sm uppercase tracking-widest">
                                {title}
                            </span>
                        </div>
                        <div className={`grid ${gridColsClass} gap-4 mb-6`}>
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-background rounded-xl p-4 text-center border border-border">
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4 mb-6">
                            {[
                                { icon: "📅", label: t.calendar.dateLabel, value: displayDate },
                                { icon: "⏰", label: t.calendar.timeLabel, value: displayTime },
                                { icon: "📍", label: t.calendar.locationLabel, value: location },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <span className="text-lg mt-0.5">{item.icon}</span>
                                    <div>
                                        <div className="text-xs text-muted uppercase tracking-wider">{item.label}</div>
                                        <div className="text-foreground font-medium">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted leading-relaxed mb-6 text-sm border-l-2 border-accent/30 pl-4 italic">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {hasStravaEvent && (
                                <a 
                                    href={stravaEventUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-2 bg-[#FC4C02] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e04400] transition-all hover:scale-105"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                                    </svg>
                                    {t.calendar.openInStrava}
                                </a>
                            )}
                            <a 
                                href={mapUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:bg-surface-hover transition-all"
                            >
                                📍 {t.calendar.viewOnMap}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
