"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PHASES = [
    {
        id: "spark",
        number: "01",
        label: "SPARK",
        subtitle: "IDEATION CORE",
        icon: "bolt",
        color: "primary",
        description:
            "The ignition point where proprietary LLMs stress-test creative concepts. Thousands of mood-boards generated in seconds to find the perfect cinematic DNA.",
        items: [
            { title: "Concept development & scriptwriting", sub: "Ideation to narrative blueprint" },
            { title: "Visual Moodboarding", sub: "Aesthetic direction & tone" },
        ],
    },
    {
        id: "craft",
        number: "02",
        label: "CRAFT",
        subtitle: "NEURAL PIPELINE",
        icon: "brush",
        color: "teal",
        description:
            "Precision prompting meets neural style transfer. Every frame is hand-refined by our elite artists to ensure AI output possesses a true cinematic soul.",
        items: [
            { title: "AI-assisted production design", sub: "Neural rendering pipeline" },
            { title: "Style transfer & refinement", sub: "Artist-guided corrections" },
        ],
    },
    {
        id: "forge",
        number: "03",
        label: "FORGE",
        subtitle: "8K SYNTHESIS",
        icon: "precision_manufacturing",
        color: "teal",
        description:
            "High-density rendering and custom upscaling algorithms. We bake raw generated pixels into master-ready deliverables for theatrical exhibition.",
        items: [
            { title: "High-density rendering", sub: "Custom upscaling algorithms" },
            { title: "Master-ready deliverables", sub: "Theatrical exhibition grade" },
        ],
    },
    {
        id: "launch",
        number: "04",
        label: "LAUNCH",
        subtitle: "DEPLOYMENT",
        icon: "rocket_launch",
        color: "primary",
        description:
            "Seamless deployment across spatial computing, streaming platforms, and IMAX screens. Optimized for the next generation of viewership.",
        items: [
            { title: "Multi-platform deployment", sub: "Streaming, IMAX, spatial" },
            { title: "Next-gen optimization", sub: "Future-ready delivery" },
        ],
    },
];

export default function Engine() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);
    const [phaseProgress, setPhaseProgress] = useState(0);

    const handleScroll = useCallback(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate how far we've scrolled through the section
        // Start tracking when top edge enters bottom of viewport
        // End tracking when bottom edge exits top of viewport
        const totalScrollDistance = sectionHeight + viewportHeight;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

        setScrollProgress(progress);

        // Map progress to phases (4 phases, evenly distributed)
        const phaseFloat = progress * 4;
        const idx = Math.min(3, Math.floor(phaseFloat));
        const pProgress = phaseFloat - idx;

        setActivePhaseIndex(idx);
        setPhaseProgress(Math.min(1, pProgress));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const activePhase = PHASES[activePhaseIndex];
    const corePulse = 0.3 + scrollProgress * 0.7;
    const coreGlow = scrollProgress > 0.1;

    // Ring rotation angles driven by scroll
    const ring1Angle = scrollProgress * 360 * 3;
    const ring2Angle = scrollProgress * 360 * 2;
    const ring3Angle = scrollProgress * 360 * 1.5;

    return (
        <section
            id="engine"
            ref={sectionRef}
            className="scroll-mt-48 mb-40 relative py-20 overflow-hidden"
            style={{ minHeight: "200vh" }}
        >
            {/* Volumetric atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-1/4 -left-1/4 w-full h-full transition-opacity duration-1000"
                    style={{
                        background: "radial-gradient(circle at center, rgba(0, 255, 217, 0.12) 0%, transparent 70%)",
                        filter: "blur(40px)",
                        opacity: 0.4 + scrollProgress * 0.6,
                    }}
                />
                <div
                    className="absolute -bottom-1/4 -right-1/4 w-full h-full transition-opacity duration-1000"
                    style={{
                        background: "radial-gradient(circle at center, rgba(244, 157, 37, 0.12) 0%, transparent 70%)",
                        filter: "blur(40px)",
                        opacity: 0.3 + scrollProgress * 0.7,
                    }}
                />
                {/* Data particles */}
                {[
                    { top: "25%", left: "25%", opacity: 0.4 },
                    { top: "50%", left: "33%", opacity: 0.2 },
                    { top: "75%", left: "66%", opacity: 0.6 },
                    { top: "33%", left: "75%", opacity: 0.3 },
                    { top: "10%", left: "80%", opacity: 0.5 },
                    { top: "90%", left: "10%", opacity: 0.2 },
                ].map((p, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: 2,
                            height: 2,
                            background: "#00ffd9",
                            boxShadow: "0 0 10px #00ffd9",
                            opacity: p.opacity * scrollProgress,
                            transition: "opacity 0.5s",
                        }}
                    />
                ))}
            </div>

            {/* Sticky container for the engine visual */}
            <div className="sticky top-0 min-h-screen flex items-center justify-center z-10">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
                    {/* Engine Core — left side */}
                    <div className="lg:col-span-7 flex justify-center items-center relative" style={{ perspective: "2000px" }}>
                        <div
                            className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px]"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: `rotateX(${8 + scrollProgress * 12}deg) rotateY(${-8 + scrollProgress * -7}deg)`,
                                transition: "transform 0.4s ease-out",
                            }}
                        >
                            {/* Deep shadow */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "rgba(0,0,0,0.4)",
                                    filter: "blur(48px)",
                                    transform: "translateY(20px) translateX(10px) scale(0.9)",
                                    zIndex: -10,
                                }}
                            />

                            {/* Outer metallic rim */}
                            <div
                                className="absolute inset-0 rounded-full p-3 md:p-4"
                                style={{
                                    background:
                                        "conic-gradient(from 180deg at 50% 50%, #1a1a1a 0deg, #4a4a4a 90deg, #1a1a1a 180deg, #4a4a4a 270deg, #1a1a1a 360deg)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    opacity: 0.8,
                                    transform: `rotate(${ring1Angle}deg)`,
                                    transition: "transform 0.1s linear",
                                }}
                            >
                                {/* Glass interior */}
                                <div
                                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        boxShadow: "inset 0 0 30px rgba(0, 255, 217, 0.05)",
                                    }}
                                >
                                    {/* Animated gradient pulse inside glass */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(0, 255, 217, ${0.05 + corePulse * 0.15}) 0%, rgba(244, 157, 37, ${0.05 + corePulse * 0.15}) 100%)`,
                                            transition: "background 0.5s ease",
                                        }}
                                    />

                                    {/* Inner ring */}
                                    <div
                                        className="w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center"
                                        style={{
                                            transform: `rotate(${-ring2Angle}deg)`,
                                            transition: "transform 0.1s linear",
                                        }}
                                    >
                                        {/* Core orb */}
                                        <div
                                            className="w-1/2 h-1/2 rounded-full flex items-center justify-center"
                                            style={{
                                                background: "linear-gradient(to top, black, #27272a)",
                                                border: "1px solid rgba(255,255,255,0.05)",
                                                boxShadow: coreGlow
                                                    ? `0 0 ${40 + scrollProgress * 80}px ${10 + scrollProgress * 20}px rgba(244, 157, 37, ${0.2 + scrollProgress * 0.4}), inset 0 0 30px rgba(255,255,255,0.3)`
                                                    : "0 0 20px 5px rgba(244, 157, 37, 0.1), inset 0 0 30px rgba(255,255,255,0.2)",
                                                transition: "box-shadow 0.6s ease",
                                            }}
                                        >
                                            <span
                                                className="material-symbols-outlined text-4xl md:text-6xl"
                                                style={{
                                                    color: `rgba(0, 255, 217, ${0.3 + scrollProgress * 0.4})`,
                                                    transition: "color 0.5s",
                                                }}
                                            >
                                                blur_on
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase orbit nodes around the engine */}
                            {PHASES.map((phase, i) => {
                                const isActive = i === activePhaseIndex;
                                const angle = -90 + i * 90; // Top, Right, Bottom, Left
                                const rad = (angle * Math.PI) / 180;
                                const radius = 52; // percentage from center
                                const x = 50 + radius * Math.cos(rad);
                                const y = 50 + radius * Math.sin(rad);

                                return (
                                    <div
                                        key={phase.id}
                                        className="absolute z-20 flex flex-col items-center gap-1 pointer-events-none"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        <div
                                            className="rounded-lg flex flex-col items-center justify-center transition-all duration-500"
                                            style={{
                                                width: isActive ? 72 : 52,
                                                height: isActive ? 72 : 52,
                                                background: isActive
                                                    ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))"
                                                    : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
                                                backdropFilter: "blur(12px)",
                                                border: `1px solid ${isActive ? "rgba(244, 157, 37, 0.5)" : "rgba(255,255,255,0.1)"}`,
                                                boxShadow: isActive
                                                    ? "0 0 25px rgba(244, 157, 37, 0.3)"
                                                    : "none",
                                                opacity: isActive ? 1 : 0.35,
                                                filter: isActive ? "none" : "grayscale(1)",
                                            }}
                                        >
                                            <span
                                                className="material-symbols-outlined transition-colors duration-500"
                                                style={{
                                                    color: isActive ? "#f49d25" : "white",
                                                    fontSize: isActive ? 20 : 16,
                                                }}
                                            >
                                                {phase.icon}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase transition-all duration-500"
                                            style={{
                                                color: isActive ? "#f49d25" : "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            {phase.label}
                                        </span>
                                    </div>
                                );
                            })}

                            {/* Connection line from active node to panel */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-[1px] transition-all duration-700"
                                style={{
                                    right: -80,
                                    width: 80,
                                    background: `linear-gradient(to right, rgba(244, 157, 37, ${0.6 * scrollProgress}), transparent)`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Floating Info Panel — right side */}
                    <div className="lg:col-span-5 relative">
                        <div
                            className="rounded-r-lg p-8 md:p-10 transition-all duration-700"
                            style={{
                                background: "rgba(10, 10, 10, 0.85)",
                                backdropFilter: "blur(24px)",
                                borderLeft: "3px solid #f49d25",
                                boxShadow: "-20px 0 50px rgba(0,0,0,0.5), 0 0 30px rgba(244, 157, 37, 0.1)",
                                transform: `translateX(${4 + (1 - scrollProgress) * 20}px)`,
                                opacity: Math.min(1, scrollProgress * 3),
                            }}
                        >
                            {/* Phase indicator */}
                            <div className="mb-6 md:mb-8">
                                <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">
                                    Stage {activePhase.number} // Interactive
                                </span>
                                <h2
                                    className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 transition-all duration-500"
                                    key={activePhase.id}
                                >
                                    {activePhase.label}
                                </h2>
                                <div className="h-[2px] w-20 bg-primary" />
                            </div>

                            {/* Description */}
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                {activePhase.description}
                            </p>

                            {/* Sub-items */}
                            <div className="space-y-4 mb-6">
                                {activePhase.items.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <span
                                            className="material-symbols-outlined text-sm mt-1"
                                            style={{
                                                color: idx === 0 ? "#f49d25" : "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            arrow_forward
                                        </span>
                                        <div>
                                            <h4
                                                className="text-lg font-bold"
                                                style={{
                                                    color: idx === 0 ? "#f49d25" : "white",
                                                    textShadow: idx === 0 ? "0 0 10px rgba(244, 157, 37, 0.8), 0 0 20px rgba(244, 157, 37, 0.4)" : "none",
                                                }}
                                            >
                                                {item.title}
                                            </h4>
                                            <p className="text-white/30 text-xs mt-1 uppercase tracking-wider">
                                                {item.sub}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress indicator */}
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] mb-1">
                                        Process Progress
                                    </span>
                                    <div className="flex gap-1">
                                        {PHASES.map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-3 h-1 transition-all duration-500"
                                                style={{
                                                    background: i <= activePhaseIndex ? "#f49d25" : "rgba(255,255,255,0.1)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                        {activePhaseIndex < 3 ? "Next Phase" : "Complete"}
                                    </span>
                                    <span className="material-symbols-outlined text-primary">trending_flat</span>
                                </div>
                            </div>
                        </div>

                        {/* Status readout below panel */}
                        <div className="flex gap-4 md:gap-8 mt-6 text-[9px] font-mono text-white/20 px-4">
                            <span className="flex items-center gap-2">
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        background: "#00ffd9",
                                        boxShadow: "0 0 6px #00ffd9",
                                        animation: "pulse 2s infinite",
                                    }}
                                />
                                CORE_SYNC: ACTIVE
                            </span>
                            <span>VOL_DEPTH: {(0.2 + scrollProgress * 0.682).toFixed(3)}</span>
                            <span className="hidden md:inline">DATA_STREAM: {(2 + scrollProgress * 10.4).toFixed(1)} GB/s</span>
                        </div>
                    </div>
                </div>

                {/* Scroll progress rail — left edge */}
                <div className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 space-y-4 z-30 pointer-events-none">
                    <div className="w-1 h-20 bg-white/5 rounded-full overflow-hidden relative">
                        <div
                            className="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-200"
                            style={{ height: `${scrollProgress * 100}%` }}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-[10px] rotate-90 text-white/30 tracking-widest whitespace-nowrap">
                            SCROLL EXPLORE
                        </span>
                    </div>
                </div>
            </div>

            {/* Title overlay at top */}
            <div
                className="absolute top-20 left-0 right-0 z-20 text-center pointer-events-none"
                style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
            >
                <span className="text-primary text-[10px] font-bold tracking-[0.8em] uppercase mb-4 block">
                    Proprietary Hyper-Core
                </span>
                <h3
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-4"
                    style={{ textShadow: "0 0 15px rgba(244, 157, 37, 0.4)" }}
                >
                    THE ENGINE
                </h3>
                <div className="w-24 h-[1px] bg-[#2dd4bf]/50 mx-auto mb-4" />
                <p className="text-white/40 text-xs uppercase tracking-[0.4em]">
                    Cinematic Rendering Architecture v4.0.2
                </p>
            </div>

            {/* Scroll prompt — visible when not actively scrolling through section */}
            <div
                className="absolute top-[calc(100vh-60px)] left-0 right-0 text-center z-20 pointer-events-none transition-opacity duration-700"
                style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
            >
                <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse">
                    ◈ Scroll down to explore the process ◈
                </p>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </section>
    );
}
