"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ModelSoto } from "../3d/model-soto";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function KulinerSection() {
    return (
        <section id="kuliner-section" className="relative w-full h-dvh bg-red-500 overflow-hidden">
            <div className="absolute inset-0 z-30 pointer-events-none">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 8], fov: 40 }}
                    className="pointer-events-auto"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Environment preset="city" />

                    <ModelSoto />
                </Canvas>
            </div>

            <div id="section-1" className="absolute inset-0 z-10 flex items-center justify-end px-6 md:px-20 w-full h-full">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[url('/images/kuliner-bg.png')] bg-cover bg-center" />
                </div>

                <div className="w-full md:w-1/2 text-white pt-20 text-center md:text-left flex flex-col items-center md:items-start">
                    <h1 className="text-4xl md:text-6xl font-bethany leading-[1.2] mb-4">
                        Jelajahi Berbagai Rasa Di Bumi Pertiwi
                    </h1>
                    <p className="text-sm md:text-lg leading-relaxed max-w-lg mb-8 font-light">
                        Jelajahi Berbagai Kuliner di Indonesia mulai dari sejarah, cara pembuatan, dan makna filosofinya.
                    </p>
                    <Link href="/kuliner" className="flex items-center gap-2 border border-white px-6 py-2 text-lg font-medium hover:bg-white hover:text-black transition-all">
                        Jelajahi Sekarang
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>

            <div id="section-2" className="absolute inset-0 z-20 bg-[#ddddd1] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <h1 className="text-[10rem] sm:text-[12rem] md:text-[25rem] font-bethany font-extralight text-[#DCDCD9] opacity-60 leading-none mix-blend-multiply">
                        SOTO
                    </h1>
                </div>
            </div>
        </section>
    );
}