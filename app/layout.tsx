import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
    title: {
        default: "Sunday Cycling Club | Niedzielne przejazdzki rowerowe w Warszawie",
        template: "%s | Sunday Cycling Club",
    },
    description:
        "Sunday Cycling Club — niedzielne przejazdzki rowerowe w Warszawie. Jedziemy razem, wracamy razem. Dołącz do niedzielnej grupy kolarskiej.",
    keywords: [
        "kolarski klub warszawa",
        "niedzielne przejazdzki rowerowe",
        "cycling club warsaw",
        "sunday ride warsaw",
        "kolarstwo szosowe warszawa",
        "grupa kolarska",
        "road cycling poland",
        "kampinos cycling",
        "szosa warszawa",
    ],
    metadataBase: new URL("https://sundaycyclingclub.pl"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Sunday Cycling Club | Niedzielne przejazdzki rowerowe w Warszawie",
        description: "Jedziemy razem, wracamy razem. Niedzielna społeczność szosowa Warszawy.",
        type: "website",
        siteName: "Sunday Cycling Club",
        url: "https://sundaycyclingclub.pl",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl" className="dark">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SportsOrganization",
                            name: "Sunday Cycling Club",
                            url: "https://sundaycyclingclub.pl",
                            description:
                                "Niedzielna społeczność szosowa Warszawy. Regularne niedzielne przejazdzki rowerowe.",
                            sport: "Cycling",
                            location: {
                                "@type": "Place",
                                name: "Warszawa",
                                address: {
                                    "@type": "PostalAddress",
                                    addressLocality: "Warszawa",
                                    addressCountry: "PL",
                                },
                            },
                        }),
                    }}
                />
            </head>
            <body className={`${inter.variable} antialiased`}>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
