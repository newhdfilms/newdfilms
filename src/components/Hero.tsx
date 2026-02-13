"use client";

import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [blurReady, setBlurReady] = useState(false);
    const [taglineReady, setTaglineReady] = useState(false);
    const [buttonsReady, setButtonsReady] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Staggered reveal sequence:
        // 1. Title blur-in starts at 400ms, finishes ~2.6s
        // 2. Tagline slides up at 3.0s (right after title settles)
        // 3. Buttons slide up at 3.8s
        const t1 = setTimeout(() => setBlurReady(true), 400);
        const t2 = setTimeout(() => setTaglineReady(true), 3000);
        const t3 = setTimeout(() => setButtonsReady(true), 3800);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="max-w-6xl mx-auto mb-80 pt-32 md:pt-48 pb-16 md:pb-24 text-center relative"
        >
            {/* UNFILTERED VISION — blur-in on load */}
            <h2
                className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[0.95] tracking-tighter uppercase"
                style={{
                    filter: blurReady ? 'blur(0px)' : 'blur(24px)',
                    opacity: blurReady ? 1 : 0,
                    transition: 'filter 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2s ease-out',
                    textShadow: blurReady ? '0 0 40px rgba(244, 157, 37, 0.3), 0 0 80px rgba(244, 157, 37, 0.1)' : 'none',
                }}
            >
                UNFILTERED<br />
                <span className="text-primary">VISION</span>
            </h2>

            {/* Tagline — auto-reveals after title blur-in completes */}
            <p
                className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
                style={{
                    transform: taglineReady ? 'translateY(0px)' : 'translateY(40px)',
                    opacity: taglineReady ? 1 : 0,
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out',
                }}
            >
                We collapse the distance between imagination and reality using custom-built AI creative pipelines.
            </p>

            {/* Buttons — auto-reveal after tagline */}
            <div
                className="flex flex-col sm:flex-row justify-center gap-8"
                style={{
                    transform: buttonsReady ? 'translateY(0px)' : 'translateY(30px)',
                    opacity: buttonsReady ? 1 : 0,
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out',
                }}
            >
                <button
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    className="lens-flare-cta bg-primary text-background-dark font-extrabold px-14 py-5 rounded-sm text-xs uppercase tracking-[0.3em]"
                >
                    VIEW OUR REEL
                </button>
            </div>
        </section>
    );
}
