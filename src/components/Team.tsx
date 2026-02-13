"use client";

export default function Team() {
    const members = [
        {
            name: "Adam Litwinski",
            role: "Founder & AI Creative",
            specialization: "Specialization: AI Workflow",
            bio: "Over 20 years in film and digital media, producing for Disney, Marvel, and NBCUniversal. Currently evolving post-production with AI integration.",
            mobileBio: "20+ years producing for Disney, Marvel & NBCUniversal.",
            image: "/adam.png",
            reelId: "adams-reels"
        },
        {
            name: "Marc Fisher",
            role: "Colorist & Compositor",
            specialization: "Master of Visual Depth",
            bio: "A passionate creative combining strategic thinking with expert execution in Color, Editorial, and VFX. Delivering exceptional digital experiences at the intersection of technology and innovation.",
            mobileBio: "Expert in Color, Editorial & VFX at the edge of innovation.",
            image: "/Marc.png",
            reelId: "marcs-reels"
        },
        {
            name: "Gobi M. Rahimi",
            role: "Producer & Director",
            specialization: "Executive Visionary",
            bio: "Commercial and branded content producer/director with an eye for innovation, providing agile and cost-effective production solutions.",
            mobileBio: "Branded content producer/director with agile solutions.",
            image: "/Gobi.webp",
            reelId: "gobis-reels"
        },
        {
            name: "Bob Grey",
            role: "Sound Designer & Mixer",
            specialization: "Sonic Landscapes Specialist",
            bio: "VP of Post Production since 2007. Expert in re-recording mixing, facility design, and delivering award-winning audio under pressure for major studios.",
            mobileBio: "VP of Post Production — award-winning audio for major studios.",
            image: "/Bob.jpg",
            reelId: null
        },
        {
            name: "Spencer Hill",
            role: "Creative Editor",
            specialization: "Narrative Architect",
            bio: "Award-winning lead video editor-producer with expertise in over 250 theatrical campaigns. Specializes in impactful storytelling for film, branding, and AI creation.",
            mobileBio: "250+ theatrical campaigns — storytelling for film & AI.",
            image: "/spencer.jpg",
            reelId: "spencers-reels"
        }
    ];

    const scrollToReel = (reelId: string) => {
        const element = document.getElementById(reelId);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section id="team" className="scroll-mt-48 mb-60">
            <div className="text-center mb-24">
                <span className="text-primary text-[15px] font-bold tracking-[0.5em] uppercase mb-4 block">Meet The Visionaries</span>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-glow uppercase italic">
                    THE <span className="text-primary">TEAM</span>
                </h2>
                <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                    A collective of creative technologists, visual storytellers, and master craftspeople redefining the cinematic landscape.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="team-card group"
                    >
                        {/* Image container — hover effects only on md+ */}
                        <div
                            className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-black/50 border border-white/10 md:group-hover:border-primary/50 transition-colors duration-500 cursor-pointer md:cursor-pointer"
                            onClick={() => member.reelId && scrollToReel(member.reelId)}
                        >
                            {/* Image with filters — grayscale hover only on desktop */}
                            <img
                                alt={member.name}
                                className="w-full h-full object-cover transition-all duration-700 filter grayscale contrast-125 brightness-90 md:group-hover:grayscale-0 md:group-hover:contrast-100 md:group-hover:brightness-100 md:group-hover:scale-105"
                                src={member.image}
                            />

                            {/* Teal/Orange Tint Overlay - fades out on hover (desktop only) */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/40 to-orange-900/40 mix-blend-overlay transition-opacity duration-700 md:group-hover:opacity-0"></div>

                            {/* Dark gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 transition-opacity duration-500"></div>

                            {/* Desktop Content Overlay — hidden on mobile, hover-reveal on desktop */}
                            <div className="absolute inset-0 p-8 hidden md:flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="space-y-3">
                                    <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {member.role}
                                    </span>
                                    <h3 className="text-3xl font-black tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-white/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                                        {member.bio}
                                    </p>
                                    {member.reelId && (
                                        <button
                                            className="mt-2 px-5 py-2 border border-primary/60 text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 hover:bg-primary hover:text-background-dark"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                scrollToReel(member.reelId!);
                                            }}
                                        >
                                            View My Work
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Name Overlay — only on mobile, always visible at bottom of image */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
                                <h3 className="text-2xl font-black tracking-tighter uppercase text-white">
                                    {member.name}
                                </h3>
                            </div>
                        </div>

                        {/* Mobile Info — always visible below image, hidden on desktop */}
                        <div className="md:hidden mt-4 space-y-2 px-1">
                            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block">
                                {member.role}
                            </span>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {member.mobileBio}
                            </p>
                            {member.reelId && (
                                <button
                                    className="mt-2 px-5 py-2.5 border border-primary/60 text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-lg active:bg-primary active:text-background-dark transition-all duration-300"
                                    onClick={() => scrollToReel(member.reelId!)}
                                >
                                    View Work →
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Join Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 aspect-[4/5] bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group cursor-pointer p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-icons text-white/20 text-7xl mb-6 group-hover:text-primary transition-colors duration-500 scale-90 group-hover:scale-110 transform">add_circle_outline</span>
                    <h3 className="text-2xl font-bold tracking-tight uppercase text-white/40 group-hover:text-white transition-colors mb-2">Join Us</h3>
                    <p className="text-[10px] font-bold text-white/20 tracking-[0.2em] uppercase group-hover:text-primary/80 transition-colors">Apply Today</p>
                </div>
            </div>
        </section>
    );
}
