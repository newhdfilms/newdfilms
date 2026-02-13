"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

interface Video {
    id: string;
    title: string;
    videoId: string;
    platform: 'youtube' | 'vimeo';
}

interface CarouselProps {
    title: string;
    subtitle: string;
    videos: Video[];
}

import { useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

function CarouselItem({ video, containerRef, onSelect }: { video: Video, containerRef: React.RefObject<HTMLDivElement | null>, onSelect: (v: Video) => void }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({
        container: containerRef,
        target: itemRef,
        offset: ["start end", "end start"]
    });

    // Adjusted scale logic: distinct but stable center focus
    // Using a plateau [0.4, 0.6] ensures the center item stays distinct and clear
    const scale = useTransform(scrollXProgress, [0, 0.4, 0.6, 1], [0.9, 1.1, 1.1, 0.9]);
    const opacity = useTransform(scrollXProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 0.5]);
    const blur = useTransform(scrollXProgress, [0, 0.4, 0.6, 1], ["4px", "0px", "0px", "4px"]);

    const springScale = useSpring(scale, { stiffness: 400, damping: 40 });
    const springOpacity = useSpring(opacity, { stiffness: 400, damping: 40 });
    const springBlur = useSpring(blur, { stiffness: 400, damping: 40 });

    const getThumbnail = (video: Video) => {
        if (video.videoId === "placeholder") {
            return 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?auto=format&fit=crop&q=80&w=1000';
        }
        if (video.platform === 'youtube') {
            return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
        }
        return `https://vumbnail.com/${video.videoId}.jpg`;
    };

    return (
        <motion.div
            ref={itemRef}
            style={{
                scale: springScale,
                opacity: springOpacity,
                filter: useMotionTemplate`blur(${springBlur})`,
                zIndex: useTransform(scrollXProgress, [0, 0.45, 0.55, 1], [0, 10, 10, 0])
            }}
            className={`flex-none w-[300px] md:w-[600px] snap-center group relative aspect-video rounded-2xl overflow-hidden glass-card border-white/10 transition-shadow duration-500 hover:shadow-[0_40px_80px_rgba(244,157,37,0.2)] ${video.videoId === "placeholder" ? "cursor-default grayscale" : "cursor-pointer"}`}
            onClick={() => video.videoId !== "placeholder" && onSelect(video)}
        >
            <motion.div
                className="w-full h-full absolute inset-0 bg-black/60 z-10" // Overlay for inactive opacity simulation if needed, but styling on main div is better
                style={{ opacity: useTransform(scrollXProgress, [0, 0.4, 0.6, 1], [0.5, 0, 0, 0.5]) }}
            />
            <img
                src={getThumbnail(video)}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?auto=format&fit=crop&q=80&w=1000';
                }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent p-8 flex flex-col justify-end text-left ${video.videoId === "placeholder" ? "bg-black/60" : ""}`}>
                {video.videoId !== "placeholder" && (
                    <div className="flex items-center gap-4 mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_30px_rgba(244,157,37,0.6)]">
                            <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                        <span className="text-[11px] font-bold text-white tracking-widest uppercase bg-primary px-4 py-1.5 rounded-sm text-background-dark">
                            Watch Now
                        </span>
                    </div>
                )}
                <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${video.videoId !== "placeholder" ? "group-hover:text-primary" : "text-white/30"} transition-colors`}>
                    {video.title}
                </h4>
                <p className="text-white/40 text-[11px] font-bold tracking-[0.3em] uppercase mt-2">
                    {video.videoId === "placeholder" ? "Coming Soon" : video.platform}
                </p>
            </div>
        </motion.div>
    );
}

function VideoCarousel({ title, subtitle, videos }: CarouselProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Set initial scroll to middle on mount
    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth } = scrollRef.current;
            scrollRef.current.scrollLeft = scrollWidth / 3;
        }
    }, [videos]);

    // Triple the videos for seamless looping
    const loopedVideos = [...videos, ...videos, ...videos];

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // Loop back to middle if we reach the ends
        if (scrollLeft <= 0) {
            scrollRef.current.scrollLeft = scrollWidth / 3;
        } else if (scrollLeft >= (scrollWidth * 2) / 3) {
            scrollRef.current.scrollLeft = scrollWidth / 3;
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const getEmbedUrl = (video: Video) => {
        if (video.platform === 'youtube') {
            return `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
        }
        return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`;
    };

    return (
        <div className="mb-12 overflow-hidden">
            <div className="text-center mb-12 px-10">
                <span className="text-primary text-[22px] font-bold tracking-[0.4em] uppercase mb-4 block leading-tight">{subtitle}</span>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none italic opacity-80">{title}</h3>
            </div>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-0 overflow-x-auto py-32 snap-x snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {loopedVideos.map((video, idx) => (
                    <div key={`${video.id}-${idx}`} className="flex-none px-4 md:px-12 snap-center">
                        <CarouselItem
                            video={video}
                            containerRef={scrollRef}
                            onSelect={setSelectedVideo}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-8 mt-12 mb-20">
                <button
                    onClick={() => scroll("left")}
                    className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group active:scale-90 hover:border-primary"
                >
                    <ChevronLeft className="w-8 h-8 group-hover:text-primary transition-colors" />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group active:scale-90 hover:border-primary"
                >
                    <ChevronRight className="w-8 h-8 group-hover:text-primary transition-colors" />
                </button>
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark/98 backdrop-blur-3xl p-4 md:p-10"
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-10 right-10 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/20 group z-[110]"
                        >
                            <X className="w-8 h-8 group-hover:text-primary transition-colors text-white" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] border border-white/10 relative"
                        >
                            <iframe
                                src={getEmbedUrl(selectedVideo)}
                                title={selectedVideo.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AiCreationsCarousel() {
    const aiCreations: Video[] = [
        { id: "1", title: "Conduit Collective Reel", videoId: "qMrQIKzTXWM", platform: 'youtube' },
        { id: "2", title: "Save the Robots", videoId: "Fa_qozZo8QU", platform: 'youtube' },
        { id: "3", title: "Dogged Vine Winery", videoId: "odTiZQI60fs", platform: 'youtube' },
        { id: "4", title: "Dogged Vine Winery Part 2", videoId: "o1Mif0xfzvU", platform: 'youtube' },
        { id: "5", title: "Culture Pop Soda", videoId: "trnBZc4eVPc", platform: 'youtube' },
        { id: "6", title: "Scrubby the Bubble", videoId: "j5KvO62Nkak", platform: 'youtube' },
        { id: "7", title: "Gangsta Music Video", videoId: "zossDzY27qk", platform: 'youtube' },
        { id: "8", title: "Penn State Promo", videoId: "QfGLgfSaT40", platform: 'youtube' },
        { id: "9", title: "Clean Air Project", videoId: "03kmgB702wk", platform: 'youtube' },
    ];

    return (
        <section id="work" className="scroll-mt-48 mb-24">
            <VideoCarousel
                title="SYNTHETIC PRODUCTIONS"
                subtitle="AI Creations"
                videos={aiCreations}
            />
        </section>
    );
}

export function TeamCarousels() {
    const adamsReels: Video[] = [
        { id: "10", title: "Online Editor Reel", videoId: "xi97axuLfBE", platform: 'youtube' },
        { id: "11", title: "Offline Editor Reel", videoId: "w9zQz425QfQ", platform: 'youtube' },
        { id: "12", title: "E! News Sizzle Reel", videoId: "cznIFaQ4RAU", platform: 'youtube' },
        { id: "13", title: "Style Network Sizzle", videoId: "yX6mpOxISQQ", platform: 'youtube' },
        { id: "14", title: "Louis Vuitton Manifesto", videoId: "Hum7OzluzIM", platform: 'youtube' },
        { id: "15", title: "E! Brand Genius Sizzle", videoId: "LJgZBFCdVCA", platform: 'youtube' },
        { id: "16", title: "Boost Media", videoId: "swsTHPf4V9Q", platform: 'youtube' },
        { id: "17", title: "Canon Project Imagine", videoId: "-YKf7nBHv8s", platform: 'youtube' },
        { id: "18", title: "Nestle Sizzle", videoId: "LQKbsKmUpYA", platform: 'youtube' },
    ];

    const marcsWork: Video[] = [
        { id: "m1", title: "Main Demo Reel (2021-2023)", videoId: "1163793996", platform: 'vimeo' },
        { id: "m2", title: "The Book of Boba Fett", videoId: "rOJ1cw6mohw", platform: 'youtube' },
        { id: "m3", title: "Ahsoka", videoId: "J_1EXWNETiI", platform: 'youtube' },
        { id: "m4", title: "Ant-Man and the Wasp", videoId: "ZlNFpri-Y40", platform: 'youtube' },
        { id: "m5", title: "Deep Water Horizon", videoId: "S-UPJyEHmM0", platform: 'youtube' },
        { id: "m6", title: "Amsterdam", videoId: "GLs2xxM0e78", platform: 'youtube' },
        { id: "m7", title: "VFX Technical Reel", videoId: "1155609756", platform: 'vimeo' },
        { id: "m8", title: "American Masters: Mel Brooks", videoId: "1158057149", platform: 'vimeo' },
    ];

    const spencersCreations: Video[] = [
        { id: "s1", title: "Munchkin Bond Bottle", videoId: "1113449335", platform: 'vimeo' },
        { id: "s2", title: "Flow: Bonded for Life", videoId: "1107172184", platform: 'vimeo' },
        { id: "s3", title: "Disney Aulani Resort", videoId: "425270693", platform: 'vimeo' },
        { id: "s4", title: "Sunteck Sizzle", videoId: "1012573755", platform: 'vimeo' },
        { id: "s5", title: "Electric Daisy Carnival Vegas", videoId: "1006360996", platform: 'vimeo' },
        { id: "s6", title: "MasterClass: Thomas Keller", videoId: "303119009", platform: 'vimeo' },
        { id: "s7", title: "Nickelodeon SpongeBob", videoId: "363474145", platform: 'vimeo' },
        { id: "s8", title: "Sound Union: Songwriters With Soldiers", videoId: "900236613", platform: 'vimeo' },
        { id: "s9", title: "HEFP Trailer", videoId: "986577015", platform: 'vimeo' },
        { id: "s10", title: "Surfergirl Sizzle", videoId: "355481811", platform: 'vimeo' },
        { id: "s11", title: "The Bachelor Sneak Peek", videoId: "669926014", platform: 'vimeo' },
        { id: "s12", title: "The Walk (Zemeckis)", videoId: "207201915", platform: 'vimeo' },
        { id: "s13", title: "Billy Lynn's Long Halftime Walk", videoId: "203204655", platform: 'vimeo' },
        { id: "s14", title: "Shallows International", videoId: "207200163", platform: 'vimeo' },
        { id: "s15", title: "Meeting The Beatles In India", videoId: "447590743", platform: 'vimeo' },
        { id: "s16", title: "Roku", videoId: "552649082", platform: 'vimeo' },
    ];

    const gobisWork: Video[] = [
        { id: "g1", title: "Hot Pockets feat. Snoop Dogg", videoId: "268630067", platform: 'vimeo' },
        { id: "g2", title: "Tupac: 2 of Amerikaz Most Wanted", videoId: "307791375", platform: 'vimeo' },
        { id: "g3", title: "HP Ink - Environmental", videoId: "268629146", platform: 'vimeo' },
        { id: "g4", title: "SHARP TV 8K Presentation", videoId: "297798346", platform: 'vimeo' },
        { id: "g5", title: "Footprint: Champions of Change", videoId: "671198353", platform: 'vimeo' },
        { id: "g6", title: "Mc Breed: Rap Game", videoId: "308360473", platform: 'vimeo' },
        { id: "g7", title: "Gateway Computers", videoId: "92194903", platform: 'vimeo' },
        { id: "g8", title: "Yoke's World: Footprint", videoId: "693778839", platform: 'vimeo' },
    ];

    return (
        <section className="scroll-mt-48 mb-60">
            <div id="adams-reels" className="scroll-mt-24">
                <VideoCarousel
                    title="ADAM'S REELS"
                    subtitle="Editorial & Brand"
                    videos={adamsReels}
                />
            </div>
            <div id="marcs-reels" className="scroll-mt-24">
                <VideoCarousel
                    title="MARC'S MASTERS"
                    subtitle="Color & Compositing"
                    videos={marcsWork}
                />
            </div>
            <div id="spencers-reels" className="scroll-mt-24">
                <VideoCarousel
                    title="SPENCER HILL"
                    subtitle="Narrative Architect"
                    videos={spencersCreations}
                />
            </div>
            <div id="gobis-reels" className="scroll-mt-24">
                <VideoCarousel
                    title="GOBI'S VISION"
                    subtitle="Production & Direction"
                    videos={gobisWork}
                />
            </div>
        </section>
    );
}
