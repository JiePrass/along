"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ModelKristal } from "@/components/3d/model-kristal";
import { MainLogo } from "../logos/main-logo";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(marqueeRef.current, {
            x: "-50%",
            duration: 30,
            ease: "none",
            overwrite: "auto",
            paused: false,
            repeat: -1
        });
    }, { scope: marqueeRef });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full container px-6 md:px-12 lg:px-16 mx-auto z-10"
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

                        <ModelKristal triggerRef={sectionRef} />
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

                    <div className="relative w-full aspect-21/7 overflow-hidden shadow-sm">
                        <Image src="/images/about.png" alt="Classic Painting" fill className="object-cover" />
                    </div>
                </div>

                <div className="relative w-full py-12 md:py-20 overflow-hidden my-8">
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-linear-to-r from-[#ddddd1] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-linear-to-l from-[#ddddd1] to-transparent" />
                    <div className="flex whitespace-nowrap" ref={marqueeRef} style={{ width: "fit-content" }}>
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 mx-10 md:mx-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer pointer-events-auto">
                                <MainLogo className="h-8 md:h-12 w-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full mb-20">
                    <div className="md:col-span-7 w-full relative">
                        <div className="relative w-full aspect-4/3 md:aspect-auto md:h-full shadow-lg overflow-hidden">
                            <Image src="/images/about-2.png" alt="About" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="md:col-span-5 flex flex-col gap-6 justify-center">
                        <div className="relative w-full aspect-4/3 shadow-lg overflow-hidden">
                            <Image src="/images/about-3.png" alt="About" fill className="object-cover" />
                        </div>
                        <div className="font-serif text-2xl leading-snug">
                            <span>Temukan destinasi terbaik, panduan lokal, </span>
                            <span className="opacity-60">dan berbagai informasi menarik dari seluruh pelosok Indonesia.</span>
                        </div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 lg:py-24">
                    <div className="flex flex-col items-start max-w-xl">
                        <h2 className="text-3xl md:text-[64px] font-serif leading-[0.9] tracking-tight">
                            Menjelajahi Keindahan Indonesia Dengan Along
                        </h2>
                        <div className="font-serif text-xl my-8 max-w-md font-medium leading-snug">
                            <span>Dengan Along, nikmati pengalaman wisata yang mudah, menyenangkan, dan penuh inspirasi.</span>
                        </div>
                        <Link href="/wisata" className="pointer-events-auto border border-[#2D1C04] hover:bg-[#2D1C04] px-6 py-3 text-sm md:text-base uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                            Jelajahi Sekarang <ArrowUpRight size={20} />
                        </Link>
                    </div>

                    <div className="relative md:h-125 w-full hidden md:block">
                        <div className="absolute top-16 left-1/4 font-serif text-4xl md:text-5xl">Makassar</div>
                        <div className="absolute top-28 right-3 font-serif text-4xl md:text-5xl">Jayapura</div>
                        <div className="absolute top-44 left-2 font-serif text-4xl md:text-5xl">Yogyakarta</div>
                        <div className="absolute top-64 right-14 font-serif text-4xl md:text-5xl">Medan</div>
                        <div className="absolute bottom-18 right-19 font-serif text-4xl md:text-5xl">Ambon</div>
                        <div className="absolute bottom-32 left-18 font-serif text-4xl md:text-5xl">Bali</div>
                    </div>
                </div>
            </div>
        </section >
    );
}