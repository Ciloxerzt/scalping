import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                y2k: {
                    silver: "#E5E5E5",
                    dark: "#1A1A1A",
                    accent: "#0000FF", // Classic pure blue for links/accents if needed
                },
            },
            fontFamily: {
                mono: ["Courier New", "Courier", "monospace"], // Fallback stack
            },
            boxShadow: {
                "hard": "4px 4px 0px 0px #000000",
                "hard-sm": "2px 2px 0px 0px #000000",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            animation: {
                marquee: "marquee 25s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
