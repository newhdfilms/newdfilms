"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [activeSegment, setActiveSegment] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["hero", "team", "engine", "work", "contact"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Detect when section is in view (centered or near top)
                    return rect.top >= -200 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSegment(current);
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120; // Account for the sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <header className="sticky top-0 left-0 w-full z-50 pt-10 pb-16 flex flex-col items-center bg-transparent pointer-events-none">
            {/* Title Box - Matches the High-Impact "Paper Tiger" Style */}
            <div
                className="glass-card px-10 py-5 rounded-xl mb-8 border-white/10 pointer-events-auto cursor-pointer group transition-all duration-500 hover:shadow-[0_0_30px_rgba(244,157,37,0.2)]"
                onClick={() => scrollToSection('hero')}
            >
                <h1 className="text-3xl md:text-4xl font-bold tracking-[0.1em] flex items-center gap-3">
                    <span className="text-primary group-hover:text-white transition-colors">NEW</span>
                    <span className="text-white">HD</span>
                    <span className="text-primary group-hover:text-white transition-colors">FILMS</span>
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-8 md:gap-14 text-[11px] font-bold uppercase tracking-[0.4em] pointer-events-auto">
                {[
                    { id: 'team', label: 'THE TEAM' },
                    { id: 'engine', label: 'THE ENGINE' },
                    { id: 'work', label: 'THE WORK' },
                    { id: 'contact', label: 'START PROJECT' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`transition-all duration-500 relative group ${activeSegment === item.id ? 'text-primary' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        {item.label}
                        <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-primary transition-all duration-500 ${activeSegment === item.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                            }`} />
                    </button>
                ))}
            </nav>
        </header>
    );
}
