import { NextResponse } from "next/server";
import {
    getClubActivities,
    getClubEvents,
    type StravaClubActivity,
    type StravaClubEvent,
} from "@/lib/strava";

// In-memory cache
let cache: {
    data: { events: StravaClubEvent[]; activities: StravaClubActivity[] };
    timestamp: number;
} | null = null;

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function GET() {
    const clubId = process.env.STRAVA_CLUB_ID;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    if (!clubId || !refreshToken) {
        return NextResponse.json(
            {
                error: "Strava not configured",
                message:
                    "Missing STRAVA_CLUB_ID or STRAVA_REFRESH_TOKEN. Complete the OAuth flow first.",
            },
            { status: 503 }
        );
    }

    // Return cached data if fresh enough
    if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
        return NextResponse.json(cache.data, {
            headers: {
                "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
                "X-Cache": "HIT",
            },
        });
    }

    try {
        // Fetch both events and activities in parallel
        const [events, activities] = await Promise.all([
            getClubEvents(clubId),
            getClubActivities(clubId, 12),
        ]);

        // Strip organizing_athlete for privacy
        const sanitizedEvents = events.map(({ organizing_athlete, ...rest }) => rest);
        const data = { events: sanitizedEvents, activities };

        // Update cache
        cache = {
            data,
            timestamp: Date.now(),
        };

        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
                "X-Cache": "MISS",
            },
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Strava API error:", message);

        // Return stale cache if available
        if (cache) {
            return NextResponse.json(cache.data, {
                headers: {
                    "Cache-Control": "public, s-maxage=60",
                    "X-Cache": "STALE",
                },
            });
        }

        return NextResponse.json(
            { error: "Failed to fetch Strava data", message },
            { status: 502 }
        );
    }
}
