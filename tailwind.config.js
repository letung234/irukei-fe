/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Theme-aware colors via CSS variables */
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-muted": "var(--bg-muted)",
        "bg-hover": "var(--bg-hover)",
        
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-lighter": "var(--ink-lighter)",
        
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        
        /* Brand (Teal) */
        brand: "var(--brand)",
        "brand-soft": "var(--brand-soft)",
        "brand-ink": "var(--brand-ink)",
        "brand-muted": "var(--brand-muted)",
        
        /* Accent (Amber) */
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-ink": "var(--accent-ink)",
        "accent-muted": "var(--accent-muted)",
        
        /* Status */
        ok: "var(--ok)",
        "ok-soft": "var(--ok-soft)",
        "ok-ink": "var(--ok-ink)",
        
        danger: "var(--danger)",
        "danger-soft": "var(--danger-soft)",
        "danger-ink": "var(--danger-ink)",
        
        info: "var(--info)",
        "info-soft": "var(--info-soft)",
        "info-ink": "var(--info-ink)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        display: "var(--font-display)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
        loose: "var(--leading-loose)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
    },
  },
  plugins: [],
};
