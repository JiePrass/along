'use client';

import { ModelSotoKuliner } from "@/components/3d/model-soto-kuliner-page";
import ImageCard from "@/components/shared/card/image-card";
import PaginationComponent from "@/components/shared/pagination";
import SearchFilter from "@/components/shared/search-filter";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ALL_DATA = Array.from({ length: 64 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? `Ayam Betutu ${i + 1}` : `Soto Betawi ${i + 1}`,
    image: i % 3 === 0
        ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        : i % 3 === 1
            ? "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600"
            : "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
}));

const ITEMS_PER_PAGE = 8;

export default function KulinerPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(ALL_DATA.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = ALL_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="relative w-full overflow-x-hidden">
            <div className="relative flex flex-col md:flex-row lg:min-h-screen">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 flex items-center z-10">
                    <div className="w-full md:w-1/2 pt-20 md:py-20">
                        <div className="flex flex-col">
                            <h1 className="text-4xl md:text-5xl font-extralight font-bethany leading-[1.2] mb-2">
                                Jelajahi Berbagai Rasa Di Bumi Pertiwi
                            </h1>
                            <p className="text-sm md:text-lg leading-relaxed max-w-lg mb-4 font-light">
                                Jelajahi Berbagai Kuliner di Indonesia mulai dari sejarah, cara pembuatan, dan makna filosofinya.
                            </p>
                            <div className="flex items-center">
                                <Link href="/kuliner" className="pointer-events-auto border border-[#2D1C04] hover:bg-[#2D1C04] px-6 py-3 text-sm md:text-base uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                                    Jelajahi Sekarang <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative md:absolute top-0 right-0 w-full md:w-[55vw] h-[50vh] md:h-full z-0">
                    <Canvas
                        shadows
                        camera={{ position: [0, 10, 0], fov: 35 }}
                        className="w-full h-full"
                    >
                        {/* ... konten 3D ... */}
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
                        <Environment preset="city" />
                        <ModelSotoKuliner />
                    </Canvas>
                </div>
            </div>

            <section id="content" className="container mx-auto px-6 md:px-12 lg:px-16 py-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="max-w-md">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Kulineran Apa <br /> Kita Hari Ini ?
                        </h2>
                    </div>
                    <SearchFilter />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {currentData.map((item) => (
                        <ImageCard
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            link="/kuliner/detail"
                        />
                    ))}
                </div>

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </section>
        </div >
    );
}