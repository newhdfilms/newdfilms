export default function Engine() {
    const steps = [
        {
            id: "01",
            title: "SPARK",
            desc: "AI-assisted ideation. We use proprietary LLMs to stress-test concepts and generate thousands of mood-boards in seconds.",
            delay: ""
        },
        {
            id: "02",
            title: "CRAFT",
            desc: "Neural style transfer and precision prompting. Every frame is hand-refined for cinematic soul and consistency.",
            delay: "lg:mt-12"
        },
        {
            id: "03",
            title: "FORGE",
            desc: "High-end rendering and AI-upscaling. We bake raw generated pixels into 8K master-ready deliverables.",
            delay: ""
        },
        {
            id: "04",
            title: "LAUNCH",
            desc: "Deployment across immersive platforms. Optimized for social, theatrical, and spatial computing environments.",
            delay: "lg:mt-12"
        }
    ];

    return (
        <section id="engine" className="scroll-mt-48 mb-60 relative py-20 overflow-hidden">
            <div className="noise-texture absolute inset-0 z-0"></div>
            <div className="cinematic-grid absolute inset-0 z-0 opacity-20"></div>

            <div className="relative z-10 text-center mb-32">
                <span className="text-primary text-xs font-bold tracking-[0.6em] uppercase mb-4 block">Our Process</span>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tight">THE ENGINE</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto relative z-10 px-4">
                {steps.map((step) => (
                    <div key={step.id} className={`group relative h-[500px] flex flex-col justify-end p-8 text-left glass-card overflow-hidden border-white/5 ${step.delay}`}>
                        <div className="absolute top-4 right-4 text-9xl font-bold number-outline opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                            {step.id}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
                        <div className="relative">
                            <h4 className="text-4xl font-black italic tracking-tighter mb-4 text-primary">{step.title}</h4>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
