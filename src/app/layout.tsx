import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gear Up | Tech, Lifestyle & Everything In Between",
    description: "Gear Up is your one-stop store for all things tech, fashion, and home. Discover curated products from laptops to lighting and everything in between.",
    keywords: [
        "Gear Up",
        "Online Store",
        "Laptop",
        "Mobile Accessories",
        "Storage Devices",
        "Fashion",
        "Home Decor",
        "Lifestyle Products",
        "Ecommerce"
    ],
    openGraph: {
        title: "Gear Up | Tech, Lifestyle & Everything In Between",
        description: "Shop across tech, fashion, and home. Gear Up delivers top-quality gear for every part of your life.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
        url: "https://gearup.store",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gear Up | Everything You Need",
        description: "Find your perfect tech and lifestyle gear. All in one place.",
        images: ["/og-image.png"],
    }
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        {children}
                    </CartProvider>
                </AuthProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
