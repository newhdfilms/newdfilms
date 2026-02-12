"use client";

export default function Hero() {
    return (
        <section id="hero" className="max-w-6xl mx-auto mb-60 pt-40 md:pt-60 text-center">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[0.95] tracking-tighter text-glow uppercase">
                UNFILTERED<br />
                <span className="text-primary">VISION</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                We collapse the distance between imagination and reality using custom-built AI creative pipelines.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
                <button
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    className="lens-flare-cta bg-primary text-background-dark font-extrabold px-14 py-5 rounded-sm text-xs uppercase tracking-[0.3em]"
                >
                    VIEW OUR REEL
                </button>
                <button
                    onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })}
                    className="glass-card px-14 py-5 rounded-sm border border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-[0.3em]"
                >
                    THE ENGINE
                </button>
            </div>
        </section>
    );
}
