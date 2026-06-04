"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function HeroBadge() {
    const { language } = useApp();
    const [label, setLabel] = useState(
        language === "pl" ? "Każda niedziela" : "Every Sunday"
    );

    useEffect(() => {
        async function fetchNextDate() {
            try {
                const res = await fetch("/api/strava");
                if (!res.ok) return;
                const data = await res.json();
                const events = data.events || [];

                // Find the next upcoming occurrence
                const now = new Date();
                let nextDate: Date | null = null;

                for (const event of events) {
                    for (const occ of event.upcoming_occurrences || []) {
                        const d = new Date(occ);
                        if (d > now && (!nextDate || d < nextDate)) {
                            nextDate = d;
                        }
                    }
                }

                if (nextDate) {
                    const dayName = nextDate.toLocaleDateString(
                        language === "pl" ? "pl-PL" : "en-US",
                        { weekday: "long" }
                    );
                    const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);

                    const dayNum = nextDate.getDate();
                    const month = nextDate.toLocaleDateString(
                        language === "pl" ? "pl-PL" : "en-US",
                        { month: "long" }
                    );

                    const time = nextDate.toLocaleTimeString(
                        language === "pl" ? "pl-PL" : "en-US",
                        { hour: "2-digit", minute: "2-digit", hour12: language === "en" }
                    );

                    setLabel(`${dayCapitalized}, ${dayNum} ${month} · ${time}`);
                }
            } catch {
                // Keep fallback label
            }
        }
        fetchNextDate();
    }, [language]);

    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
                {label}
            </span>
        </div>
    );
}
