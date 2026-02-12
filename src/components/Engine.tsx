"use client";

import { useState } from "react";

export default function Engine() {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    return (
        <section
            id="engine"
            className="scroll-mt-48 mb-40 relative py-20 overflow-hidden"
            onMouseLeave={() => setActiveStep(null)}
        >
            {/* Atmosphere */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.06) 0%, transparent 70%),
                        radial-gradient(circle at 20% 20%, rgba(244, 157, 37, 0.03) 0%, transparent 40%)
                    `
                }}
            />

            {/* Title */}
            <div className="relative z-10 text-center mb-16">
                <span className="text-primary text-[10px] font-bold tracking-[0.8em] uppercase mb-4 block">Proprietary Hyper-Core</span>
                <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4" style={{ textShadow: '0 0 15px rgba(244, 157, 37, 0.4)' }}>THE ENGINE</h3>
                <div className="w-24 h-[1px] bg-[#2dd4bf]/50 mx-auto mb-4" />
                <p className="text-white/40 text-xs uppercase tracking-[0.4em]">Cinematic Rendering Architecture v4.0.2</p>
            </div>

            {/* Engine Core Visualization */}
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="relative flex items-center justify-center min-h-[600px] md:min-h-[700px]">

                    {/* Central Fusion Core */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-700"
                            style={{
                                background: 'radial-gradient(circle, #f49d25 0%, #8a4b00 60%, transparent 100%)',
                                boxShadow: activeStep
                                    ? '0 0 120px 30px rgba(244, 157, 37, 0.6), inset 0 0 50px rgba(255, 255, 255, 0.6)'
                                    : '0 0 80px 15px rgba(244, 157, 37, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.4)',
                            }}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 animate-pulse" />
                        </div>
                    </div>

                    {/* Ring 1 — SPARK (innermost) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div
                            className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full transition-all duration-700"
                            style={{
                                border: `10px solid ${activeStep === "spark" ? 'rgba(45, 212, 191, 0.8)' : 'rgba(45, 212, 191, 0.15)'}`,
                                borderTopColor: activeStep === "spark" ? 'rgba(244, 157, 37, 1)' : 'rgba(45, 212, 191, 0.7)',
                                boxShadow: activeStep === "spark" ? '0 0 60px rgba(45, 212, 191, 0.3), inset 0 0 30px rgba(45, 212, 191, 0.1)' : '0 0 30px rgba(45, 212, 191, 0.08)',
                                animation: 'engineSpin 12s linear infinite',
                            }}
                        />
                    </div>

                    {/* Ring 2 — CRAFT */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div
                            className="w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full transition-all duration-700"
                            style={{
                                border: `8px solid ${activeStep === "craft" ? 'rgba(45, 212, 191, 0.7)' : 'rgba(45, 212, 191, 0.1)'}`,
                                borderBottomColor: activeStep === "craft" ? 'rgba(244, 157, 37, 1)' : 'rgba(45, 212, 191, 0.35)',
                                boxShadow: activeStep === "craft" ? '0 0 60px rgba(45, 212, 191, 0.3), inset 0 0 30px rgba(45, 212, 191, 0.1)' : '0 0 20px rgba(45, 212, 191, 0.05)',
                                animation: 'engineSpin 20s linear infinite reverse',
                            }}
                        />
                    </div>

                    {/* Ring 3 — FORGE */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
                        <div
                            className="w-[460px] h-[460px] md:w-[540px] md:h-[540px] rounded-full transition-all duration-700"
                            style={{
                                border: `6px solid ${activeStep === "forge" ? 'rgba(45, 212, 191, 0.6)' : 'rgba(45, 212, 191, 0.08)'}`,
                                borderLeftColor: activeStep === "forge" ? 'rgba(244, 157, 37, 1)' : 'rgba(45, 212, 191, 0.25)',
                                boxShadow: activeStep === "forge" ? '0 0 60px rgba(45, 212, 191, 0.25)' : 'none',
                                animation: 'engineSpin 30s linear infinite',
                                opacity: activeStep === "forge" ? 1 : 0.6,
                            }}
                        />
                    </div>

                    {/* Ring 4 — LAUNCH (outermost) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
                        <div
                            className="w-[580px] h-[580px] md:w-[680px] md:h-[680px] rounded-full transition-all duration-700"
                            style={{
                                border: `3px solid ${activeStep === "launch" ? 'rgba(45, 212, 191, 0.5)' : 'rgba(45, 212, 191, 0.05)'}`,
                                borderRightColor: activeStep === "launch" ? 'rgba(244, 157, 37, 0.8)' : 'rgba(45, 212, 191, 0.15)',
                                boxShadow: activeStep === "launch" ? '0 0 50px rgba(45, 212, 191, 0.2)' : 'none',
                                animation: 'engineSpin 40s linear infinite reverse',
                                opacity: activeStep === "launch" ? 1 : 0.3,
                            }}
                        />
                    </div>

                    {/* Hoverable Labels — these are the interaction targets */}
                    {/* SPARK label — top */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 z-40 cursor-pointer"
                        style={{ top: 'calc(50% - 145px)' }}
                        onMouseEnter={() => setActiveStep("spark")}
                    >
                        <span className={`px-4 py-1.5 text-[10px] font-black rounded-sm transition-all duration-500 inline-block hover:scale-110 ${activeStep === "spark" ? 'bg-primary text-black shadow-[0_0_20px_rgba(244,157,37,0.5)]' : 'bg-[#2dd4bf] text-black hover:bg-primary'}`}>
                            SPARK
                        </span>
                    </div>

                    {/* CRAFT label — bottom */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 z-40 cursor-pointer"
                        style={{ top: 'calc(50% + 200px)' }}
                        onMouseEnter={() => setActiveStep("craft")}
                    >
                        <span className={`px-4 py-1.5 text-[10px] font-black rounded-sm transition-all duration-500 inline-block hover:scale-110 ${activeStep === "craft" ? 'bg-primary text-black shadow-[0_0_20px_rgba(244,157,37,0.5)]' : 'bg-[#2dd4bf] text-black hover:bg-primary'}`}>
                            CRAFT
                        </span>
                    </div>

                    {/* FORGE label — left */}
                    <div
                        className="absolute z-40 cursor-pointer"
                        style={{ top: 'calc(50% - 10px)', left: 'calc(50% - 275px)' }}
                        onMouseEnter={() => setActiveStep("forge")}
                    >
                        <span className={`px-4 py-1.5 text-[10px] font-black rounded-sm transition-all duration-500 inline-block -rotate-90 hover:scale-110 ${activeStep === "forge" ? 'bg-primary text-black shadow-[0_0_20px_rgba(244,157,37,0.5)]' : 'bg-[#2dd4bf] text-black hover:bg-primary'}`}>
                            FORGE
                        </span>
                    </div>

                    {/* LAUNCH label — bottom-left */}
                    <div
                        className="absolute z-40 cursor-pointer"
                        style={{ top: 'calc(50% + 280px)', left: 'calc(50% - 300px)' }}
                        onMouseEnter={() => setActiveStep("launch")}
                    >
                        <span className={`px-4 py-1.5 text-[10px] font-black rounded-sm transition-all duration-500 inline-block hover:scale-110 ${activeStep === "launch" ? 'bg-primary text-black shadow-[0_0_20px_rgba(244,157,37,0.5)]' : 'bg-[#2dd4bf] text-black hover:bg-primary'}`}>
                            LAUNCH
                        </span>
                    </div>

                    {/* Cross-hair decorative lines */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 pointer-events-none" />

                    {/* ─── Info Panes (animate in on hover) ────────────────── */}

                    {/* SPARK pane — top left */}
                    <div className={`absolute left-4 md:left-0 top-0 z-50 transition-all duration-700 ease-out ${activeStep === "spark" ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-12 -translate-y-4 pointer-events-none"}`}>
                        <div className="backdrop-blur-2xl bg-[#0a0f0f]/85 border border-white/10 border-l-2 border-l-primary p-6 md:p-8 w-[280px] md:w-[320px] rounded-lg"
                            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(244, 157, 37, 0.08)' }}>
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-11 h-11 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10">
                                    <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-black italic tracking-tighter leading-none">01 SPARK</h4>
                                    <span className="text-[9px] text-primary tracking-[0.3em] font-bold">IDEATION CORE</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed font-light tracking-wide">
                                The ignition point where proprietary LLMs stress-test creative concepts. Thousands of mood-boards generated in seconds to find the perfect cinematic DNA.
                            </p>
                            <div className="mt-5 flex gap-2">
                                <div className="h-1 flex-1 bg-primary/40" /><div className="h-1 flex-1 bg-primary/15" /><div className="h-1 flex-1 bg-primary/5" />
                            </div>
                        </div>
                    </div>

                    {/* CRAFT pane — top right */}
                    <div className={`absolute right-4 md:right-0 top-[10%] z-50 transition-all duration-700 ease-out ${activeStep === "craft" ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-12 translate-y-4 pointer-events-none"}`}>
                        <div className="backdrop-blur-2xl bg-[#0a0f0f]/85 border border-white/10 border-r-2 border-r-[#2dd4bf] p-6 md:p-8 w-[280px] md:w-[320px] rounded-lg text-right"
                            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(45, 212, 191, 0.08)' }}>
                            <div className="flex items-center justify-end gap-4 mb-5">
                                <div>
                                    <h4 className="text-xl font-black italic tracking-tighter leading-none">02 CRAFT</h4>
                                    <span className="text-[9px] text-[#2dd4bf] tracking-[0.3em] font-bold">NEURAL PIPELINE</span>
                                </div>
                                <div className="w-11 h-11 rounded-full border border-[#2dd4bf]/50 flex items-center justify-center bg-[#2dd4bf]/10">
                                    <span className="material-symbols-outlined text-[#2dd4bf] text-xl">brush</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed font-light tracking-wide">
                                Precision prompting meets neural style transfer. Every frame is hand-refined by our elite artists to ensure AI output possesses a true cinematic soul.
                            </p>
                        </div>
                    </div>

                    {/* FORGE pane — bottom left */}
                    <div className={`absolute left-4 md:left-0 bottom-[5%] z-50 transition-all duration-700 ease-out ${activeStep === "forge" ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-12 translate-y-4 pointer-events-none"}`}>
                        <div className="backdrop-blur-2xl bg-[#0a0f0f]/85 border border-white/10 border-l-2 border-l-[#2dd4bf] p-6 md:p-8 w-[280px] md:w-[320px] rounded-lg"
                            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(45, 212, 191, 0.08)' }}>
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-11 h-11 rounded-full border border-[#2dd4bf]/50 flex items-center justify-center bg-[#2dd4bf]/10">
                                    <span className="material-symbols-outlined text-[#2dd4bf] text-xl">precision_manufacturing</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-black italic tracking-tighter leading-none">03 FORGE</h4>
                                    <span className="text-[9px] text-[#2dd4bf] tracking-[0.3em] font-bold uppercase">8K Synthesis</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed font-light tracking-wide">
                                High-density rendering and custom upscaling algorithms. We bake raw generated pixels into master-ready deliverables for theatrical exhibition.
                            </p>
                        </div>
                    </div>

                    {/* LAUNCH pane — bottom right */}
                    <div className={`absolute right-4 md:right-0 bottom-[-5%] z-50 transition-all duration-700 ease-out ${activeStep === "launch" ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-12 translate-y-8 pointer-events-none"}`}>
                        <div className="backdrop-blur-2xl bg-[#0a0f0f]/85 border border-white/10 border-r-2 border-r-primary p-6 md:p-8 w-[280px] md:w-[320px] rounded-lg text-right"
                            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(244, 157, 37, 0.08)' }}>
                            <div className="flex items-center justify-end gap-4 mb-5">
                                <div>
                                    <h4 className="text-xl font-black italic tracking-tighter leading-none">04 LAUNCH</h4>
                                    <span className="text-[9px] text-primary tracking-[0.3em] font-bold">DEPLOYMENT</span>
                                </div>
                                <div className="w-11 h-11 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10">
                                    <span className="material-symbols-outlined text-primary text-xl">rocket_launch</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed font-light tracking-wide">
                                Seamless deployment across spatial computing, streaming platforms, and IMAX screens. Optimized for the next generation of viewership.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prompt to interact */}
            <div className={`text-center mt-8 transition-opacity duration-700 ${activeStep ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse">
                    ◈ Hover over the labels to explore the process ◈
                </p>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes engineSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
