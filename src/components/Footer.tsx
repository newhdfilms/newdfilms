export default function Footer() {
    return (
        <footer id="contact" className="bg-black py-40 relative border-t border-white/5 overflow-hidden scroll-mt-20">
            <div className="noise-texture absolute inset-0"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-4 tracking-tighter text-glow-orange text-primary italic uppercase leading-tight">
                            LET&apos;S CREATE
                        </h2>
                        <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Form Section */}
                        <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10">
                            <form className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3" htmlFor="name">Your Name</label>
                                    <input className="w-full bg-white/5 border-white/10 rounded-lg py-4 px-5 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" id="name" placeholder="Enter your name" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3" htmlFor="project-type">Project Type</label>
                                    <select className="w-full bg-white/5 border-white/10 rounded-lg py-4 px-5 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" id="project-type">
                                        <option className="bg-background-dark">Commercial</option>
                                        <option className="bg-background-dark">Feature Film</option>
                                        <option className="bg-background-dark">Music Video</option>
                                        <option className="bg-background-dark">AI Integration</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3" htmlFor="message">Message</label>
                                    <textarea className="w-full bg-white/5 border-white/10 rounded-lg py-4 px-5 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" id="message" placeholder="Tell us about your vision..." rows={4}></textarea>
                                </div>
                                <button className="w-full bg-primary text-background-dark font-bold py-5 rounded-lg hover:brightness-110 transition-all uppercase tracking-[0.2em] text-sm" type="submit">
                                    Start Project
                                </button>
                            </form>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col justify-center h-full space-y-16 py-8">
                            <div>
                                <span className="text-primary text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Inquiries</span>
                                <a className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.1em] hover:text-primary transition-colors duration-500 block" href="mailto:HELLO@NEWHDFILMS.COM">
                                    HELLO@NEWHDFILMS.COM
                                </a>
                            </div>

                            <div className="space-y-6">
                                <span className="text-white/40 text-[11px] font-bold tracking-[0.4em] uppercase block">Regional Headquarters</span>
                                <div className="grid grid-cols-1 gap-8">
                                    <div>
                                        <h4 className="text-white font-bold mb-2">North Hollywood, Los Angeles</h4>
                                        <p className="text-white/40 text-sm leading-relaxed text-[11px] tracking-wide uppercase">Arts District Studios<br />CA, USA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                {['public', 'camera_alt', 'play_circle'].map((icon) => (
                                    <a key={icon} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary transition-all group" href="#">
                                        <span className="material-icons text-xl text-white/60 group-hover:text-primary transition-colors">{icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 pt-32 mt-32 border-t border-white/10">
                        <div className="text-center md:text-left">
                            <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">© 2024 NEWHDFILMS STUDIO. ALL RIGHTS RESERVED.</p>
                        </div>
                        <div className="text-center md:text-right flex gap-8 justify-center md:justify-end">
                            <a className="text-white/40 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest" href="#">Privacy Policy</a>
                            <a className="text-white/40 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest" href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
