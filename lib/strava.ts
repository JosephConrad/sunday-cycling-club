const STRAVA_API_BASE = "https://www.strava.com/api/v3";

interface StravaTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    token_type: string;
}

export interface StravaClubActivity {
    athlete: {
        firstname: string;
        lastname: string;
    };
    name: string;
    distance: number; // meters
    moving_time: number; // seconds
    elapsed_time: number; // seconds
    total_elevation_gain: number; // meters
    type: string;
    sport_type: string;
    workout_type: number | null;
}

// In-memory token cache
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Refresh the access token using the stored refresh token.
 * Strava access tokens expire after ~6 hours.
 */
export async function getAccessToken(): Promise<string> {
    // Return cached token if still valid (with 5 min buffer)
    if (cachedToken && cachedToken.expiresAt > Date.now() / 1000 + 300) {
        return cachedToken.accessToken;
    }

    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Strava environment variables");
    }

    const response = await fetch(`${STRAVA_API_BASE}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to refresh Strava token: ${response.status} ${error}`);
    }

    const data: StravaTokenResponse = await response.json();

    cachedToken = {
        accessToken: data.access_token,
        expiresAt: data.expires_at,
    };

    return data.access_token;
}

/**
 * Exchange an authorization code for tokens (one-time OAuth flow).
 */
export async function exchangeCodeForTokens(code: string): Promise<StravaTokenResponse> {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET");
    }

    const response = await fetch(`${STRAVA_API_BASE}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: "authorization_code",
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to exchange code: ${response.status} ${error}`);
    }

    return response.json();
}

export interface StravaClubEvent {
    id: number;
    title: string;
    description: string;
    club_id: number;
    club: {
        id: number;
        name: string;
    };
    organizing_athlete: {
        firstname: string;
        lastname: string;
    };
    activity_type: string;
    route_id: number | null;
    women_only: boolean;
    private: boolean;
    upcoming_occurrences: string[]; // ISO date strings
    zone: string;
    address: string;
    start_latlng: [number, number] | null;
}

/**
 * Fetch recent club activities from Strava.
 */
export async function getClubActivities(
    clubId: string,
    perPage: number = 10
): Promise<StravaClubActivity[]> {
    const accessToken = await getAccessToken();

    const response = await fetch(
        `${STRAVA_API_BASE}/clubs/${clubId}/activities?per_page=${perPage}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch club activities: ${response.status} ${error}`);
    }

    return response.json();
}

/**
 * Fetch upcoming club group events from Strava.
 */
export async function getClubEvents(
    clubId: string
): Promise<StravaClubEvent[]> {
    const accessToken = await getAccessToken();

    const response = await fetch(
        `${STRAVA_API_BASE}/clubs/${clubId}/group_events`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch club events: ${response.status} ${error}`);
    }

    return response.json();
}
