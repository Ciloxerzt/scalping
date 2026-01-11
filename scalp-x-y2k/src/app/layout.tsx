import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { Marquee } from "@/components/marquee";

const courier = Courier_Prime({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-courier' });

export const metadata: Metadata = {
    title: "SCALP-X // Y2K STOCK ANALYZER",
    description: "Advanced AI Stock Scalping Tool for IDX",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${courier.variable} font-mono bg-[#E5E5E5] min-h-screen flex flex-col`}>
                <header className="border-b border-black bg-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-hard-sm">
                    <div className="text-xl font-bold tracking-tighter">
                        SCALP-X <span className="text-[10px] align-top">V1.0</span>
                    </div>
                    <div className="flex gap-4 text-xs font-bold">
                        <span className="cursor-pointer hover:underline">[SYSTEM_STATUS: ONLINE]</span>
                        <span className="cursor-pointer hover:underline">[IDX_FEED: ACTIVE]</span>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>

                <footer className="mt-auto">
                    <Marquee text="*** SCALP-X SYSTEM READY *** ANALYZING IDX DATA *** DO NOT USE AS FINANCIAL ADVICE *** RISK IS YOURS *** GLITCH IN THE MATRIX ***" />
                    <div className="bg-black text-white p-2 text-center text-xs">
                        © 2000-2026 SCALP-X CORP. ALL RIGHTS RESERVED.
                    </div>
                </footer>
            </body>
        </html>
    );
}
