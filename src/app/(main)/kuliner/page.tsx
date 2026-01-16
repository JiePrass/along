'use client';

import { ModelSotoKuliner } from "@/components/3d/model-soto-kuliner-page";
import ImageCard from "@/components/shared/card/image-card";
import PaginationComponent from "@/components/shared/pagination";
import SearchFilter from "@/components/shared/search-filter";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const ALL_DATA = [
    {
        id: 1,
        title: "Ayam Betutu, Bali",
        image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    },
    {
        id: 2,
        title: "Soto Betawi, Jakarta",
        image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c290b3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 3,
        title: "Rendang Daging, Padang",
        image: "https://images.unsplash.com/photo-1620700668269-d3ad2a88f27e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVuZGFuZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 4,
        title: "Sate Ayam Madura",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        title: "Nasi Goreng Spesial",
        image: "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 6,
        title: "Gado-Gado, Jawa Tengah",
        image: "https://images.unsplash.com/photo-1707269561481-a4a0370a980a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FkbyUyMGdhZG98ZW58MHx8MHx8fDA%3D",
    },
    {
        id: 7,
        title: "Bakso Sapi Wonogiri",
        image: "https://images.unsplash.com/photo-1687425973269-af0d62587769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFrc298ZW58MHx8MHx8fDA%3D",
    },
    {
        id: 8,
        title: "Gudeg, Yogyakarta",
        image: "https://images.unsplash.com/photo-1707528904076-6dbefcfe9b4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VkZWd8ZW58MHx8MHx8fDA%3D",
    },
];

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