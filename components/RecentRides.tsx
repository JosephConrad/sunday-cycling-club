"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/translations";

interface ClubActivity {
    athlete: {
        firstname: string;
        lastname: string;
    };
    name: string;
    distance: number;
    moving_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
}

function formatDistance(meters: number): string {
    const km = meters / 1000;
    return km >= 100 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

function formatElevation(meters: number): string {
    return `${Math.round(meters)} m`;
}

function formatSpeed(distMeters: number, timeSeconds: number): string {
    if (timeSeconds === 0) return "—";
    const kmh = (distMeters / 1000) / (timeSeconds / 3600);
    return `${kmh.toFixed(1)} km/h`;
}

/** Generate a deterministic gradient class based on athlete name */
function getGradient(name: string): string {
    const gradients = [
        "from-orange-500 to-amber-500",
        "from-emerald-500 to-teal-500",
        "from-violet-500 to-purple-500",
        "from-blue-500 to-cyan-500",
        "from-rose-500 to-pink-500",
        "from-lime-500 to-green-500",
        "from-fuchsia-500 to-pink-500",
        "from-sky-500 to-indigo-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
}

function ActivitySkeleton() {
    return (
        <div className="w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center bg-surface rounded-2xl border border-border p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-border" />
                <div className="flex-1">
                    <div className="h-4 bg-border rounded w-24 mb-2" />
                    <div className="h-3 bg-border rounded w-32" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="h-12 bg-border rounded-xl" />
                <div className="h-12 bg-border rounded-xl" />
            </div>
        </div>
    );
}

export default function RecentRides() {
    const { language } = useApp();
    const t = translations[language];
    const [activities, setActivities] = useState<ClubActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchActivities() {
            try {
                const res = await fetch("/api/strava");
                if (!res.ok) {
                    const data = await res.json().catch(() => null);
                    throw new Error(data?.message || `HTTP ${res.status}`);
                }
                const result = await res.json();
                const data: ClubActivity[] = result.activities || [];
                // Filter only cycling activities
                const rides = data.filter(
                    (a) =>
                        a.type === "Ride" ||
                        a.sport_type === "Ride" ||
                        a.sport_type === "GravelRide" ||
                        a.sport_type === "MountainBikeRide" ||
                        a.type === "VirtualRide"
                );
                setActivities(rides);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch");
            } finally {
                setLoading(false);
            }
        }
        fetchActivities();
    }, []);

    // Don't render section at all if there's an error and no data
    if (error && activities.length === 0 && !loading) {
        return null;
    }

    return (
        <section className="py-20 bg-surface border-y border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background mb-6">
                        <svg className="w-4 h-4 text-[#FC4C02]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                        </svg>
                        <span className="text-muted text-xs font-medium uppercase tracking-widest">Strava</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        {t.recentRides.title}
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto font-light">
                        {t.recentRides.subtitle}
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <ActivitySkeleton key={i} />)
                        : activities.slice(0, 9).map((activity, idx) => {
                              const firstInit = activity.athlete.firstname ? activity.athlete.firstname[0].toUpperCase() : "";
                              const lastInit = activity.athlete.lastname ? activity.athlete.lastname[0].toUpperCase() : "";
                              const initials = `${firstInit}${lastInit}`;
                              const displayInitials = firstInit && lastInit ? `${firstInit}. ${lastInit}.` : firstInit || lastInit || "—";
                              const gradient = getGradient(activity.athlete.firstname + activity.athlete.lastname);

                              return (
                                  <div
                                      key={idx}
                                      className="w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center group bg-background rounded-2xl border border-border p-5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
                                  >
                                      {/* Athlete & Ride Name */}
                                      <div className="flex items-center gap-3 mb-4">
                                          <div
                                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                                          >
                                              {initials}
                                          </div>
                                          <div className="min-w-0">
                                              <div className="text-foreground font-semibold text-sm truncate">
                                                  {displayInitials}
                                              </div>
                                              <div className="text-muted text-xs truncate">{activity.name}</div>
                                          </div>
                                      </div>

                                      {/* Stats */}
                                      <div className="grid grid-cols-2 gap-2">
                                          <div className="bg-surface rounded-xl p-2.5 text-center border border-border/50">
                                              <div className="text-foreground font-bold text-sm">
                                                  {formatDistance(activity.distance)}
                                              </div>
                                              <div className="text-muted text-[10px] uppercase tracking-wider mt-0.5">
                                                  {t.recentRides.distance}
                                              </div>
                                          </div>
                                          <div className="bg-surface rounded-xl p-2.5 text-center border border-border/50">
                                              <div className="text-foreground font-bold text-sm">
                                                  {formatSpeed(activity.distance, activity.moving_time)}
                                              </div>
                                              <div className="text-muted text-[10px] uppercase tracking-wider mt-0.5">
                                                  {t.recentRides.speed}
                                              </div>
                                          </div>
                                      </div>

                                      {/* Duration bar */}
                                      <div className="mt-3 flex items-center justify-between text-xs text-muted">
                                          <span className="flex items-center gap-1">
                                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              {formatDuration(activity.moving_time)}
                                          </span>
                                          <span className="flex items-center gap-1 text-[#FC4C02]">
                                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                                              </svg>
                                              {activity.type === "VirtualRide" ? "Virtual" : "Ride"}
                                          </span>
                                      </div>
                                  </div>
                              );
                          })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.strava.com/clubs/2176032"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#FC4C02] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e04400] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FC4C02]/20"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                        </svg>
                        {t.recentRides.joinCta}
                    </a>
                </div>
            </div>
        </section>
    );
}
