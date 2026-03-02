/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0B1F3A',
                    light: '#162e4f',
                    dark: '#051224',
                },
                secondary: {
                    DEFAULT: '#F6F1E9',
                    dark: '#ede4d5',
                },
                accent: {
                    DEFAULT: '#C6A75E',
                    light: '#d4bb7d',
                    dark: '#A38A3E', // WCAG-safe for text on white
                },
                muted: {
                    DEFAULT: '#6B7280',
                },
                border: '#F3F4F6',
                surface: '#FFFFFF',
                chart: {
                    blue: '#3B82F6',
                    green: '#10B981',
                    orange: '#F59E0B',
                    teal: '#14B8A6',
                    slate: '#94A3B8',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',   // 72px
                '22': '5.5rem',   // 88px
                '30': '7.5rem',   // 120px
                '40': '10rem',    // 160px
                '50': '12.5rem',  // 200px
            },
            borderRadius: {
                'card': '1.5rem',   // 24px — cards, forms
                'btn': '0.75rem',   // 12px — buttons
                'panel': '2.5rem',  // 40px — hero images, CTA banners
                'blob': '3rem',     // 48px — decorative containers
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                'elevated': '0 10px 40px -10px rgba(0,0,0,0.08)',
                'floating': '0 32px 64px -16px rgba(0,0,0,0.12)',
                'hero': '0 48px 100px -20px rgba(0,0,0,0.15)',
            },
            transitionDuration: {
                'normal': '300ms',
            },
            keyframes: {
                'slow-zoom': {
                    '0%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1.15)' },
                },
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
                'slide-down': 'slide-down 0.3s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
            },
        },
    },
    plugins: [],
}
