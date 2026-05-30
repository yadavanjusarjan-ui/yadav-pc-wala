@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 0 0% 2%;
        --foreground: 0 0% 100%;
        --card: 240 11% 6%;
        --card-foreground: 0 0% 100%;
        --popover: 240 11% 6%;
        --popover-foreground: 0 0% 100%;
        --primary: 186 100% 50%;
        --primary-foreground: 0 0% 0%;
        --secondary: 0 0% 10%;
        --secondary-foreground: 0 0% 100%;
        --muted: 0 0% 12%;
        --muted-foreground: 0 0% 63%;
        --accent: 276 65% 58%;
        --accent-foreground: 0 0% 100%;
        --destructive: 348 100% 50%;
        --destructive-foreground: 0 0% 100%;
        --border: 0 0% 12%;
        --input: 0 0% 14%;
        --ring: 186 100% 50%;
        --radius: 0rem;
    }
}

* {
    border-color: hsl(var(--border));
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    background-color: #050505;
    color: #ffffff;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

::selection {
    background: #00F0FF;
    color: #000000;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background: #050505;
}
::-webkit-scrollbar-thumb {
    background: #1f1f24;
    border: 2px solid #050505;
}
::-webkit-scrollbar-thumb:hover {
    background: #00F0FF;
}

@layer components {
    .font-heading {
        font-family: 'Unbounded', system-ui, sans-serif;
    }

    .btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: #00F0FF;
        color: #000;
        font-family: 'Unbounded', system-ui, sans-serif;
        font-weight: 700;
        padding: 1rem 2rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        box-shadow: 0 0 25px rgba(0, 240, 255, 0.35);
    }
    .btn-primary:hover {
        background-color: #fff;
        box-shadow: 0 0 35px rgba(0, 240, 255, 0.6);
    }

    .btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        font-family: 'Unbounded', system-ui, sans-serif;
        font-weight: 700;
        padding: 1rem 2rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
        transition: all 0.3s ease;
    }
    .btn-secondary:hover {
        border-color: #00F0FF;
        color: #00F0FF;
    }

    .btn-whatsapp {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: #25D366;
        color: #000;
        font-family: 'Unbounded', system-ui, sans-serif;
        font-weight: 700;
        padding: 1rem 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(37, 211, 102, 0.35);
    }
    .btn-whatsapp:hover {
        background: #1ebe5a;
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(37, 211, 102, 0.6);
    }

    .overline {
        font-size: 0.75rem;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #00F0FF;
        font-weight: 700;
    }

    .card-tech {
        background-color: #0F0F13;
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
    }
    .card-tech:hover {
        border-color: rgba(0, 240, 255, 0.5);
        transform: translateY(-4px);
        box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);
    }

    .neon-text {
        text-shadow: 0 0 18px rgba(0, 240, 255, 0.55);
    }
}

/* Grid background pattern */
.grid-bg {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
}

/* Marquee for testimonials background text */
@keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
.animate-marquee {
    animation: marquee 30s linear infinite;
    white-space: nowrap;
}

[data-debug-wrapper="true"] {
    display: contents !important;
}
