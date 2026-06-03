import { NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/strava";

/**
 * One-time OAuth callback handler.
 * After authorizing on Strava, you'll be redirected here with ?code=XXX.
 * This exchanges the code for tokens and displays the refresh token to copy into .env.local.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
        return new NextResponse(
            `<html><body style="font-family:monospace;padding:40px;background:#111;color:#f55">
                <h1>Authorization denied</h1>
                <p>Error: ${error}</p>
            </body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    if (!code) {
        return new NextResponse(
            `<html><body style="font-family:monospace;padding:40px;background:#111;color:#fff">
                <h1>Missing authorization code</h1>
                <p>No ?code parameter found in the URL.</p>
            </body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    try {
        const tokens = await exchangeCodeForTokens(code);

        return new NextResponse(
            `<html><body style="font-family:monospace;padding:40px;background:#111;color:#0f0;max-width:800px">
                <h1>✅ Strava Authorization Successful!</h1>
                <p>Copy the refresh token below into your <code>.env.local</code> file:</p>
                <div style="background:#222;padding:20px;border-radius:8px;margin:20px 0;word-break:break-all">
                    <strong>STRAVA_REFRESH_TOKEN=</strong><span style="color:#ff0">${tokens.refresh_token}</span>
                </div>
                <p style="color:#888">Access token (temporary, will auto-refresh): ${tokens.access_token.substring(0, 20)}...</p>
                <p style="color:#888">Expires at: ${new Date(tokens.expires_at * 1000).toISOString()}</p>
                <hr style="border-color:#333;margin:20px 0" />
                <p style="color:#ff0">⚠️ After pasting the refresh token, restart the dev server.</p>
            </body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return new NextResponse(
            `<html><body style="font-family:monospace;padding:40px;background:#111;color:#f55">
                <h1>❌ Token Exchange Failed</h1>
                <p>${message}</p>
            </body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }
}
