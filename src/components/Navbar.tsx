"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [activeSegment, setActiveSegment] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);

            const sections = ["hero", "team", "work", "contact"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -200 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSegment(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Logo + Nav — all sticky together */}
            <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-background-dark/95 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
                : 'bg-background-dark/80 backdrop-blur-md'
                }`}>
                {/* Logo row */}
                <div className="flex justify-center pt-6 pb-4">
                    <div
                        className="glass-card px-10 py-4 rounded-xl border-white/10 cursor-pointer group transition-all duration-500 hover:shadow-[0_0_30px_rgba(244,157,37,0.2)]"
                        onClick={() => scrollToSection('hero')}
                    >
                        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.1em] flex items-center gap-3">
                            <span className="text-primary group-hover:text-white transition-colors">NEW</span>
                            <span className="text-white">HD</span>
                            <span className="text-primary group-hover:text-white transition-colors">FILMS</span>
                        </h1>
                    </div>
                </div>

                {/* Nav links row */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-14 text-[11px] font-bold uppercase tracking-[0.4em] pb-4">
                    {[
                        { id: 'hero', label: 'THE COMPANY' },
                        { id: 'team', label: 'THE TEAM' },
                        { id: 'work', label: 'THE WORK' },
                        { id: 'contact', label: 'IGNITION' }
                    ].map((item, index) => (
                        <button
                            key={`${item.id}-${index}`}
                            onClick={() => scrollToSection(item.id)}
                            className={`transition-all duration-500 relative group ${activeSegment === item.id ? 'text-primary' : 'text-white/40 hover:text-white'
                                } ${item.label === 'IGNITION' ? 'text-primary hover:text-white' : ''}`}
                        >
                            {item.label}
                            <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-primary transition-all duration-500 ${activeSegment === item.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                                }`} />
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
