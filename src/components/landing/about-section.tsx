"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = Array(8).fill("Logo Along");

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const crystalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(marqueeRef.current, {
                x: "-50%",
                duration: 20,
                ease: "none",
                repeat: -1
            });
        });
        return () => ctx.revert();
    }, []);

    // Animasi Kristal Jatuh
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.2,
                }
            });

            tl
                .to(crystalRef.current, {
                    top: "55%",
                    left: "35%",
                    rotation: -20,
                    scale: 1.1,
                    ease: "power1.inOut",
                    duration: 1
                })

                .to(crystalRef.current, {
                    top: "92%",
                    left: "73%",
                    rotation: 40,
                    scale: 1,
                    ease: "power1.inOut",
                    duration: 1
                });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[250vh] container px-6 mx-auto z-10 overflow-hidden"
        >
            <div
                ref={crystalRef}
                className="fixed hidden lg:block md:absolute z-50 w-5xl h-256 pointer-events-none drop-shadow-2xl"
                style={{
                    top: "20%",
                    left: "60%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <Image
                    src="/images/batu-akik.png"
                    alt="Floating Crystal"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="relative pb-8 pt-12 md:pt-16 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 mb-8 md:mb-16 relative z-10">
                    <div className="flex flex-col gap-6">
                        <div>
                            <button className="border border-[#2A2A2A]/30 px-4 py-2 text-sm uppercase tracking-wide hover:bg-[#2A2A2A] hover:text-[#EAE7DD] transition-colors">
                                Apa Itu Along? &gt;
                            </button>
                        </div>
                        <h2 className="text-3xl md:text-[64px] font-serif leading-[0.9] tracking-tight text-[#2A2A2A]">
                            Temukan Berbagai <br /> Keindahan Nusantara
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4 justify-between md:items-end">
                        <div className="max-w-md md:text-right text-lg leading-relaxed font-medium text-[#2A2A2A]/80">
                            Along adalah platform pariwisata Indonesia yang memungkinkan pengguna untuk menjelajahi destinasi wisata terbaik
                        </div>
                        <div className="flex md:justify-end">
                            <button className="border border-[#2A2A2A] px-6 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-[#2A2A2A] hover:text-[#EAE7DD] transition-all flex items-center gap-2 text-[#2A2A2A]">
                                Jelajahi Sekarang <span className="text-lg">↗</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full aspect-16/7 overflow-hidden z-0">
                    <Image
                        src="/images/about.png"
                        alt="Classic Painting"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="w-full py-6 md:py-12 overflow-hidden relative z-10">
                <div className="flex whitespace-nowrap" ref={marqueeRef} style={{ width: "fit-content" }}>
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                        <div key={i} className="flex items-center gap-2 mx-8 md:mx-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                            <span className="text-xl md:text-2xl font-bold font-sans tracking-tight">{logo}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch w-full py-8 relative z-10">
                <div className="md:col-span-7 w-full relative">
                    <div className="relative w-full aspect-4/3 md:aspect-auto md:h-full shadow-lg">
                        <Image
                            src="/images/about-2.png"
                            alt="Ruins Painting"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="relative w-full aspect-4/3 shadow-lg">
                        <Image
                            src="/images/about-3.png"
                            alt="Woman Weaving Painting"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>

                    <div className="font-serif text-2xl leading-snug">
                        <span className="text-[#1a1a1a]">
                            Temukan destinasi terbaik, panduan lokal, {" "}
                        </span>
                        <span className="text-[#1a1a1a]/40">
                            dan berbagai informasi menarik dari seluruh pelosok Indonesia.
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 lg:py-32 relative z-10">
                <div className="flex flex-col items-start max-w-xl">
                    <h2 className="text-3xl md:text-[64px] font-serif leading-[0.9] tracking-tight text-[#2A2A2A]">
                        Menjelajahi Keindahan Indonesia
                        Dengan Along
                    </h2>
                    <div className="font-serif text-xl mt-8 max-w-md font-medium leading-snug">
                        <span className="text-[#1a1a1a]">
                            Dengan Along, nikmati pengalaman wisata yang mudah, menyenangkan, dan penuh inspirasi.
                        </span>
                    </div>
                    <button className="mt-8 border border-[#2A2A2A] text-[#2A2A2A] px-6 py-3 font-serif text-lg hover:bg-[#2A2A2A] hover:text-[#EAEAE8] transition-colors duration-300 flex items-center gap-2 group">
                        Jelajahi Sekarang
                        <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </button>
                </div>

                {/* === KANAN: Scattered Cities === */}
                <div className="relative md:h-125 w-full hidden md:block">
                    <div className="absolute top-8 left-1/4 font-serif text-4xl md:text-5xl text-[#2A2A2A]">Makassar</div>
                    <div className="absolute top-16 right-2 font-serif text-4xl md:text-5xl text-[#2A2A2A]">Jayapura</div>
                    <div className="absolute top-1/3 left-0 font-serif text-4xl md:text-5xl text-[#2A2A2A]">Yogyakarta</div>
                    <div className="absolute top-60 right-10 font-serif text-4xl md:text-5xl text-[#2A2A2A]">Medan</div>
                    <div className="absolute bottom-18 right-16 font-serif text-6xl md:text-5xl text-[#2A2A2A]">Ambon</div>
                    <div className="absolute bottom-32 left-26 font-serif text-4xl md:text-5xl text-[#2A2A2A]">Bali</div>
                </div>
            </div>
        </section>
    );
}
