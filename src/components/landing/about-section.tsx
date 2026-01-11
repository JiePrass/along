"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { ModelKristal } from "@/components/3d/model-kristal";
import * as THREE from "three";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = Array(8).fill("Logo Along");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CrystalScene({ triggerRef }: any) {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useLayoutEffect(() => {
        if (!triggerRef.current || !groupRef.current) return;

        const ctx = gsap.context(() => {
            if (!groupRef.current) return;

            gsap.set(groupRef.current.position, {
                x: 0,
                y: -viewport.height * 0.1,
                z: 0,
            });

            gsap.set(groupRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            tl.to(groupRef.current.rotation, {
                y: Math.PI * 4,
                z: -Math.PI / 12,
                x: Math.PI / 12,
                ease: "power1.inOut",
                duration: 10
            }, 0);

            tl.to(groupRef.current.position, {
                x: -viewport.width * 0.25,
                y: viewport.height * 0.05,
                ease: "power1.inOut",
                duration: 5
            }, 0);

            tl.to(groupRef.current.position, {
                x: viewport.width * 0.25,
                y: -viewport.height * 0.0001,
                ease: "power1.inOut",
                duration: 5
            }, ">");

        });

        return () => ctx.revert();
    }, [viewport, triggerRef]);

    return (
        <group ref={groupRef}>
            <Center>
                <ModelKristal />
            </Center>
        </group>
    );
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    // --- GSAP: Marquee ---
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

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full container px-6 mx-auto z-10"
        >
            <div className="sticky top-0 h-screen w-full z-50 pointer-events-none">
                <div className="absolute inset-0 hidden lg:block">
                    <Canvas
                        dpr={[1, 2]}
                        camera={{ position: [0, 0, 9], fov: 45 }}
                        gl={{ alpha: true, antialias: true }}
                    >
                        <ambientLight intensity={1} />
                        <directionalLight position={[5, 5, 5]} intensity={2} />
                        <Environment preset="city" />
                        <CrystalScene triggerRef={sectionRef} />
                    </Canvas>
                </div>
            </div>

            <div className="relative -mt-[100vh] pb-12">
                <div className="pt-12 md:pt-16 flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 mb-8 md:mb-16">
                        <div className="flex flex-col gap-6">
                            <div>
                                <button className="pointer-events-auto border border-[#2A2A2A]/30 px-4 py-2 text-sm uppercase tracking-wide hover:bg-[#2A2A2A] hover:text-[#EAE7DD] transition-colors">
                                    Apa Itu Along? &gt;
                                </button>
                            </div>
                            <h2 className="text-3xl md:text-[64px] font-serif leading-[0.9] tracking-tight">
                                Temukan Berbagai <br /> Keindahan Nusantara
                            </h2>
                        </div>
                        <div className="flex flex-col gap-4 justify-between md:items-end">
                            <div className="max-w-md md:text-right text-lg leading-relaxed font-medium/80">
                                Along adalah platform pariwisata Indonesia yang memungkinkan pengguna untuk menjelajahi destinasi wisata terbaik
                            </div>
                            <div className="flex md:justify-end">
                                <Link href="/wisata" className="pointer-events-auto z-55 border border-[#2D1C04] hover:bg-[#2D1C04] px-6 py-3 text-sm md:text-base uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                                    Jelajahi Sekarang <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full aspect-16/7 overflow-hidden shadow-sm">
                        <Image
                            src="/images/about.png"
                            alt="Classic Painting"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-full py-6 md:py-12 overflow-hidden my-8">
                    <div className="flex whitespace-nowrap" ref={marqueeRef} style={{ width: "fit-content" }}>
                        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                            <div key={i} className="flex items-center gap-2 mx-8 md:mx-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer pointer-events-auto">
                                <span className="text-xl md:text-2xl font-serif tracking-tight">{logo}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full">
                    <div className="md:col-span-7 w-full relative">
                        <div className="relative w-full aspect-4/3 md:aspect-auto md:h-full shadow-lg overflow-hidden">
                            <Image
                                src="/images/about-2.png"
                                alt="Ruins Painting"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-6 justify-center">
                        <div className="relative w-full aspect-4/3 shadow-lg overflow-hidden">
                            <Image
                                src="/images/about-3.png"
                                alt="Woman Weaving Painting"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>

                        <div className="font-serif text-2xl leading-snug">
                            <span className="">
                                Temukan destinasi terbaik, panduan lokal, {" "}
                            </span>
                            <span className="opacity-60">
                                dan berbagai informasi menarik dari seluruh pelosok Indonesia.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ... (Konten Daftar Kota) ... */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 lg:py-24">
                    <div className="flex flex-col items-start max-w-xl">
                        <h2 className="text-3xl md:text-[64px] font-serif leading-[0.9] tracking-tight">
                            Menjelajahi Keindahan Indonesia
                            Dengan Along
                        </h2>
                        <div className="font-serif text-xl my-8 max-w-md font-medium leading-snug">
                            <span className="">
                                Dengan Along, nikmati pengalaman wisata yang mudah, menyenangkan, dan penuh inspirasi.
                            </span>
                        </div>
                        <Link href="/wisata" className="pointer-events-auto z-55 border border-[#2D1C04] hover:bg-[#2D1C04] px-6 py-3 text-sm md:text-base uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                            Jelajahi Sekarang <ArrowUpRight size={20} />
                        </Link>
                    </div>

                    <div className="relative md:h-125 w-full hidden md:block">
                        <div className="absolute top-16 left-1/4 font-serif text-4xl md:text-5xl">Makassar</div>
                        <div className="absolute top-28 right-7 font-serif text-4xl md:text-5xl">Jayapura</div>
                        <div className="absolute top-44 left-8 font-serif text-4xl md:text-5xl">Yogyakarta</div>
                        <div className="absolute top-64 right-18 font-serif text-4xl md:text-5xl">Medan</div>
                        <div className="absolute bottom-18 right-24 font-serif text-6xl md:text-5xl">Ambon</div>
                        <div className="absolute bottom-32 left-26 font-serif text-4xl md:text-5xl">Bali</div>
                    </div>
                </div>

            </div>
        </section >
    );
}