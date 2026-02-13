"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PHASES = [
    {
        id: "ignition",
        number: "01",
        label: "IGNITION",
        subtitle: "CLIENT ACTIVATION",
        icon: "local_fire_department",
        color: "#f49d25",
        description:
            "The moment you reach out and turn the key. You bring the vision — we bring the horsepower. This is where it all begins: your project fires up and our engine starts to roar.",
        items: [
            { title: "Client onboarding & discovery", sub: "Vision alignment session" },
            { title: "Project scope & roadmap", sub: "Strategic ignition sequence" },
        ],
    },
    {
        id: "spark",
        number: "02",
        label: "SPARK",
        subtitle: "CREATIVE IGNITION",
        icon: "bolt",
        color: "#f49d25",
        description:
            "The creative ideas, plans, and possibilities are shared. Proprietary LLMs stress-test concepts, generating thousands of mood-boards in seconds to find the perfect cinematic DNA.",
        items: [
            { title: "Concept development & ideation", sub: "Creative exploration burst" },
            { title: "Visual moodboarding & tone", sub: "Aesthetic direction lock" },
        ],
    },
    {
        id: "forge",
        number: "03",
        label: "FORGE",
        subtitle: "AI DEEP ANALYSIS",
        icon: "precision_manufacturing",
        color: "#00ffd9",
        description:
            "Everything is placed into our AI Forge — analyzed to its DNA with high heat, melted down to fully understand all parts. Human-AI accelerated teams break every element apart and rebuild with precision.",
        items: [
            { title: "DNA-level content analysis", sub: "AI + human deep decomposition" },
            { title: "High-heat stress testing", sub: "Precision forge refinement" },
        ],
    },
    {
        id: "craft",
        number: "04",
        label: "CRAFT",
        subtitle: "NEURAL ASSEMBLY",
        icon: "brush",
        color: "#00ffd9",
        description:
            "Takes all elements from the Forge combined with the Spark and builds everything needed. Every frame hand-refined by elite artists to ensure AI output possesses a true cinematic soul.",
        items: [
            { title: "AI-assisted production design", sub: "Neural rendering pipeline" },
            { title: "Style transfer & assembly", sub: "Artist-guided mastering" },
        ],
    },
    {
        id: "dashboard",
        number: "05",
        label: "DASHBOARD",
        subtitle: "REVIEW & CONTROL",
        icon: "dashboard",
        color: "#f49d25",
        description:
            "The dashboard lights up — clients and teams review as gears shift into drive. If the wrong lights flash, we address it. Every indicator green means clear for launch.",
        items: [
            { title: "Client review & approval", sub: "Real-time status dashboard" },
            { title: "Quality control checkpoints", sub: "Green-light verification" },
        ],
    },
    {
        id: "launch",
        number: "06",
        label: "LAUNCH",
        subtitle: "DEPLOYMENT",
        icon: "rocket_launch",
        color: "#f49d25",
        description:
            "All systems go. The project launches across spatial computing, streaming platforms, and screens worldwide. You're in the driver's seat — we built the engine that gets you there faster than ever before.",
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
    const [, setPhaseProgress] = useState(0);
    const [exitProgress, setExitProgress] = useState(0); // 0 = locked/visible, 1 = fully slid out

    // Scroll-lock state
    const isLockedRef = useRef(false);
    const virtualProgressRef = useRef(0);
    const hasCompletedRef = useRef(false);
    const hasEnteredRef = useRef(false);

    // Helper to update phase state from a progress value
    const updateFromProgress = useCallback((progress: number) => {
        setScrollProgress(progress);
        const phaseCount = PHASES.length;
        const phaseFloat = progress * phaseCount;
        const idx = Math.min(phaseCount - 1, Math.floor(phaseFloat));
        const pProgress = phaseFloat - idx;
        setActivePhaseIndex(idx);
        setPhaseProgress(Math.min(1, pProgress));
    }, []);

    // Scroll-lock: intercept wheel events
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleWheel = (e: WheelEvent) => {
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            // TRIGGER: Lock when section top is within (navHeight + buffer) of viewport top
            // so the title text sits comfortably below the nav bar
            const navHeight = 120;
            const isAtTop = rect.top <= navHeight + 80 && rect.top > -rect.height;
            const isInView = rect.top <= navHeight && rect.bottom > 0;
            const shouldLock = isAtTop || isInView;

            if (!shouldLock) {
                isLockedRef.current = false;
                return;
            }

            const scrollingDown = e.deltaY > 0;
            const scrollingUp = e.deltaY < 0;
            const currentProgress = virtualProgressRef.current;

            // If scrolling down and animation not complete, lock and advance
            if (scrollingDown && currentProgress < 1) {
                e.preventDefault();

                // Snap the viewport so the title sits below the nav bar
                if (!hasEnteredRef.current && rect.top > navHeight) {
                    const sectionTop = window.scrollY + rect.top - navHeight;
                    window.scrollTo({ top: sectionTop, behavior: 'instant' as ScrollBehavior });
                }

                isLockedRef.current = true;
                hasEnteredRef.current = true;

                // Each scroll tick = ~3% progress for responsive feel
                const increment = Math.abs(e.deltaY) / 2000;
                const newProgress = Math.min(1, currentProgress + increment);
                virtualProgressRef.current = newProgress;
                updateFromProgress(newProgress);
                setExitProgress(0);

                if (newProgress >= 1) {
                    hasCompletedRef.current = true;
                    // Don't unlock yet — let them scroll once more to trigger exit
                }
                return;
            }

            // If at 100% and scrolling down, trigger the exit slide-out
            if (scrollingDown && currentProgress >= 1) {
                e.preventDefault();
                const exitIncrement = Math.abs(e.deltaY) / 1600;
                setExitProgress(prev => {
                    const newExit = Math.min(1, prev + exitIncrement);
                    if (newExit >= 1) {
                        // Fully exited — unlock scroll and let page continue
                        isLockedRef.current = false;
                        hasCompletedRef.current = true;

                        // Smooth-scroll past the section so the user sees AI Creations arrive
                        const sectionBottom = section.getBoundingClientRect().bottom + window.scrollY;
                        window.scrollTo({ top: sectionBottom, behavior: 'smooth' });
                    }
                    return newExit;
                });
                return;
            }

            // If scrolling up and we've entered the engine, rewind
            if (scrollingUp && hasEnteredRef.current && (currentProgress > 0 || exitProgress > 0)) {
                e.preventDefault();
                isLockedRef.current = true;

                // If exit is happening, rewind exit first
                if (exitProgress > 0) {
                    const exitDecrement = Math.abs(e.deltaY) / 1600;
                    setExitProgress(prev => Math.max(0, prev - exitDecrement));
                    return;
                }

                const decrement = Math.abs(e.deltaY) / 2000;
                const newProgress = Math.max(0, currentProgress - decrement);
                virtualProgressRef.current = newProgress;
                updateFromProgress(newProgress);

                if (newProgress <= 0) {
                    hasCompletedRef.current = false;
                    isLockedRef.current = false;
                    hasEnteredRef.current = false;
                }
                return;
            }

            // If at start and scrolling up, allow normal scroll
            if (scrollingUp && currentProgress <= 0) {
                isLockedRef.current = false;
                hasEnteredRef.current = false;
                return;
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [updateFromProgress, exitProgress]);

    // Touch events for mobile scroll-lock
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = section.getBoundingClientRect();
            // Match the wheel handler trigger — lock when section is near nav bottom
            const navHeight = 120;
            const isAtTop = rect.top <= navHeight + 80 && rect.top > -rect.height;
            const isInView = rect.top <= navHeight && rect.bottom > 0;
            const shouldLock = isAtTop || isInView;

            if (!shouldLock) {
                isLockedRef.current = false;
                return;
            }

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const scrollingDown = deltaY > 0;
            const scrollingUp = deltaY < 0;
            const currentProgress = virtualProgressRef.current;

            if (scrollingDown && currentProgress < 1) {
                e.preventDefault();

                // Snap so title sits below nav bar
                if (!hasEnteredRef.current && rect.top > navHeight) {
                    const sectionTop = window.scrollY + rect.top - navHeight;
                    window.scrollTo({ top: sectionTop, behavior: 'instant' as ScrollBehavior });
                }

                isLockedRef.current = true;
                hasEnteredRef.current = true;

                const increment = Math.abs(deltaY) / 1000;
                const newProgress = Math.min(1, currentProgress + increment);
                virtualProgressRef.current = newProgress;
                updateFromProgress(newProgress);
                setExitProgress(0);

                if (newProgress >= 1) {
                    hasCompletedRef.current = true;
                }
                return;
            }

            if (scrollingDown && currentProgress >= 1) {
                e.preventDefault();
                const exitIncrement = Math.abs(deltaY) / 800;
                setExitProgress(prev => {
                    const newExit = Math.min(1, prev + exitIncrement);
                    if (newExit >= 1) {
                        isLockedRef.current = false;
                        const sectionBottom = section.getBoundingClientRect().bottom + window.scrollY;
                        window.scrollTo({ top: sectionBottom, behavior: 'smooth' });
                    }
                    return newExit;
                });
                return;
            }

            if (scrollingUp && hasEnteredRef.current && currentProgress > 0) {
                e.preventDefault();
                isLockedRef.current = true;

                if (exitProgress > 0) {
                    const exitDecrement = Math.abs(deltaY) / 800;
                    setExitProgress(prev => Math.max(0, prev - exitDecrement));
                    return;
                }

                const decrement = Math.abs(deltaY) / 1000;
                const newProgress = Math.max(0, currentProgress - decrement);
                virtualProgressRef.current = newProgress;
                updateFromProgress(newProgress);

                if (newProgress <= 0) {
                    hasCompletedRef.current = false;
                    isLockedRef.current = false;
                }
                return;
            }
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [updateFromProgress, exitProgress]);

    // Reset virtual progress when scrolling away from the section naturally
    useEffect(() => {
        const handleNormalScroll = () => {
            if (!sectionRef.current || isLockedRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            if (rect.bottom < 0) {
                virtualProgressRef.current = 1;
                setScrollProgress(1);
                setActivePhaseIndex(PHASES.length - 1);
                setExitProgress(1);
            } else if (rect.top > vh) {
                virtualProgressRef.current = 0;
                hasCompletedRef.current = false;
                hasEnteredRef.current = false;
                setScrollProgress(0);
                setActivePhaseIndex(0);
                setExitProgress(0);
            }
        };

        window.addEventListener("scroll", handleNormalScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleNormalScroll);
    }, []);

    const activePhase = PHASES[activePhaseIndex];
    const corePulse = 0.3 + scrollProgress * 0.7;
    const coreGlow = scrollProgress > 0.1;

    // Ring rotation angles driven by scroll
    const ring1Angle = scrollProgress * 360 * 3;
    const ring2Angle = scrollProgress * 360 * 2;

    // Engine exhaust/power visual based on progress
    const enginePower = Math.min(1, scrollProgress * 1.5);

    // Exit animation: slide up and fade out
    const exitTranslateY = exitProgress * -120; // slides up 120vh worth
    const exitOpacity = Math.max(0, 1 - exitProgress * 1.5);
    const exitScale = 1 - exitProgress * 0.05;

    return (
        <section
            id="engine"
            ref={sectionRef}
            className="scroll-mt-48 relative overflow-hidden"
            style={{ minHeight: "120vh", marginBottom: 0 }}
        >
            {/* Volumetric atmosphere */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                    opacity: exitOpacity,
                    transition: "opacity 0.3s ease-out",
                }}
            >
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
                    { top: "15%", left: "50%", opacity: 0.4 },
                    { top: "65%", left: "15%", opacity: 0.3 },
                    { top: "45%", left: "85%", opacity: 0.5 },
                    { top: "80%", left: "45%", opacity: 0.35 },
                ].map((p, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: 2 + enginePower * 2,
                            height: 2 + enginePower * 2,
                            borderRadius: "50%",
                            background: i % 2 === 0 ? "#00ffd9" : "#f49d25",
                            boxShadow: `0 0 ${6 + enginePower * 10}px ${i % 2 === 0 ? "#00ffd9" : "#f49d25"}`,
                            opacity: p.opacity * scrollProgress,
                            transition: "opacity 0.5s",
                        }}
                    />
                ))}
            </div>

            {/* Sticky container — slides out when exit triggers */}
            <div
                className="sticky top-0 min-h-screen flex items-center justify-center z-10"
                style={{
                    transform: `translateY(${exitTranslateY}px) scale(${exitScale})`,
                    opacity: exitOpacity,
                    transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
                }}
            >
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
                    {/* Engine Core — left side */}
                    <div className="lg:col-span-7 flex justify-center items-center relative" style={{ perspective: "2000px" }}>
                        <div
                            className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]"
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
                                    border: `1px solid rgba(255,255,255,${0.2 + enginePower * 0.15})`,
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
                                        boxShadow: `inset 0 0 30px rgba(0, 255, 217, ${0.05 + enginePower * 0.15})`,
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

                            {/* Phase orbit nodes around the engine — 6 positions */}
                            {PHASES.map((phase, i) => {
                                const isActive = i === activePhaseIndex;
                                const angle = -90 + i * 60;
                                const rad = (angle * Math.PI) / 180;
                                const radius = 52;
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
                                                width: isActive ? 68 : 44,
                                                height: isActive ? 68 : 44,
                                                background: isActive
                                                    ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))"
                                                    : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
                                                backdropFilter: "blur(12px)",
                                                border: `1px solid ${isActive ? phase.color : "rgba(255,255,255,0.1)"}`,
                                                boxShadow: isActive
                                                    ? `0 0 25px ${phase.color}60`
                                                    : "none",
                                                opacity: isActive ? 1 : 0.35,
                                                filter: isActive ? "none" : "grayscale(1)",
                                            }}
                                        >
                                            <span
                                                className="material-symbols-outlined transition-colors duration-500"
                                                style={{
                                                    color: isActive ? phase.color : "white",
                                                    fontSize: isActive ? 20 : 14,
                                                }}
                                            >
                                                {phase.icon}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[6px] md:text-[8px] font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap"
                                            style={{
                                                color: isActive ? phase.color : "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            {phase.label}
                                        </span>
                                    </div>
                                );
                            })}

                            {/* Connection line from active node to panel */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-[1px] transition-all duration-700 hidden lg:block"
                                style={{
                                    right: -80,
                                    width: 80,
                                    background: `linear-gradient(to right, ${activePhase.color}${Math.round(scrollProgress * 153).toString(16).padStart(2, '0')}, transparent)`,
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
                                borderLeft: `3px solid ${activePhase.color}`,
                                boxShadow: `-20px 0 50px rgba(0,0,0,0.5), 0 0 30px ${activePhase.color}20`,
                                transform: `translateX(${4 + (1 - scrollProgress) * 20}px)`,
                                opacity: Math.min(1, scrollProgress * 3),
                            }}
                        >
                            {/* Phase indicator */}
                            <div className="mb-6 md:mb-8">
                                <span
                                    className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block transition-colors duration-500"
                                    style={{ color: activePhase.color }}
                                >
                                    Stage {activePhase.number} // {activePhase.subtitle}
                                </span>
                                <h2
                                    className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 transition-all duration-500"
                                    key={activePhase.id}
                                >
                                    {activePhase.label}
                                </h2>
                                <div
                                    className="h-[2px] w-20 transition-colors duration-500"
                                    style={{ background: activePhase.color }}
                                />
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
                                                color: idx === 0 ? activePhase.color : "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            arrow_forward
                                        </span>
                                        <div>
                                            <h4
                                                className="text-lg font-bold"
                                                style={{
                                                    color: idx === 0 ? activePhase.color : "white",
                                                    textShadow: idx === 0 ? `0 0 10px ${activePhase.color}CC, 0 0 20px ${activePhase.color}66` : "none",
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

                            {/* Engine metaphor callout */}
                            <div className="mb-6 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                                <p className="text-white/30 text-[11px] leading-relaxed italic">
                                    &quot;We amplify your vision — so you can go further, faster than ever before.&quot;
                                </p>
                            </div>

                            {/* Progress indicator — 6 steps */}
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] mb-1">
                                        Engine Sequence
                                    </span>
                                    <div className="flex gap-1">
                                        {PHASES.map((phase, i) => (
                                            <div
                                                key={i}
                                                className="w-3 h-1 transition-all duration-500"
                                                style={{
                                                    background: i <= activePhaseIndex ? phase.color : "rgba(255,255,255,0.1)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-500"
                                        style={{ color: activePhase.color }}
                                    >
                                        {activePhaseIndex < 5 ? "Next Phase" : "Mission Complete"}
                                    </span>
                                    <span className="material-symbols-outlined" style={{ color: activePhase.color }}>
                                        {activePhaseIndex < 5 ? "trending_flat" : "check_circle"}
                                    </span>
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
                            <span>PHASE: {activePhase.number}/{PHASES.length.toString().padStart(2, '0')}</span>
                            <span className="hidden md:inline">PWR_OUTPUT: {(15 + scrollProgress * 85).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                {/* Scroll progress rail — left edge */}
                <div className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 space-y-4 z-30 pointer-events-none">
                    <div className="w-1 h-20 bg-white/5 rounded-full overflow-hidden relative">
                        <div
                            className="absolute top-0 left-0 w-full rounded-full transition-all duration-200"
                            style={{
                                height: `${scrollProgress * 100}%`,
                                background: `linear-gradient(to bottom, #00ffd9, #f49d25)`,
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-[10px] rotate-90 text-white/30 tracking-widest whitespace-nowrap">
                            SCROLL EXPLORE
                        </span>
                    </div>
                </div>
            </div>

            {/* Title overlay at top — bigger font, slower dissolve */}
            <div
                className="absolute top-20 left-0 right-0 z-20 text-center pointer-events-none"
                style={{
                    opacity: Math.max(0, 1 - scrollProgress * 2) * exitOpacity,
                    transition: "opacity 1.2s ease-out",
                }}
            >
                <span className="text-primary text-base md:text-lg font-bold tracking-[0.8em] uppercase mb-6 block">
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
                    Your Creative Powerplant // v6.0
                </p>
            </div>

            {/* Scroll prompt */}
            <div
                className="absolute top-[calc(100vh-60px)] left-0 right-0 text-center z-20 pointer-events-none transition-opacity duration-700"
                style={{ opacity: scrollProgress < 0.05 ? exitOpacity : 0 }}
            >
                <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse">
                    ◈ Scroll down to explore the engine ◈
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
