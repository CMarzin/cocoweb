import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	content: ["./src/**/*.{astro,ts,css,mdx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				tablet: "768px",
			},
			colors: {
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				sidebar: {
					DEFAULT: "var(--sidebar-background)",
					foreground: "var(--sidebar-foreground)",
					primary: "var(--sidebar-primary)",
					"primary-foreground": "var(--sidebar-primary-foreground)",
					accent: "var(--sidebar-accent)",
					"accent-foreground": "var(--sidebar-accent-foreground)",
					border: "var(--sidebar-border)",
					ring: "var(--sidebar-ring)",
				},
				flexoki: {
					black: "var(--flexoki-black)",
					950: "var(--flexoki-950)",
					900: "var(--flexoki-900)",
					850: "var(--flexoki-850)",
					800: "var(--flexoki-800)",
					700: "var(--flexoki-700)",
					600: "var(--flexoki-600)",
					500: "var(--flexoki-500)",
					300: "var(--flexoki-300)",
					200: "var(--flexoki-200)",
					paper: "var(--flexoki-paper)",
					red: "var(--flexoki-red)",
					orange: "var(--flexoki-orange)",
					yellow: "var(--flexoki-yellow)",
					green: "var(--flexoki-green)",
					cyan: "var(--flexoki-cyan)",
					blue: "var(--flexoki-blue)",
					purple: "var(--flexoki-purple)",
					magenta: "var(--flexoki-magenta)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
